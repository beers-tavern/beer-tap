import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Review, CreateReviewDto } from '../models/review';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Review[] = [];

  constructor(private authService: AuthService) {
    this.initMockData();
  }

  private initMockData(): void {
    // Données de test
    this.reviews = [
      {
        id: '1',
        barId: '1',
        userId: '2',
        userName: 'Regular User',
        rating: 5,
        comment: 'Excellent bar ! Bonne ambiance et large choix de bières artisanales.',
        createdAt: new Date('2025-11-15'),
      },
      {
        id: '2',
        barId: '1',
        userId: '3',
        userName: 'Marie Dupont',
        rating: 4,
        comment: 'Très bon accueil, je recommande !',
        createdAt: new Date('2025-11-20'),
      }
    ];
  }

  getReviewsByBarId(barId: string): Observable<Review[]> {
    return of(
      this.reviews
        .filter(r => r.barId === barId)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    ).pipe(delay(300));
  }

  createReview(dto: CreateReviewDto): Observable<Review> {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      return throwError(() => new Error('Vous devez être connecté pour laisser un avis'));
    }

    // Vérifier si l'utilisateur a déjà laissé un avis pour ce bar
    const existingReview = this.reviews.find(
      r => r.barId === dto.barId && r.userId === currentUser.id
    );

    if (existingReview) {
      return throwError(() => new Error('Vous avez déjà laissé un avis pour ce bar'));
    }

    const newReview: Review = {
      id: 'review-' + Date.now(),
      barId: dto.barId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating: dto.rating,
      comment: dto.comment,
      createdAt: new Date()
    };

    this.reviews.push(newReview);
    return of(newReview).pipe(delay(300));
  }

  updateReview(reviewId: string, rating: number, comment?: string): Observable<Review> {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      return throwError(() => new Error('Vous devez être connecté'));
    }

    const review = this.reviews.find(r => r.id === reviewId);
    
    if (!review) {
      return throwError(() => new Error('Avis introuvable'));
    }

    if (review.userId !== currentUser.id) {
      return throwError(() => new Error('Vous ne pouvez modifier que vos propres avis'));
    }

    review.rating = rating;
    review.comment = comment;
    review.updatedAt = new Date();

    return of(review).pipe(delay(300));
  }

  deleteReview(reviewId: string): Observable<void> {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      return throwError(() => new Error('Vous devez être connecté'));
    }

    const index = this.reviews.findIndex(r => r.id === reviewId);
    
    if (index === -1) {
      return throwError(() => new Error('Avis introuvable'));
    }

    const review = this.reviews[index];
    
    if (review.userId !== currentUser.id && !this.authService.hasRole(currentUser.role)) {
      return throwError(() => new Error('Vous ne pouvez supprimer que vos propres avis'));
    }

    this.reviews.splice(index, 1);
    return of(void 0).pipe(delay(300));
  }

  getAverageRating(barId: string): Observable<{ average: number; count: number }> {
    const barReviews = this.reviews.filter(r => r.barId === barId);
    
    if (barReviews.length === 0) {
      return of({ average: 0, count: 0 });
    }

    const sum = barReviews.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / barReviews.length;

    return of({ average: Math.round(average * 10) / 10, count: barReviews.length });
  }
}
