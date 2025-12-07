<<<<<<< HEAD
export interface Bar {
  id: string;
=======

interface BarReview {
  user: string;      // نام کاربری (مثلاً admin یا user)
  rating: number;    // نمره 1 تا 5
  comment: string;   // متن نظر
  date: string;      // تاریخ به صورت string ساده
}

interface Bar {
  id: number;
>>>>>>> 85fe261 (Update KHA with auth & reviews)
  name: string;
  category: string;
  rating: number;
  distance: number;
  status: 'Ouvert' | 'Fermé';
  address: string;
  image: string;
  lat: number;
  lng: number;
<<<<<<< HEAD
  latitude: number;
  longitude: number;
  description?: string;
  phone?: string;
  openingHours?: string;
  reviewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBarDto {
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  latitude: number;
  longitude: number;
  image: string;
  description?: string;
  phone?: string;
  openingHours?: string;
  status?: 'Ouvert' | 'Fermé';
}

export interface UpdateBarDto extends Partial<CreateBarDto> {
  id: string;
=======

  // لیست avis ها (ممکن است خالی یا undefined باشد)
  reviews?: BarReview[];
>>>>>>> 85fe261 (Update KHA with auth & reviews)
}
