import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class 
LoaderService {
  private loaderResponseSubject$ = new Subject<boolean>();
  loaderResponse$ = this.loaderResponseSubject$.asObservable();

  showSpinner() {
    this.loaderResponseSubject$.next(true);
  }

  hideSpinner() {
    this.loaderResponseSubject$.next(false);
  }
}
