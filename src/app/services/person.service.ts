import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Person } from '../models/person.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = environment.apiUrl;
  private storageKey = 'people_data';
  private peopleSubject = new BehaviorSubject<Person[]>([]);
  public people$ = this.peopleSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.initializeData();
  }

  /**
   * Initialize data from API or localStorage
   */
  private initializeData(): void {
    const storedData = this.getStoredPeople();
    if (storedData && storedData.length > 0) {
      this.peopleSubject.next(storedData);
    } else {
      // Load initial data from API
      this.http.get<Person[]>(this.apiUrl).subscribe(
        (data: Person[]) => {
          this.savePeopleToStorage(data);
          this.peopleSubject.next(data);
        },
        (error) => {
          console.error('Error loading initial data:', error);
          this.peopleSubject.next([]);
        }
      );
    }
  }

  /**
   * Get all people from localStorage
   */
  private getStoredPeople(): Person[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  /**
   * Save people to localStorage
   */
  private savePeopleToStorage(people: Person[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(people));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Get all people
   */
  getAllPeople(): Observable<Person[]> {
    const people = this.getStoredPeople();
    this.peopleSubject.next(people);
    return of(people);
  }

  /**
   * Get a person by ID
   */
  getPersonById(id: number): Observable<Person> {
    const people = this.getStoredPeople();
    const person = people.find(p => p.id === id);
    if (person) {
      return of(person);
    } else {
      // Fallback to API if not found in storage
      return this.http.get<Person>(`${this.apiUrl}/${id}`)
        .pipe(
          catchError(this.handleError)
        );
    }
  }

  /**
   * Create a new person
   */
  createPerson(person: Person): Observable<Person> {
    const people = this.getStoredPeople();
    
    // Generate new ID
    const maxId = people.length > 0 ? Math.max(...people.map(p => p.id)) : 0;
    const newPerson: Person = {
      ...person,
      id: maxId + 1
    };

    people.push(newPerson);
    this.savePeopleToStorage(people);
    this.peopleSubject.next(people);

    return of(newPerson);
  }

  /**
   * Update an existing person
   */
  updatePerson(id: number, person: Person): Observable<Person> {
    const people = this.getStoredPeople();
    const index = people.findIndex(p => p.id === id);

    if (index !== -1) {
      const updatedPerson: Person = {
        ...person,
        id: id
      };
      people[index] = updatedPerson;
      this.savePeopleToStorage(people);
      this.peopleSubject.next(people);
      return of(updatedPerson);
    } else {
      return throwError('Person not found');
    }
  }

  /**
   * Delete a person
   */
  deletePerson(id: number): Observable<void> {
    const people = this.getStoredPeople();
    const filteredPeople = people.filter(p => p.id !== id);

    if (filteredPeople.length < people.length) {
      this.savePeopleToStorage(filteredPeople);
      this.peopleSubject.next(filteredPeople);
      return of(void 0);
    } else {
      return throwError('Person not found');
    }
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
