import { HttpClient } from '@angular/common/http';
import { Injectable, TransferState, inject, makeStateKey } from '@angular/core';
import { env } from '../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, retry, tap } from 'rxjs';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  image: string;
  abv: number;
  ibu: number;
  description: string;
  firstBrewed: string;
}

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  private http = inject(HttpClient);
  baseUrl = `${env.apiUrl}/beers`;

  private ts = inject(TransferState);
  private BEERS_KEY = makeStateKey<Beer[]>('beers');

  beers = toSignal(
    this.ts.hasKey(this.BEERS_KEY)
      ? of(this.ts.get(this.BEERS_KEY, []))
      : this.http
          .get<Beer[]>(this.baseUrl)
          .pipe(tap((data) => this.ts.set(this.BEERS_KEY, data)))
          .pipe(retry({ count: 5, delay: 1000 })),
    { initialValue: [] }
  );

  // beers = resource({
  //   defaultValue: [],
  //   loader: () => firstValueFrom(this.http.get<Beer[]>(this.baseUrl)),
  // });

  // beers = toSignal(this.http.get<Beer[]>(this.baseUrl).pipe(retry({ count: 5, delay: 1000 })), {
  //   initialValue: [],
  // });
}
