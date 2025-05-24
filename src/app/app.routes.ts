import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./layout/components/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'settings',
        canActivate: [authGuard],
        loadComponent: () => import('./layout/components/settings/settings.component').then(c => c.SettingsComponent)
      },
      {
        path: 'mi-chat',
        canActivate: [authGuard],
        loadComponent: () => import('./layout/components/prueba-chat/prueba-chat.component').then(c => c.PruebaChatComponent)
      },
      {
        path: 'context',
        canActivate: [authGuard],
        loadComponent: () => import('./layout/components/context-setting/context-setting.component').then(c => c.ContextSettingComponent)
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
