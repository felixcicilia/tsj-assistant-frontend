// src/auth/login/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginDto, AuthUser } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private auth = inject(AuthService);

  // Tipado explícito para que Angular no se queje en el template
  form: LoginDto = {
    email: 'admin@tsj.test',
    password: 'Secreto123',
  };

  loading = false;
  error: string | null = null;
  success: string | null = null;
  loggedUser: AuthUser | null = null;

  onSubmit() {
    if (this.loading) return;

    this.error = null;
    this.success = null;
    this.loading = true;

    this.auth.login(this.form).subscribe({
      next: (res) => {
        this.loading = false;
        this.loggedUser = res.user;
        this.success = `Sesión iniciada como ${res.user.name} (${res.user.role}).`;
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
