import { Component, Input, type OnDestroy } from '@angular/core'
import { ThemeModeService } from '@core/services/theme-mode.service'
import type { Subscription } from 'rxjs'

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [],
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent implements OnDestroy {
  @Input() class?: string
  isDarkMode = false
  isDarkSubscription!: Subscription

  constructor(public themeModeService: ThemeModeService) {
    this.isDarkSubscription = this.themeModeService.isDarkMode$.subscribe(
      (value) => {
        this.isDarkMode = value
      }
    )
  }

  ngOnDestroy(): void {
    if (this.isDarkSubscription) {
      this.isDarkSubscription.unsubscribe()
    }
  }
}
