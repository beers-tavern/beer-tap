import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarService } from '../../services/bar-service';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';
import { Bar } from '../../models/bar';
import { Review } from '../../models/review';
import { Header } from '../../components/header/header';
import { Navbar } from '../../components/navbar/navbar';
import { ReviewFormComponent } from '../../components/review-form/review-form';

@Component({
  selector: 'app-bar-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Navbar, ReviewFormComponent],
  templateUrl: './bar-detail.html',
  styleUrls: ['./bar-detail.css']
})
export class BarDetailComponent implements OnInit {
  bar = signal<Bar | null>(null);
  reviews = signal<Review[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  barId: string | null = null;

  averageRating = computed(() => {
    const barReviews = this.reviews();
    if (barReviews.length === 0) return 0;
    const sum = barReviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / barReviews.length;
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private barService: BarService,
    public authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.barId = this.route.snapshot.paramMap.get('id');
    if (this.barId) {
      this.loadBarDetails();
      this.loadReviews();
    } else {
      this.errorMessage.set('ID de bar invalide');
      this.isLoading.set(false);
    }
  }

  loadBarDetails(): void {
    if (!this.barId) return;

    this.barService.getBarById(this.barId).subscribe({
      next: (bar) => {
        if (bar) {
          this.bar.set(bar);
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

  loadReviews(): void {
    if (!this.barId) return;

    this.reviewService.getReviewsByBarId(this.barId).subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des avis:', error);
      }
    });
  }

  onReviewSubmitted(): void {
    this.loadReviews();
  }

  editBar(): void {
    if (this.barId && this.authService.isAdmin()) {
      this.router.navigate(['/admin/bars', this.barId, 'edit']);
    }
  }

  deleteBar(): void {
    if (!this.barId || !this.authService.isAdmin()) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer ce bar ?')) {
      this.barService.deleteBar(this.barId).subscribe({
        next: () => {
          this.router.navigate(['/bars']);
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de la suppression');
        }
      });
    }
  }

  deleteReview(reviewId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      this.reviewService.deleteReview(reviewId).subscribe({
        next: () => {
          this.loadReviews();
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de la suppression de l\'avis');
        }
      });
    }
  }

  canDeleteReview(review: Review): boolean {
    const currentUser = this.authService.user();
    return !!currentUser && (currentUser.id === review.userId || this.authService.isAdmin());
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.round(rating) ? 1 : 0);
  }
}
