import { FormlyFieldConfig } from '@ngx-formly/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export const numberValidator = {
  // @ts-ignore => used indirectly
  expression: (c: AbstractControl): ValidationErrors | null => {
    if (!c.value) return null;
    else return !Number.isNaN(Number(c.value)) ? { numberValidator: true } : null;
  },
  // @ts-ignore => used indirectly
  message: (error: any, field: FormlyFieldConfig) => {
    const label = field.props?.label || field.key;
    return `${label} must be a valid number`;
  },
};
