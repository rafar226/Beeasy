import { Component, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoaderComponent, LoaderService } from './shared/loader';
import { DashboardComponent } from './layout/components/dashboard/dashboard.component';
import { BeeasyChatComponent } from './layout/components/chat/chat.component';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loader = false;
  title = 'Beeasy';
  private destroy = new Subject<boolean>();


  constructor(
    private loaderService: LoaderService,
    injector: Injector
  ) {
    this.loaderService.loaderResponse$.pipe(takeUntil(this.destroy)).subscribe((status: any) => {
      this.loader = status;
    });

    const el = createCustomElement(BeeasyChatComponent, { injector });
    if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
      if (!customElements.get('beeasy-chat')) {
        customElements.define('beeasy-chat', el);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
  }
}
