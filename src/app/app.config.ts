import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFormlyCore } from '@ngx-formly/core';
import { routes } from './app.routes';
import { FcTextComponent } from './fc-text/fc-text.component';
import { FcSelectComponent } from './fc-select/fc-select.component';
import { FcSwitchSelectComponent } from './fc-switch-select/fc-switch-select.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFormlyCore([
      {
        types: [
          {
            name: 'fc-select',
            component: FcSelectComponent,
          },
          {
            name: 'fc-text',
            component: FcTextComponent,
          },
          {
            name: 'fc-switch-select',
            component: FcSwitchSelectComponent,
          },
        ],
        validators: [
          {
            name: 'required',
            validation: (control) => {
              return control.value ? null : { required: true };
            },
          },
        ],
        validationMessages: [
          {
            name: 'required',
            message: (_error, fieldConfig) => `${fieldConfig?.props?.label} is required.`,
          },
        ],
      },
    ]),
  ],
};
