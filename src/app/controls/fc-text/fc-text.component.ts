import { Component } from '@angular/core';
import {
  FieldType,
  FieldTypeConfig,
  FormlyAttributes,
  FormlyValidationMessage,
} from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'fc-text',
  imports: [ReactiveFormsModule, FormlyValidationMessage, FormlyAttributes],
  templateUrl: 'fc-text.component.html',
  styleUrl: 'fc-text.component.scss',
})
export class FcTextComponent extends FieldType<FieldTypeConfig> {
  onChange(_event: Event) {
    this.formControl.markAsDirty();
  }
}
