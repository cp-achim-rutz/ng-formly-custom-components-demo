import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFormlyCore } from '@ngx-formly/core';

import { routes } from './app.routes';
import { MyTextComponent } from './my-text/my-text.component';
import { MySelectComponent } from './my-select/my-select.component';
import { SwitchSelectComponent } from './switch-select/switch-select.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFormlyCore([
      {
        types: [
          {
            name: 'my-select',
            component: MySelectComponent,
          },
          {
            name: 'my-text',
            component: MyTextComponent,
          },
          {
            name: 'switch-select',
            component: SwitchSelectComponent,
          },
        ],
      },
    ]),
  ],
};
