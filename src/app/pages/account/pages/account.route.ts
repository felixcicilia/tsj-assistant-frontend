import { Route } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { ChatComponent } from './chat/chat.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { CrearUsuariosComponent } from './usuarios/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from './usuarios/editar-usuarios/editar-usuarios.component';

export const ACCOUNT_ROUTES: Route[] = [
  // SETTINGS
  {
    path: 'settings',
    component: SettingsComponent,
    data: { title: 'Account - Settings' },
  },

  // USERS CRUD
  {
    path: 'users',
    children: [
      {
        path: '',
        component: ListaUsuariosComponent,
        data: { title: 'Account - Users' },
      },
      {
        path: 'crear',
        component: CrearUsuariosComponent,
        data: { title: 'Account - Crear usuario' },
      },
      {
        path: ':id',
        component: EditarUsuariosComponent,
        data: { title: 'Account - Editar usuario' },
      },
    ],
  },

  // CHAT
  {
    path: 'chat',
    component: ChatComponent,
    data: { title: 'Account - Chat' },
  },

  // TOKEN USAGE (Nuevo CRUD)
  {
    path: 'token-usage',
    loadComponent: () =>
      import('./token-usage/lista-token-usage/lista-token-usage.component').then(
        (m) => m.ListaTokenUsageComponent
      ),
    data: { title: 'Account - Uso de Tokens' },
  },
];