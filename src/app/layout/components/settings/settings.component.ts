import { Component, inject, OnInit } from '@angular/core';
import { SettingItem } from './setting.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilesComponent } from '../files/files.component';

import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Firestore, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ContextSettingComponent } from '../context-setting/context-setting.component';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

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
      },
      {
        name: 'context',
        description: 'Mejorá las respuestas'
      }
    ]
  }

  open(option: string) {
    if(option === 'documentos') {
      this.docOption();
    }

    // if(option === 'diseño') {
    //   this.designOption();
    // }

    if(option === 'context') {
      this.contextOption();
    }
  }

  docOption() {
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

  contextOption() {
        const modalRef = this.modalService.open(ContextSettingComponent, {
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
