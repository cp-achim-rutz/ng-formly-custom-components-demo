import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

type SelectProps = {
  label?: string;
  options?: { label: string; value: string }[];
};

@Component({
  selector: 'fc-switch-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule],
  templateUrl: './fc-switch-select.component.html',
  styleUrl: './fc-switch-select.component.css',
})
export class FcSwitchSelectComponent extends FieldType<FieldTypeConfig<SelectProps>> {
  onSelect(value: any): void {
    this.formControl.setValue(value);
    this.formControl.markAsDirty(); // Mark the control as dirty
  }
}
