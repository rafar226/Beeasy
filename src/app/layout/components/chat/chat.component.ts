import { Component, effect, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  standalone: true,
  selector: 'beeasy-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class BeeasyChatComponent {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  firestore = inject(Firestore);
  auth = inject(Auth);
  chatService = inject(ChatService);

  @Input('cliente-id') clienteId: string = '';
  currentResponse = signal('');
  isTyping = signal(false);
  chatHistory = signal<{ role: 'user' | 'assistant', content: string }[]>([]);
  userQuery = '';
  results: any[] = [];
  id: string = 'pruebaIdUser'; // cambiar por id de usuario cuadno tenga auth

  userConfig = {
    defaultTone: '',
    rolePrompt: '',
    defaultInstructions: [] as string[],
  };
  
  constructor() {
    effect(() => {
      localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory()));
    });
  }

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (!user) return;

    const docRef = doc(this.firestore, `users/${user.uid}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();

      this.userConfig.defaultTone = data['defaultTone'] || '';
      this.userConfig.rolePrompt = data['rolePrompt'] || '';
      this.userConfig.defaultInstructions = data['defaultInstructions'] || [];
    }

    console.log('Cliente ID recibido:', this.clienteId);

    const stored = localStorage.getItem('chatHistory');
    if (stored) {
      this.chatHistory.set(JSON.parse(stored));
    }


  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const container = this.messagesContainer?.nativeElement;
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 100);
    }
  }


  sendQuery() {
    // const userConfig = {
    //   defaultTone: 'profesional',
    //   rolePrompt: 'Eres un abogado especializado en derecho laboral',
    //   defaultInstructions: [
    //     'No digas que eres un modelo de lenguaje.',
    //     'Sé conciso en tus respuestas.',
    //     'Tu profesion es abogado'
    //   ]
    // };

    const userText = this.userQuery.trim();
    if (!userText) return;

    const query = this.userQuery;
    this.chatHistory.update(history => [...history, { role: 'user', content: query }]);
    this.isTyping.set(true);
    this.scrollToBottom();

    this.chatService.queryChat(query, this.chatHistory(), this.id, this.userConfig).subscribe(
      (res: any) => {

        if (res.answer) {
          this.chatHistory.update(history => [...history, { role: 'assistant', content: res.answer }]);

          this.userQuery = '';
          this.isTyping.set(false);
          this.scrollToBottom();

          this.currentResponse.set(res.answer);
        } else {
          this.currentResponse.set('No se encontró una respuesta.');
        }
      },
      (error) => {
        console.error('Error al consultar:', error);
        this.currentResponse.set('Hubo un error al consultar.');
      }
    );
  }

  clearHistory() {
    this.chatHistory.set([]);
    localStorage.removeItem('chatHistory');
  }
}
