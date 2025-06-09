import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFormlyCore } from '@ngx-formly/core';
import { routes } from './app.routes';
import { FcSelectComponent } from './controls/fc-select/fc-select.component';
import { FcTextComponent } from './controls/fc-text/fc-text.component';
import { FcSwitchSelectComponent } from './controls/fc-switch-select/fc-switch-select.component';
import { CardComponent } from './wrappers/card/card.component';

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
        wrappers: [
          { name: 'card-wrapper', component:  CardComponent },
        ],
      },
    ]),
  ],
};
