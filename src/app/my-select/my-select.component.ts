import {Component} from '@angular/core';
import {FieldType, FieldTypeConfig, FormlyFieldConfig} from '@ngx-formly/core';

interface SelectProps {
  label?: string;
  options?: { label: string; value: string }[];
}

@Component({
  selector: 'my-select',
  imports: [],
  templateUrl: './my-select.component.html',
  styleUrl: './my-select.component.css'
})
export class MySelectComponent extends FieldType<FieldTypeConfig<SelectProps>> {
  onChange(event: Event) {
    this.formControl.setValue((event.target as HTMLSelectElement).value);
    this.formControl.markAsDirty();
  }
}
