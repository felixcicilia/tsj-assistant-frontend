// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { CrearUsuariosComponent } from './usuarios/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from './usuarios/editar-usuarios/editar-usuarios.component';

export const routes: Routes = [
  // 💬 Chat principal
  { path: 'chat', component: ChatComponent },

  // 👤 Usuarios
  {
    path: 'usuarios',
    children: [
      { path: '', component: ListaUsuariosComponent },       // /usuarios
      { path: 'crear', component: CrearUsuariosComponent },  // /usuarios/crear
      { path: ':id', component: EditarUsuariosComponent },   // /usuarios/123
    ],
  },

  // Ruta por defecto → chat
  { path: '', redirectTo: 'chat', pathMatch: 'full' },

  // Cualquier cosa rara → chat
  { path: '**', redirectTo: 'chat' },
];