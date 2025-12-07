import {
  Component,
  Input,
  OnDestroy,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  Signal,
  inject,
  EventEmitter,
  Output,
  signal,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalisationService } from '../../services/localisation-service';
import { MatDialog } from '@angular/material/dialog';
import { BarDialog } from '../bar-dialog/bar-dialog';
<<<<<<< HEAD
import { Bar } from '../../models/bar';
import { BarForm } from '../../models/barForm';
=======
import { AuthService } from '../../services/auth.service';

// مدل ساده برای avis
interface BarReview {
  user: string;
  rating: number;
  comment: string;
  date: string;
}
>>>>>>> 85fe261 (Update KHA with auth & reviews)

@Component({
  selector: 'app-bar-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bar-map.html',
  styleUrl: './bar-map.css',
})
export class BarMapComponent implements AfterViewInit, OnDestroy {
  @Input() isAdmin = false;
  @Input() bars!: Signal<Bar[]>;
  @Input() selected_bar!: Signal<Bar | undefined>;

  @Output() select_bar = new EventEmitter<Bar | undefined>();
  @Output() delete_bar = new EventEmitter<number>();
  @Output() modify_bar = new EventEmitter<BarForm>();

  opened = signal(false);

  // avis مربوط به bar انتخاب‌شده
  reviews = signal<BarReview[]>([]);
  newRating = 5;
  newComment = '';

  private loc = inject(LocalisationService);
  readonly dialog = inject(MatDialog);
  private auth = inject(AuthService);

  private map: any;
  private markers: any[] = [];
  private L: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // وقتی لیست barها عوض شود، markerها را رفرش کن
    effect(() => {
      const bars = this.bars?.() ?? [];
      if (this.map && this.L) {
        this.refreshMarkers(bars);
      }
    });

    // حرکت نقشه بر اساس موقعیت کاربر
    effect(() => {
      const pos = this.loc.position();
      if (this.map && pos) {
        this.map.setView([pos.lat, pos.lng], this.map.getZoom(), {
          animate: true,
        });
      }
    });

    // وقتی bar انتخاب‌شده عوض می‌شود
    effect(() => {
      const bar = this.selected_bar?.();

      if (bar) {
        this.opened.set(true);
        if (this.map) {
          this.map.setView([bar.lat, bar.lng], this.map.getZoom(), {
            animate: true,
          });
        }
        // avis را از خود bar (اگر وجود داشته باشد) بارگذاری کن
        this.reviews.set(bar.reviews ?? []);
      } else {
        this.opened.set(false);
        this.reviews.set([]);
      }
    });
  }

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.L = await import('leaflet');
    this.initMap();
  }

  ngOnDestroy() {
    if (this.map) this.map.remove();
  }

  private initMap() {
    const bars = this.bars?.() ?? [];
    const center = this.loc.position();

    if (!this.map) {
      this.map = this.L.map('map', {
        center,
        zoom: 14,
        zoomControl: true,
        attributionControl: true,
      });
    }

    this.L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors © CARTO',
      }
    ).addTo(this.map);

    this.addMarkers(bars);
  }

  private addMarkers(bars: Bar[]) {
    bars.forEach((bar) => {
      const icon = this.createCustomIcon(bar);
      const marker = this.L
        .marker([bar.lat, bar.lng], { icon })
        .addTo(this.map);
      marker.on('click', () => this.onMarkerClick(bar));
      this.markers.push(marker);
    });

    if (bars.length > 1) {
      const group = this.L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
  }

  private refreshMarkers(bars: Bar[]) {
    this.markers.forEach((m) => m.remove());
    this.markers = [];
    this.addMarkers(bars);
  }

  private createCustomIcon(bar: Bar) {
    const color = bar.status === 'Ouvert' ? '#10b981' : '#ef4444';

    const markerHTML = `
      <div style="position: relative; width: 40px; height: 56px; display: flex; flex-direction: column; align-items: center;">
        <svg width="40" height="56" viewBox="0 0 40 56" style="display: block;">
          <path d="M20 0C8.95 0 0 8.95 0 20c0 14 20 36 20 36s20-22 20-36c0-11.05-8.95-20-20-20z"
            fill="${color}" stroke="#fff" stroke-width="2"/>
          <text x="20" y="26" text-anchor="middle" fill="white" font-size="20" dominant-baseline="middle">🍺</text>
        </svg>
        <div style="
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: var(--app-black);
          padding: 2px 8px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0,0,0,0.25);
          white-space: nowrap;
        ">
          ${bar.rating}
        </div>
      </div>
      `;

    return this.L.divIcon({
      className: 'custom-marker',
      html: markerHTML,
      iconSize: [40, 56],
      iconAnchor: [20, 56],
      popupAnchor: [0, -56],
    });
  }

  onMarkerClick(bar: Bar) {
    this.opened.set(true);
    this.select_bar.emit(bar);

    if (this.map) {
      this.map.setView([bar.lat, bar.lng], this.map.getZoom(), {
        animate: true,
      });
    }
  }

  closeInfo() {
    this.opened.set(false);
    this.select_bar.emit(undefined);
  }

  openBarDialog(): void {
    if (this.opened()) {
      const dialogRef = this.dialog.open(BarDialog, {
        data: this.selected_bar(),
        width: '50vw',
        maxWidth: '1200px',
        height: '90vh',
        maxHeight: '95vh',
      });

      dialogRef.afterClosed().subscribe((result: BarForm | undefined) => {
<<<<<<< HEAD
        if (result) {
          if (result.modifyMode) {
            this.modify_bar.emit(result);
          } else {
            this.delete_bar.emit(result.id);
          }
=======
        if (result?.modifyMode) {
          this.modify_bar.emit(result);
        } else if (result) {
          this.delete_bar.emit(result.id);
>>>>>>> 85fe261 (Update KHA with auth & reviews)
        }
      });
    }
  }

  // فقط کاربر ROLE = USER اجازه ثبت avis دارد
  get canReview(): boolean {
    return this.auth.getRole() === 'USER';
  }

  getStars(rating: number): string {
    const r = Math.max(1, Math.min(5, rating)); // بین 1 و 5
    return '★'.repeat(r) + '☆'.repeat(5 - r);
  }

  setRating(value: number): void {
    this.newRating = value;
  }

  addReview(): void {
    const bar = this.selected_bar?.();
    const user = this.auth.getUser();

    if (!bar || !user) return;
    if (!this.newComment.trim()) return;

    const review: BarReview = {
      user: user.username,
      rating: this.newRating,
      comment: this.newComment.trim(),
      date: new Date().toLocaleString(),
    };

    // به signal اضافه کن
    this.reviews.update((list) => [...list, review]);

    // به خود آبجکت bar هم بچسبان (برای باز شدن‌های بعدی)
    if (!bar.reviews) {
      bar.reviews = [];
    }
    bar.reviews.push(review);

    // ریست فرم
    this.newRating = 5;
    this.newComment = '';
  }
}
