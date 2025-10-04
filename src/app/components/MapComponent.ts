import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { GeolocationService } from '../services/GeolocalisationService';

@Component({
  selector: 'app-map',
  template: '<div id="map" style="height:500px;"></div>',
})
export class MapComponent implements AfterViewInit, OnInit {
  @Input() lat: number = 50.6292;
  @Input() lng: number = 3.0573;
  @Input() zoom: number = 13;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private geo: GeolocationService) {}

  async ngOnInit() {
    try {
      const pos = await this.geo.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
      console.log('Position:', pos);
      // centrer la carte / ajouter un marker
    } catch (err) {
      console.error('Erreur géoloc:', err);
      // gérer erreur (permission refusée, timeout...)
    }
  }

  async ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) return;

    const L = await import('leaflet');

    const map = L.map('map', {zoomControl: false}).setView([50.6292, 3.0573], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'assets/marker.png',    // ton image
      iconSize: [40, 40],            // largeur / hauteur
      iconAnchor: [20, 40],          // point de l'icône qui correspond à la position
      popupAnchor: [0, -40]          // où s'ouvre le popup par rapport au marker
    });

    const marker = L.marker([50.6292, 3.0573], {icon: customIcon}).addTo(map);

    const popupHtml = `
      <div style="
          width:250px;
          border:1px solid #ccc;
          border-radius:8px;
          overflow:hidden;
          // box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          font-family:Arial, sans-serif;
      ">
        <img src="assets/beer.jpg" style="width:100%; display:block; margin:0;">
        <div style="padding:0; margin:0;">
          <h4 style="margin:0; font-size:16px;">Le Bar de Lille</h4>
          <p style="margin:0; font-size:14px;">Adresse : 123 Rue Fictive, Lille</p>
          <p style="margin:0; font-size:14px;">Ouvert jusqu'à 2h</p>
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml);
  }
}
