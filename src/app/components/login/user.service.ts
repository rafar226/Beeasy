import { Auth, authState } from '@angular/fire/auth';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { UserData } from './user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
    firestore = inject(Firestore);
    userId$: Observable<string | null>;

  constructor(private auth: Auth) {
    // Observable que emite el UID o null si no está logueado
    this.userId$ = authState(this.auth).pipe(
      map(user => user ? user.uid : null)
    );
  }

  async createOrUpdateUser(userData: UserData) {
    const userRef = doc(this.firestore, `users/${userData.id}`);
    await setDoc(userRef, userData, { merge: true }); // merge para no borrar campos existentes
  }

async getUser(id: string): Promise<UserData | null> {
    const userRef = doc(this.firestore, `users/${id}`);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserData;
    }
    return null;
  }
}
