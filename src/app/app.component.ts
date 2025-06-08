import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormlyForm, FormlyFormOptions } from '@ngx-formly/core';
import { ThemeToggleComponent } from './theme-toggle.component';
import { numberValidator } from './fc-validators/number-validator';

enum ArticleType {
  'Finance and insurance' = 'finance',
  Technology = 'technology',
  Health = 'health',
  Education = 'education',
}

interface FormModel {
  price?: number;
  quantity?: number;
  articleType?: ArticleType;
  discountCode?: string;
  customerType?: 'regular' | 'premium';
  total?: number;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormlyForm, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  form = new UntypedFormGroup({});
  model: FormModel = {};
  options: FormlyFormOptions = {};
  fields = [
    {
      key: 'customerType',
      type: 'fc-select',
      templateOptions: {
        label: 'Customer Type',
        required: true,
        options: [
          { label: 'Please select a value', value: undefined },
          { label: 'Regular', value: 'regular' },
          { label: 'Premium', value: 'premium' },
        ],
      },
    },
    {
      key: 'articleType',
      type: 'fc-switch-select',
      props: {
        label: 'Article Type',
        options: Object.entries(ArticleType).map(([label, value]) => ({
          label,
          value,
        })),
      },
    },
    {
      key: 'discountCode',
      type: 'fc-text',
      expressions: {
        hide: 'model.customerType !== "premium"',
      },
      templateOptions: {
        label: 'Discount Code',
      },
    },
    {
      key: 'price',
      type: 'fc-text',
      validators: {
        numberValidator,
      },
      templateOptions: {
        label: 'Price',
        type: 'number',
        required: true,
        placeholder: 'Enter price',
        min: 1,
        max: 10000,
      },
    },
    {
      key: 'quantity',
      type: 'fc-text',
      validators: {
        numberValidator,
      },
      templateOptions: {
        label: 'Quantity',
        type: 'number',
        required: true,
        placeholder: 'Enter quantity',
        min: 1,
        max: 1000,
      },
    },
    {
      key: 'total',
      type: 'fc-text',
      expressions: {
        hide: '!model.price || !model.quantity',
      },
      templateOptions: {
        label: 'Total',
        disabled: true,
      },
      expressionProperties: {
        'model.total': (model: typeof this.model) => {
          const isNumber = !(
            Number.isNaN(Number(model.price)) || Number.isNaN(Number(model.quantity))
          );
          if (isNumber && model.price && model.quantity) {
            if (model.discountCode && model.customerType === 'premium') {
              return model.price * model.quantity * 0.9; // 10% discount for premium customers
            } else {
              return model.price * model.quantity; // No discount
            }
          } else return undefined;
        },
      },
    },
  ];

  onSubmit(_model: FormGroup) {
    if (!this.form.touched) this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log('Form Submitted', this.model);
    } else {
      console.error('Form is invalid or not touched', this.form.errors);
    }
  }
}
