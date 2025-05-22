import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay, take } from 'rxjs';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { LayoutItem } from './layout.interface';
@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    OverlayModule 
  ],
   providers: [BreakpointObserver]
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav: any;
  isHandset$: Observable<boolean>;
  breakpointObserver = inject(BreakpointObserver);

  items: LayoutItem[] = [];
  isOpenSiderbar = signal(false);

  constructor() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches),
      shareReplay()
    );
  }

  ngOnInit() {
    this.createItems();
  }

  closeIfHandset() {
    this.isHandset$.pipe(take(1)).subscribe(isHandset => {
      if (isHandset) {
        this.sidenav.close();
      }
    });
  }

  createItems() {
    this.items = [
      {
        icon: 'dashboard',
        description: 'Inicio',
        link: 'dashboard'
      },
      {
        icon: 'settings',
        description: 'Configuración',
        link: 'settings'
      },
      {
        icon: 'bar_chart',
        description: 'Estadísticas',
        link: ''
      },
      {
        icon: 'chat',
        description: 'Conversaciones',
        link: ''
      },
      {
        icon: 'person',
        description: 'Cuenta',
        link: ''
      }
    ]
  }

  onSidenavChange(open: boolean): void {
    this.isOpenSiderbar.set(open);
  }

}
