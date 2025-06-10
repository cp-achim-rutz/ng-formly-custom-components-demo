import { Component } from '@angular/core';
import {
  FieldType,
  FieldTypeConfig,
  FormlyAttributes,
  FormlyValidationMessage,
} from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

interface SelectProps {
  label?: string;
  options?: {
    label: string;
    value?: string;
    default: boolean;
  }[];
}

@Component({
  selector: 'fc-select',
  imports: [FormlyValidationMessage, FormlyAttributes, ReactiveFormsModule],
  templateUrl: './fc-select.component.html',
  styleUrl: './fc-select.component.scss',
})
export class FcSelectComponent extends FieldType<FieldTypeConfig<SelectProps>> {
  onChange(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      const value = event.target.value === 'undefined' ? undefined : event.target.value;
      this.formControl.setValue(value, {
        onlySelf: true,
      });
    }
    this.formControl.markAsDirty();
  }
}
