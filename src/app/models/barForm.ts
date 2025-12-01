export interface BarForm {
    id: number;
    name: string;
    category: string;
    status: 'Ouvert' | 'Fermé';
    address: string;
    lat: number;
    lng: number;
    modifyMode: boolean;
}