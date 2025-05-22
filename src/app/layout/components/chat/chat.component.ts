import { Component, inject, Input, signal } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  standalone: true,
  selector: 'beeasy-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class BeeasyChatComponent {
  chatService = inject(ChatService);
  @Input('cliente-id') clienteId: string = '';
  currentResponse = signal('');

  chatHistory = signal<{ role: 'user' | 'assistant', content: string }[]>([]);
  userQuery = '';
  results: any[] = [];

    ngOnInit() {
      console.log('Cliente ID recibido:', this.clienteId);
    }


sendQuery() {
  const query = this.userQuery;
  this.chatHistory.update(history => [...history, { role: 'user', content: query }]);

  this.chatService.queryChat(query, this.chatHistory()).subscribe(
    (res: any) => {
      console.log('Respuesta del backend:', res);

      // En este nuevo flujo, la API devuelve directamente la respuesta generada por OpenAI
      if (res.answer) {
        this.chatHistory.update(history => [...history, { role: 'assistant', content: res.answer }]);

        this.currentResponse.set(res.answer);
        console.log('Respuesta generada:', res.answer);
      } else {
        this.currentResponse.set('No se encontró una respuesta.');
        console.log('Respuesta vacía');
      }
    },
    (error) => {
      console.error('Error al consultar:', error);
      this.currentResponse.set('Hubo un error al consultar.');
    }
  );
}

  
}
