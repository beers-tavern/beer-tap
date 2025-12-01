import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarService } from '../../../services/bar-service';
import { CreateBarDto } from '../../../models/bar';

@Component({
  selector: 'app-add-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-bar.html',
  styleUrls: ['./add-bar.css']
})
export class AddBarComponent {
  barForm: FormGroup;
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private barService: BarService,
    private router: Router
  ) {
    this.barForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.required]],
      openingHours: ['', [Validators.required]],
      latitude: ['', [Validators.required, Validators.pattern(/^-?([1-8]?[0-9]\.{1}\d+|90\.{1}0+)$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?((1[0-7]|[0-9])?[0-9]\.{1}\d+|180\.{1}0+)$/)]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      status: ['Ouvert', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.barForm.invalid) {
      this.errorMessage.set('Veuillez remplir correctement tous les champs');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const dto: CreateBarDto = {
      ...this.barForm.value,
      latitude: parseFloat(this.barForm.value.latitude),
      longitude: parseFloat(this.barForm.value.longitude),
      lat: parseFloat(this.barForm.value.latitude),
      lng: parseFloat(this.barForm.value.longitude),
      rating: parseFloat(this.barForm.value.rating) || 0,
      category: '',
      image: ''
    };

    this.barService.createBar(dto).subscribe({
      next: (bar) => {
        this.successMessage.set(`Bar "${bar.name}" créé avec succès !`);
        setTimeout(() => {
          this.router.navigate(['/bars']);
        }, 1500);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'Erreur lors de la création du bar');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/bars']);
  }

  getControl(name: string) {
    return this.barForm.get(name);
  }
}
