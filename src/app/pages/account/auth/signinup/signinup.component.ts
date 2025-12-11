import { Component, Renderer2, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-signinup',
  standalone: true,
  imports: [RouterModule, NgbTooltipModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signinup.component.html',
  styles: ``,
})
export class SigninupComponent {

  signupForm!: UntypedFormGroup
  submit!: boolean
  passwordType: string = 'password'
  confirmpasswordType: string = 'password'

  public fb = inject(UntypedFormBuilder)
  private renderer = inject(Renderer2)

  constructor() {
    this.signupForm = this.fb.group({
      fname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpwd: ['', [Validators.required]],
    })
  }
  signup() {
    if (this.signupForm.valid) {
      this.submit = true
    } else {
      this.renderer.addClass(
        document.querySelector('.needs-validation'),
        'was-validated'
      )
    }
  }

  changePasswordType(event: any) {
    this.passwordType = event.target.checked ? 'text' : 'password'
  }

  changeconfirmPasswordType(event: any) {
    this.confirmpasswordType = event.target.checked ? 'text' : 'password'
  }
}
