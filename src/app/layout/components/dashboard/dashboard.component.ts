import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  standalone: true,
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent {
  constructor() {}
}
