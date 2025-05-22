import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {

  private destroy$ = new Subject<boolean>();

  constructor(
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
