export interface Bar {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: number;
  status: 'Ouvert' | 'Fermé';
  address: string;
  image: string;
  lat: number;
  lng: number;
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
}
