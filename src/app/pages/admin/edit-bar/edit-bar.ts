import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarService } from '../../../services/bar-service';
import { Bar, UpdateBarDto } from '../../../models/bar';

@Component({
  selector: 'app-edit-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-bar.html',
  styleUrls: ['./edit-bar.css']
})
export class EditBarComponent implements OnInit {
  barForm: FormGroup;
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  barId: string | null = null;
  bar = signal<Bar | null>(null);

  constructor(
    private fb: FormBuilder,
    private barService: BarService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.barId = this.route.snapshot.paramMap.get('id');
    if (this.barId) {
      this.loadBar();
    } else {
      this.errorMessage.set('ID de bar invalide');
    }
  }

  loadBar(): void {
    if (!this.barId) return;

    this.isLoading.set(true);
    this.barService.getBarById(this.barId).subscribe({
      next: (bar) => {
        if (bar) {
          this.bar.set(bar);
          this.barForm.patchValue({
            name: bar.name,
            address: bar.address,
            description: bar.description,
            phone: bar.phone,
            openingHours: bar.openingHours,
            latitude: bar.latitude,
            longitude: bar.longitude,
            rating: bar.rating,
            status: bar.status
          });
        } else {
          this.errorMessage.set('Bar non trouvé');
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.message || 'Erreur lors du chargement du bar');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.barForm.invalid || !this.barId) {
      this.errorMessage.set('Veuillez remplir correctement tous les champs');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const dto: UpdateBarDto = {
      id: this.barId,
      ...this.barForm.value,
      latitude: parseFloat(this.barForm.value.latitude),
      longitude: parseFloat(this.barForm.value.longitude),
      lat: parseFloat(this.barForm.value.latitude),
      lng: parseFloat(this.barForm.value.longitude),
      rating: parseFloat(this.barForm.value.rating) || 0
    };

    this.barService.updateBar(dto).subscribe({
      next: (bar) => {
        this.successMessage.set(`Bar "${bar.name}" modifié avec succès !`);
        setTimeout(() => {
          this.router.navigate(['/bars']);
        }, 1500);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'Erreur lors de la modification du bar');
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
