// geolocation.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

export interface PositionCoords {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  private watchId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private ensureBrowser() {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('Geolocation only available in the browser.');
    }
    if (!('geolocation' in navigator)) {
      throw new Error('Geolocation API not supported by this browser.');
    }
  }

  getCurrentPosition(options?: PositionOptions): Promise<PositionCoords> {
    this.ensureBrowser();
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const c = pos.coords;
          resolve({
            latitude: c.latitude,
            longitude: c.longitude,
            accuracy: c.accuracy,
            altitude: c.altitude,
            altitudeAccuracy: (c as any).altitudeAccuracy ?? null,
            heading: c.heading,
            speed: c.speed,
          });
        },
        err => reject(err),
        options
      );
    });
  }

  // Observable pour surveiller la position (watchPosition)
  watchPosition(options?: PositionOptions): Observable<PositionCoords> {
    this.ensureBrowser();
    return new Observable<PositionCoords>(observer => {
      const id = navigator.geolocation.watchPosition(
        pos => {
          const c = pos.coords;
          observer.next({
            latitude: c.latitude,
            longitude: c.longitude,
            accuracy: c.accuracy,
            altitude: c.altitude,
            altitudeAccuracy: (c as any).altitudeAccuracy ?? null,
            heading: c.heading,
            speed: c.speed,
          });
        },
        err => observer.error(err),
        options
      );

      // teardown
      return () => navigator.geolocation.clearWatch(id);
    });
  }

  clearWatch(id?: number) {
    if (id != null) {
      navigator.geolocation.clearWatch(id);
    }
  }
}
