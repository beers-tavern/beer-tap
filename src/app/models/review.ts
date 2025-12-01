export interface Review {
  id: string;
  barId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateReviewDto {
  barId: string;
  rating: number;
  comment?: string;
}
