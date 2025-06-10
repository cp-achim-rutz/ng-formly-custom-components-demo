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
  styleUrl: './fc-switch-select.component.scss',
})
export class FcSwitchSelectComponent extends FieldType<FieldTypeConfig<SelectProps>> {
  onSelect(event: Event, value: string): void {
    event.preventDefault();
    this.formControl.setValue(value, { onlySelf: true });
    this.formControl.markAsDirty(); // Mark the control as dirty
  }
}
