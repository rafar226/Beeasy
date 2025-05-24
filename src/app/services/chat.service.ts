import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  queryChat(
    query: string,
    history: { role: string; content: string }[],
    userId: string,
    options?: {
      defaultTone?: string;
      rolePrompt?: string;
      defaultInstructions?: string[];
    }
  ) {
    return this.http.post<{ answer: string }>('http://localhost:3000/chat/query', {
      query,
      history,
      userId,
      ...options
    });
  }
}
