import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'my-text',
  imports: [ReactiveFormsModule],
  templateUrl: 'my-text.component.html',
})
export class MyTextComponent extends FieldType<FieldTypeConfig> {
  onChange(_event: Event) {
    this.formControl.markAsDirty(); // Mark the control as dirty
  }
}
