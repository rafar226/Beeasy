import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from '@angular/fire/firestore';
import { provideStorage, getStorage, StorageModule } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    // provideFirestore(() => {
    //   const app = getApp(); // Usa la instancia ya inicializada
    //   const firestore = initializeFirestore(app, {
    //     localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    //   });
    //   return firestore;
    // }),
    provideFirestore(() => getFirestore()), // ✅ ya usa la app inicializada
    provideStorage(() => getStorage()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      BrowserAnimationsModule,
      LayoutModule,
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      HttpClientModule,
    )
  ]
};
