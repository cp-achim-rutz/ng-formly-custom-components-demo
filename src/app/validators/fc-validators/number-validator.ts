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

export const betweenValidator = (min: number, max: number) => ( {
  // @ts-ignore => used indirectly
  expression: (c: AbstractControl): ValidationErrors | null => {
    if (!c.value) return null;
    else {
      const number = Number(c.value);
      const isBetween = number < min || number > max;
      return !isBetween ? { betweenValidator: true } : null;
    }
  },
  // @ts-ignore => used indirectly
  message: (error: any, field: FormlyFieldConfig) => {
    const label = field.props?.label || field.key;
    let message = `${label} must be between ${min} and ${max}`;
    return message;
  },
})
