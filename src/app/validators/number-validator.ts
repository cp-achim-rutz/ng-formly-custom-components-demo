import { FormlyFieldConfig } from '@ngx-formly/core';
import { AbstractControl } from '@angular/forms';

export const numberValidator = {
  expression: (c: AbstractControl) => {
    if (!c.value) return true;
    return !Number.isNaN(Number(c.value));
  },
  message: (error: any, field: FormlyFieldConfig) => {
    const label = field.props?.label || field.key;
    return `${label} must be a valid number`;
  },
};
