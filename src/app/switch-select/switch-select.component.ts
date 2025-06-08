import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

type SelectProps = {
  label?: string;
  options?: { label: string; value: string }[];
}

@Component({
  selector: 'app-switch-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule],
  templateUrl: './switch-select.component.html',
  styleUrl: './switch-select.component.css'
})
export class SwitchSelectComponent extends FieldType<FieldTypeConfig<SelectProps>> {
  onSelect(value: any): void {
    this.formControl.setValue(value);
    this.formControl.markAsDirty(); // Mark the control as dirty
  }
}
