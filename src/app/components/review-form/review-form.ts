import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';
import { CreateReviewDto } from '../../models/review';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form.html',
  styleUrls: ['./review-form.css']
})
export class ReviewFormComponent {
  @Input() barId!: string;
  @Output() reviewSubmitted = new EventEmitter<void>();

  reviewForm: FormGroup;
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  selectedRating = signal<number>(0);
  hoveredRating = signal<number>(0);

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.maxLength(500)]]
    });
  }

  setRating(rating: number): void {
    this.selectedRating.set(rating);
    this.reviewForm.patchValue({ rating });
  }

  onStarHover(rating: number): void {
    this.hoveredRating.set(rating);
  }

  onStarLeave(): void {
    this.hoveredRating.set(0);
  }

  getDisplayRating(): number {
    return this.hoveredRating() || this.selectedRating();
  }

  onSubmit(): void {
    if (this.reviewForm.invalid) {
      this.errorMessage.set('Veuillez sélectionner une note (1 à 5 étoiles)');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const dto: CreateReviewDto = {
      barId: this.barId,
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.comment || undefined
    };

    this.reviewService.createReview(dto).subscribe({
      next: () => {
        this.successMessage.set('Avis publié avec succès !');
        this.reviewForm.reset();
        this.selectedRating.set(0);
        this.reviewSubmitted.emit();
        
        setTimeout(() => {
          this.successMessage.set(null);
        }, 3000);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'Erreur lors de la publication de l\'avis');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}
