import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { toggleDocumentAttribute } from 'src/app/utils/layout'

@Injectable({
  providedIn: 'root',
})
export class ThemeModeService {
  themePreference = window.matchMedia('(prefers-color-scheme: dark)')
  private isDarkModeSubject = new BehaviorSubject<boolean>(
    this.themePreference.matches
  )
  isDarkMode$ = this.isDarkModeSubject.asObservable()

  private storageThemeKey = 'around-theme'

  private foundTheme = localStorage.getItem(this.storageThemeKey)

  private themeAttributeKey = 'data-bs-theme'

  private checkSwitch() {
    if (this.foundTheme)
      this.foundTheme === 'dark' ? this.setDark() : this.setLight()
    else this.themePreference.matches ? this.setDark() : this.setLight()
  }

  constructor() {
    this.themePreference.addEventListener('change', () => {
      this.checkSwitch()
    })
    this.checkSwitch()
  }

  setLight(): void {
    toggleDocumentAttribute(this.themeAttributeKey, 'light')
    localStorage.setItem(this.storageThemeKey, 'light')
    this.isDarkModeSubject.next(false)
  }

  setDark(): void {
    toggleDocumentAttribute(this.themeAttributeKey, 'dark')
    localStorage.setItem(this.storageThemeKey, 'dark')
    this.isDarkModeSubject.next(true)
  }

  toggleTheme(): void {
    if (this.isDarkModeSubject.value) this.setLight()
    else this.setDark()
  }
}
