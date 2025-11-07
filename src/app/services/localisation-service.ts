import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export interface Position {
  lat: number;
  lng: number;
  accuracy?: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocalisationService {
  readonly position = signal<Position>({ lat: 35.6895, lng: 139.6917 });
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  private permissionStatus: PermissionStatus | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.init();
  }

  private async init() {
    if (!isPlatformBrowser(this.platformId)) {
      this.loading.set(false);
      return;
    }

    try {
      if (navigator.permissions) {
        this.permissionStatus = await navigator.permissions.query({
          name: 'geolocation' as PermissionName,
        });

        this.permissionStatus.onchange = () => {
          if (this.permissionStatus?.state === 'granted') {
            this.getUserLocation();
          } else if (this.permissionStatus?.state === 'denied') {
            this.error.set('Permission refusée.');
            this.loading.set(false);
          }
        };

        // Si déjà autorisé → on peut récupérer tout de suite
        if (this.permissionStatus.state === 'granted') {
          this.getUserLocation();
        } else if (this.permissionStatus.state === 'prompt') {
          // 🔔 Demande la localisation seulement quand l’utilisateur interagit
          // (pour éviter les erreurs silencieuses SSR / auto)
          this.getUserLocation();
          //   window.addEventListener('click', () => this.getUserLocation(), { once: true });
        } else {
          this.error.set('Permission refusée.');
          this.loading.set(false);
        }
      } else {
        // 🔙 Fallback si Permissions API non disponible
        this.getUserLocation();
      }
    } catch (e) {
      this.error.set('Erreur lors de la vérification des permissions.');
      this.loading.set(false);
    }
  }

  private getUserLocation() {
    if (!navigator.geolocation) {
      this.error.set("La géolocalisation n'est pas supportée par ce navigateur.");
      this.loading.set(false);
      return;
    }

    this.loading.set(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.position.set({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        this.loading.set(false);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            this.error.set('Permission de localisation refusée.');
            break;
          case err.POSITION_UNAVAILABLE:
            this.error.set('Position non disponible.');
            break;
          case err.TIMEOUT:
            this.error.set('Délai dépassé pour la récupération de la position.');
            break;
          default:
            this.error.set('Erreur inconnue de géolocalisation.');
        }
        this.loading.set(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }
}
