import { Routes } from '@angular/router'
import { AccountLayoutComponent } from './layouts/account-layout.component'

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/account/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'account',
    component: AccountLayoutComponent,
    loadChildren: () =>
      import('./pages/account/pages/account.route').then(
        (mod) => mod.ACCOUNT_ROUTES
      ),
  },
]
