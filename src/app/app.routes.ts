import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./layout/components/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./layout/components/settings/settings.component').then(c => c.SettingsComponent)
      },
      {
        path: 'mi-chat',
        loadComponent: () => import('./layout/components/prueba-chat/prueba-chat.component').then(c => c.PruebaChatComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
