import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './js/app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
