import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyValidationMessage } from '@ngx-formly/core';

interface SelectProps {
  label?: string;
  options?: { label: string; value: string }[];
}

@Component({
  selector: 'fc-select',
  imports: [FormlyValidationMessage],
  templateUrl: './fc-select.component.html',
  styleUrl: './fc-select.component.css',
})
export class FcSelectComponent extends FieldType<FieldTypeConfig<SelectProps>> {
  onChange(event: Event) {
    this.formControl.setValue((event.target as HTMLSelectElement).value);
    this.formControl.markAsDirty();
  }
}
