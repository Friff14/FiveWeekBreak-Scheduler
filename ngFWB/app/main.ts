// For bootstrapping purposes.

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// The imports from the modules.
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);