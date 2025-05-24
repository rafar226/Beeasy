import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormArray, FormsModule } from '@angular/forms';
import { Firestore, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserChatConfig } from './chat-context.interface';
import { MatIconModule } from '@angular/material/icon';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-context-setting',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule,
    MatIconModule, 
    FormsModule
  ],  
    templateUrl: './context-setting.component.html',
    styleUrl: './context-setting.component.scss'
  })
export class ContextSettingComponent {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private fb = inject(FormBuilder);

  defaultTones = ['Neutral', 'Profesional', 'Cercano', 'Humorístico'];


  configForm = this.fb.group({
    defaultTone: [''],
    rolePrompt: [''],
    defaultInstructions: this.fb.array([])
  });

  
  get defaultInstructions() {
    return this.configForm.get('defaultInstructions') as FormArray;
  }

  constructor(
    private activeModal: NgbActiveModal
    ) {
  }

  ngOnInit() {

    const user = this.auth.currentUser;
    if (!user) return;

    const docRef = doc(this.firestore, `users/${user.uid}`);

    getDoc(docRef).then(snapshot => {
      const data = snapshot.data() as UserChatConfig | undefined;

      if (data) {
        this.configForm.patchValue({
          defaultTone: data.defaultTone || '',
          rolePrompt: data.rolePrompt || ''
        });

        if (Array.isArray(data.defaultInstructions)) {
          data.defaultInstructions.forEach((inst: string) => {
            this.defaultInstructions.push(this.fb.control(inst));
          });
        }
      }
    });
  }

  dismissModal() {
    this.activeModal.dismiss('dismiss');
  }

  closeModal() {
    this.activeModal.close();
  }

  addInstruction() {
    this.defaultInstructions.push(this.fb.control(''));
  }

  removeInstruction(index: number) {
    this.defaultInstructions.removeAt(index);
  }

  async saveConfig() {
    const user = this.auth.currentUser;
    if (!user) return;

    const docRef = doc(this.firestore, `users/${user.uid}`);
    await updateDoc(docRef, this.configForm.value);
    alert('Configuración guardada.');
  }
}
