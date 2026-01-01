import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  person: Person = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    username: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    },
    company: {
      name: ''
    }
  };

  isEditMode = false;
  loading = false;
  error: string | null = null;
  success: string | null = null;
  personId: number | null = null;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.personId = +id;
      this.isEditMode = true;
      this.loadPerson(this.personId);
    } else {
      this.isEditMode = false;
    }
  }

  /**
   * Load person data for editing
   */
  loadPerson(id: number): void {
    this.loading = true;
    this.error = null;

    this.personService.getPersonById(id).subscribe({
      next: (data: Person) => {
        this.person = {
          ...data,
          address: data.address || { street: '', suite: '', city: '', zipcode: '' },
          company: data.company || { name: '' }
        };
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Failed to load person data. Please try again.';
        this.loading = false;
        console.error('Error loading person:', error);
      }
    });
  }

  /**
   * Save person (create or update)
   */
  savePerson(): void {
    // Prevent form submission if validation fails
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    if (this.isEditMode && this.personId) {
      // Update existing person
      this.personService.updatePerson(this.personId, this.person).subscribe({
        next: (data: Person) => {
          this.success = 'Person updated successfully!';
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/people']);
          }, 1500);
        },
        error: (error: any) => {
          this.error = error && typeof error === 'string' ? error : 'Failed to update person. Please try again.';
          this.loading = false;
          console.error('Error updating person:', error);
        }
      });
    } else {
      // Create new person - remove id if it's 0
      const personToCreate = { ...this.person };
      if (personToCreate.id === 0) {
        delete (personToCreate as any).id;
      }

      this.personService.createPerson(personToCreate).subscribe({
        next: (data: Person) => {
          this.success = 'Person created successfully!';
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/people']);
          }, 1500);
        },
        error: (error: any) => {
          this.error = error && typeof error === 'string' ? error : 'Failed to create person. Please try again.';
          this.loading = false;
          console.error('Error creating person:', error);
        }
      });
    }
  }

  /**
   * Cancel and go back to list
   */
  cancel(): void {
    this.router.navigate(['/people']);
  }

  /**
   * Validate form
   */
  private validateForm(): boolean {
    if (this.person.name.trim() === '') {
      this.error = 'Name is required.';
      return false;
    }
    if (this.person.email.trim() === '') {
      this.error = 'Email is required.';
      return false;
    }
    if (this.person.email && !this.isValidEmail(this.person.email)) {
      this.error = 'Please enter a valid email address.';
      return false;
    }
    return true;
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

