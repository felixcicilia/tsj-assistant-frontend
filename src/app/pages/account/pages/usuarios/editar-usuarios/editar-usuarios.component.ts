// src/app/usuarios/editar-usuarios/editar-usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { User } from '../usuarios.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-usuarios.component.html',
})
export class EditarUsuariosComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  saving = false;
  userId!: number;
  userLoaded: User | null = null;
  errorMsg: string | null = null;

  roles = ['ADMIN', 'JUEZ', 'ABOGADO', 'DIRECTOR'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: UsuariosService,
  ) {}

  ngOnInit(): void {
    // 1️⃣ Tomamos el id de la ruta /usuarios/:id
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.userId || Number.isNaN(this.userId)) {
      this.errorMsg = 'ID de usuario inválido.';
      return;
    }

    // 2️⃣ Creamos el formulario vacío
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(120)]],
      lastName: ['', [Validators.maxLength(120)]],
      documentId: ['', [Validators.maxLength(50)]],
      phone: ['', [Validators.maxLength(50)]],
      address: ['', [Validators.maxLength(255)]],
      state: ['', [Validators.maxLength(120)]],
      country: ['', [Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    });

    // 3️⃣ Cargar datos del usuario
    this.loadUser();
  }

  loadUser(): void {
    this.loading = true;
    this.errorMsg = null;

    this.usuariosService.getUser(this.userId).subscribe({
      next: (user) => {
        this.userLoaded = user;

        // Rellenamos el formulario
        this.form.patchValue({
          name: user.name,
          lastName: user.lastName,
          documentId: user.documentId,
          phone: user.phone,
          address: user.address,
          state: user.state,
          country: user.country,
          email: user.email,
          role: user.role,
        });

        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando usuario', err);
        this.errorMsg = 'No se pudo cargar el usuario.';
        this.loading = false;

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

  onSubmit(): void {
    if (this.form.invalid || !this.userId || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMsg = null;

    const payload = this.form.value; // Partial<User>

    this.usuariosService.updateUser(this.userId, payload).subscribe({
      next: () => {
        this.saving = false;

        Swal.fire({
          title: 'Cambios guardados',
          text:
            this.userLoaded?.name
              ? `El usuario "${this.userLoaded.name}" fue actualizado correctamente.`
              : 'El usuario fue actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d6efd',
        }).then(() => {
          this.router.navigate(['/account/users']);
        });
      },
      error: (err) => {
        console.error('Error actualizando usuario', err);
        this.saving = false;
        this.errorMsg = 'No se pudo actualizar el usuario.';

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

  // helpers para el template
  hasError(controlName: string, error: string): boolean {
    const ctrl = this.form.get(controlName);
    return !!ctrl && ctrl.touched && ctrl.hasError(error);
  }
}