import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyValidationMessage } from '@ngx-formly/core';

interface SelectProps {
  label?: string;
  options?: { label: string; value: string }[];
}

@Component({
  selector: 'my-select',
  imports: [FormlyValidationMessage],
  templateUrl: './my-select.component.html',
  styleUrl: './my-select.component.css',
})
export class MySelectComponent extends FieldType<FieldTypeConfig<SelectProps>> {
  onChange(event: Event) {
    this.formControl.setValue((event.target as HTMLSelectElement).value);
    this.formControl.markAsDirty();
  }
}
