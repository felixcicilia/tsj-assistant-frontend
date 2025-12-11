import { Route } from '@angular/router'
import { SigninComponent } from './signin/signin.component'
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component'
import { SignupComponent } from './signup/signup.component'
import { SigninupComponent } from './signinup/signinup.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    component: SigninComponent,
    data: { title: 'Account - Sign In' },
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent,
    data: { title: 'Account - Password Recovery' },
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    data: { title: 'Account - Sign Up' },
  },
  {
    path: 'sign-in-n-up',
    component: SigninupComponent,
    data: { title: 'Account - Sign In / Up' },
  },
]
