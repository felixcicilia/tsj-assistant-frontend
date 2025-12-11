// src/app/account/settings/settings.component.ts
import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2';

interface MeProfile {
  id: number;
  name: string;
  lastName: string | null;
  documentId: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  state: string | null;
  country: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'account-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgxMaskDirective,
    RouterModule,
  ],
  templateUrl: './settings.component.html',
  providers: [provideNgxMask()],
  styles: `
    .dropdown-toggle::after {
      display: none;
    }
    .dropdown-toggle {
      align-items: unset !important;
    }
  `,
})
export class SettingsComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  // Imagen de perfil (solo front por ahora)
  imageURL = 'assets/img/avatar/02.jpg';

  // Datos del usuario (/auth/me)
  profile: MeProfile = {
    id: 0,
    name: '',
    lastName: '',
    documentId: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    country: '',
    role: '',
    createdAt: '',
    updatedAt: '',
  };

  // Estado de carga
  loadingProfile = false;

  // Password (solo front / mock por ahora)
  passwordType: string = 'password';
  password1Type: string = 'password';
  password2Type: string = 'password';

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  savingPassword = false;

  ngOnInit(): void {
    this.loadProfile();
  }

  // =========================
  //   PERFIL /auth/me
  // =========================

  loadProfile(): void {
    this.loadingProfile = true;

    this.http
      .get<MeProfile>('http://localhost:3000/auth/me', {
        headers: this.auth.getAuthHeaders(),
      })
      .subscribe({
        next: (me) => {
          this.profile = {
            ...this.profile,
            ...me,
          };

          // Si el backend algún día manda avatar, aquí lo mapeamos:
          // this.imageURL = me.avatarUrl ?? this.imageURL;

          this.loadingProfile = false;
        },
        error: (err) => {
          console.error('Error cargando /auth/me', err);
          this.loadingProfile = false;

          Swal.fire({
            icon: 'error',
            title: 'No se pudo cargar tu perfil',
            text: 'Intenta nuevamente en unos minutos.',
            confirmButtonText: 'Entendido',
          });
        },
      });
  }

  // Por ahora: guarda solo en localStorage / AuthService
  // Cuando tengas PATCH/PUT en el backend, lo conectamos aquí.
  saveProfile(): void {
    const current = this.auth.currentUser;
    if (current) {
      const updated = {
        ...current,
        name: this.profile.name,
        email: this.profile.email,
        // Si tu AuthUser luego tiene lastName, también se mapea aquí
      };

      localStorage.setItem('tsj_user', JSON.stringify(updated));
    }

    Swal.fire({
      icon: 'success',
      title: 'Perfil actualizado',
      text: 'Los datos se han aplicado en tu sesión actual.',
      confirmButtonText: 'Perfecto',
    });
  }

  // =========================
  //   AVATAR (solo front)
  // =========================

  fileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file: File = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageURL = reader.result as string;
      // TODO: cuando tengas endpoint para subir avatar, aquí llamas al backend
    };
  }

  // =========================
  //   PASSWORD (mock front)
  // =========================

  changePasswordType(event: Event) {
    const input = event.target as HTMLInputElement;
    this.passwordType = input.checked ? 'text' : 'password';
  }

  changeNewPasswordType(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password1Type = input.checked ? 'text' : 'password';
  }

  confirmPasswordType(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password2Type = input.checked ? 'text' : 'password';
  }

  savePassword(): void {
    // Validaciones básicas en front
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Debes completar todas las contraseñas.',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    if (this.newPassword.length < 8) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña muy corta',
        text: 'La nueva contraseña debe tener al menos 8 caracteres.',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'No coinciden',
        text: 'Las nuevas contraseñas no coinciden.',
        confirmButtonText: 'Revisar',
      });
      return;
    }

    // Aquí iría el llamado real al backend (ej: POST /auth/change-password)
    this.savingPassword = true;

    setTimeout(() => {
      this.savingPassword = false;

      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';

      Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada',
        text: 'Simulado en el frontend. Luego lo conectamos al backend 😉',
        confirmButtonText: 'Listo',
      });
    }, 600);
  }
}