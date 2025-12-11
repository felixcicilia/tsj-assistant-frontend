// src/auth/signin/signin.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { AuthLayoutComponent } from '../auth-layout.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, AuthUser, LoginDto } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    AuthLayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  formSubmitted = false;
  showPassword = false;

  loading = false;
  error: string | null = null;
  success: string | null = null;
  loggedUser: AuthUser | null = null;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        'admin@tsj.test', // puedes dejarlo para pruebas o poner ''
        [Validators.required, Validators.email],
      ],
      password: ['Secreto123', Validators.required],
    });
  }

  get formValues() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.loading || this.loginForm.invalid) {
      return;
    }

    this.error = null;
    this.success = null;
    this.loading = true;

    const dto: LoginDto = {
      email: this.formValues['email'].value,
      password: this.formValues['password'].value,
    };

    this.auth.login(dto).subscribe({
      next: (res) => {
        this.loading = false;
        this.loggedUser = res.user;
        this.success = `Sesión iniciada como ${res.user.name} (${res.user.role}).`;

        // 🔁 Redirigir al chat
        this.router.navigate(['/account/chat']);
      },
      error: (err) => {
        this.loading = false;

        if (err.status === 401) {
          this.error = 'Correo o contraseña incorrectos.';
        } else {
          this.error = 'No se pudo iniciar sesión. Verifique sus datos.';
        }
      },
    });
  }
}