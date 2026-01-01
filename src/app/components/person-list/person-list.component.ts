import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];
  loading = false;
  error: string | null = null;
  deleteSuccess: string | null = null;
  
  // Delete modal properties
  showDeleteModal = false;
  personToDelete: { id: number; name: string } | null = null;

  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  /**
   * Load all people from the API
   */
  loadPeople(): void {
    this.loading = true;
    this.error = null;
    this.deleteSuccess = null;

    this.personService.getAllPeople().subscribe({
      next: (data: Person[]) => {
        this.people = data;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Failed to load people. Please try again later.';
        this.loading = false;
        console.error('Error loading people:', error);
      }
    });
  }

  /**
   * Navigate to edit page
   */
  editPerson(id: number): void {
    this.router.navigate(['/people/edit', id]);
  }

  /**
   * Navigate to create new person page
   */
  createPerson(): void {
    this.router.navigate(['/people/new']);
  }

  /**
   * Open delete confirmation modal
   */
  openDeleteModal(id: number, name: string): void {
    this.personToDelete = { id, name };
    this.showDeleteModal = true;
    this.error = null;
    this.deleteSuccess = null;
  }

  /**
   * Close delete confirmation modal
   */
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.personToDelete = null;
  }

  /**
   * Confirm and delete a person
   */
  confirmDelete(): void {
    if (!this.personToDelete) {
      return;
    }

    const { id, name } = this.personToDelete;
    this.loading = true;
    this.showDeleteModal = false;
    this.error = null;
    this.deleteSuccess = null;

    this.personService.deletePerson(id).subscribe({
      next: () => {
        this.deleteSuccess = `${name} has been deleted successfully.`;
        this.personToDelete = null;
        this.loadPeople(); // Reload the list
      },
      error: (error: any) => {
        this.error = error && typeof error === 'string' ? error : 'Failed to delete person. Please try again.';
        this.loading = false;
        this.personToDelete = null;
        console.error('Error deleting person:', error);
      }
    });
  }
}

