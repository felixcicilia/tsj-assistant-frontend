// src/app/usuarios/crear-usuarios/crear-usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-usuarios.component.html',
})
export class CrearUsuariosComponent implements OnInit {
  form!: FormGroup;
  saving = false;
  errorMsg: string | null = null;

  roles = ['ADMIN', 'JUEZ', 'ABOGADO', 'DIRECTOR'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(120)]],
        lastName: ['', [Validators.maxLength(120)]],
        documentId: ['', [Validators.maxLength(50)]],
        phone: ['', [Validators.maxLength(50)]],
        address: ['', [Validators.maxLength(255)]],
        state: ['', [Validators.maxLength(120)]],
        country: ['', [Validators.maxLength(120)]],

        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(150)],
        ],
        role: ['ADMIN', [Validators.required]],

        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [this.passwordsMatchValidator],
      },
    );
  }

  // Validador de confirmación de contraseña
  private passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    if (pass && confirm && pass !== confirm) {
      group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      const ctrl = group.get('confirmPassword');
      if (ctrl?.hasError('passwordMismatch')) {
        ctrl.setErrors(null);
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMsg = null;

    const { confirmPassword, ...raw } = this.form.value;

    this.usuariosService.createUser(raw).subscribe({
      next: () => {
        this.saving = false;

        Swal.fire({
          title: 'Usuario creado',
          text: raw.name
            ? `El usuario "${raw.name}" fue creado correctamente.`
            : 'El usuario fue creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d6efd',
        }).then(() => {
          this.router.navigate(['/account/users']);
        });
      },
      error: (err) => {
        console.error('Error creando usuario', err);
        this.errorMsg = 'No se pudo crear el usuario.';
        this.saving = false;

        Swal.fire({
          title: 'Error',
          text: this.errorMsg,
          icon: 'error',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#dc3545',
        });
      },
    });
  }

  hasError(controlName: string, error: string): boolean {
    const ctrl = this.form.get(controlName);
    return !!ctrl && ctrl.touched && ctrl.hasError(error);
  }
}