import { Provider } from '@angular/core';
import { LoaderComponent } from './components';

export * from './components';
export * from './services';

export const AMOS_LOADER_COMPONENTS: Provider[] = [LoaderComponent];
