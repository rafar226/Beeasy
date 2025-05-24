import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideAuth, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from './user.service';
import { UserData } from './user.interface';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  private auth = inject(Auth);
  userService = inject(UserService)
  isLogin = signal(true);
  email = '';
  password = '';
  error: string | null = null;

  constructor(private router: Router) {}

    ngOnInit(): void {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.router.navigate(['/dashboard']);
        }
      });
    }

  toggleMode() {
    this.isLogin.update((val) => !val);
    this.error = null;
  }

  async handleSubmit() {
    this.error = null;

    try {
      if (this.isLogin()) {
        await signInWithEmailAndPassword(this.auth, this.email, this.password);
      } else {
        const credential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
        const user = credential.user;

        const userData: UserData = {
          id: user.uid,
          name: 'NOMBRE DEL USUARIO', // AGREGAR EN INPUT
          lastName: 'APELLIDO DEL USUARIO', // AGREGAR EN INPUT,
          conversations: [],
          isPaidCliente: false,
          files: [],
          defaultTone: '',
          rolePrompt: '', 
          defaultInstructions: [] 
        };

        await this.userService.createOrUpdateUser(userData);
      }
      this.router.navigate(['/mi-chat']); // Cambia esto según tu ruta principal
    } catch (err: any) {
      this.error = err.message;
    }
  }
}
