import { Component } from '@angular/core';
import { SettingItem } from './setting.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilesComponent } from '../files/files.component';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  items: SettingItem[] = [];

    constructor(
    private modalService: NgbModal,
    ) {}


  ngOnInit() {
    this.createItems();
  }

  createItems() {
    this.items = [
      {
        name: 'documentos',
        description: 'Mis documentos (Base de conocimiento)'
      },
      {
        name: 'diseño',
        description: 'Diseño'
      }
    ]
  }

  open() {
    const modalRef = this.modalService.open(FilesComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard : false,
      // fullscreen: true
      });

    return modalRef.result.then((result: any) => {
      alert('alert')
    })
  }
}
