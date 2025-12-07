import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchievementsService, Achievement } from '../../services/achievement.service';

type FilterType = 'all' | 'unlocked' | 'locked';
type SortType = 'default' | 'alphabetical' | 'date';

@Component({
  selector: 'app-achievements-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css'],
})
export class AchievementsComponent {
  private achievementsService = inject(AchievementsService);

  allAchievements = this.achievementsService.getAchievements();
  selectedFilter = signal<FilterType>('all');
  selectedSort = signal<SortType>('default');

  filteredAndSortedAchievements = computed(() => {
    let achievements = [...this.allAchievements()];

    // Filtrage
    const filter = this.selectedFilter();
    if (filter === 'unlocked') {
      achievements = achievements.filter((a) => a.unlocked);
    } else if (filter === 'locked') {
      achievements = achievements.filter((a) => !a.unlocked);
    }

    // Tri
    const sort = this.selectedSort();
    if (sort === 'alphabetical') {
      achievements.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'date') {
      achievements.sort((a, b) => {
        if (!a.unlockedAt && !b.unlockedAt) return 0;
        if (!a.unlockedAt) return 1;
        if (!b.unlockedAt) return -1;
        return b.unlockedAt.getTime() - a.unlockedAt.getTime();
      });
    } else {
      // Tri par défaut: débloqués d'abord, puis par catégorie
      achievements.sort((a, b) => {
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
        return a.category.localeCompare(b.category);
      });
    }

    return achievements;
  });

  unlockedCount = computed(() => this.achievementsService.getUnlockedCount());
  totalCount = computed(() => this.achievementsService.getTotalCount());
  progressPercentage = computed(() => this.achievementsService.getProgressPercentage());

  setFilter(filter: FilterType): void {
    this.selectedFilter.set(filter);
  }

  setSort(sort: SortType): void {
    this.selectedSort.set(sort);
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      beers: '🍺',
      bars: '🏠',
      social: '👥',
      expert: '🎓',
    };
    return icons[category] || '🏆';
  }

  getCategoryName(category: string): string {
    const names: Record<string, string> = {
      beers: 'Bières',
      bars: 'Bars',
      social: 'Social',
      expert: 'Expert',
    };
    return names[category] || category;
  }

  formatDate(date?: Date): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
}
