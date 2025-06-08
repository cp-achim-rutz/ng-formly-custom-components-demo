import { Component } from '@angular/core';
import {
  FieldType,
  FieldTypeConfig,
  FormlyAttributes,
  FormlyValidationMessage,
} from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'my-text',
  imports: [ReactiveFormsModule, FormlyValidationMessage, FormlyAttributes],
  templateUrl: 'my-text.component.html',
})
export class MyTextComponent extends FieldType<FieldTypeConfig> {
  onChange(_event: Event) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
  }
}
