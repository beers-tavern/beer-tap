import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  effect,
  Signal,
  inject,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LocalisationService } from '../../services/localisation-service';
import { MatDialog } from '@angular/material/dialog';
import { BarDialog } from '../bar-dialog/bar-dialog';

@Component({
  selector: 'app-bar-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-map.html',
  styleUrl: './bar-map.css',
})
export class BarMapComponent implements AfterViewInit, OnDestroy {
  @Input() bars!: Signal<Bar[]>;
  @Input() selected_bar!: Signal<Bar | undefined>;

  @Output() select_bar = new EventEmitter<Bar>();
  @Output() delete_bar = new EventEmitter<number>();
  @Output() modify_bar = new EventEmitter<BarForm>();

  opened = signal(false);

  private loc = inject(LocalisationService);
  readonly dialog = inject(MatDialog);

  private map: any;
  private markers: any[] = [];
  private L: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      const bars = this.bars?.() ?? [];
      if (this.map && this.L) {
        this.refreshMarkers(bars);
      }
    });

    effect(() => {
      const pos = this.loc.position();
      if (this.map && pos) {
        this.map.setView([pos.lat, pos.lng], this.map.getZoom(), { animate: true });
      }
    });

    effect(() => {
      const bar = this.selected_bar?.();
      if (this.map && bar) {
        this.opened.set(true);
        this.map.setView([bar.lat, bar.lng], this.map.getZoom(), { animate: true });
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

    this.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors © CARTO',
    }).addTo(this.map);

    this.addMarkers(bars);
  }

  private addMarkers(bars: Bar[]) {
    bars.forEach((bar) => {
      const icon = this.createCustomIcon(bar);
      const marker = this.L.marker([bar.lat, bar.lng], { icon }).addTo(this.map);
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
      this.map.setView([bar.lat, bar.lng], this.map.getZoom(), { animate: true });
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
        if (result?.modifyMode) {
          this.modify_bar.emit(result);
        } else {
          this.delete_bar.emit(result?.id);
        }
      });
    }
  }
}
