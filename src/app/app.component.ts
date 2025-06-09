import { Component, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormlyForm, FormlyFormOptions } from '@ngx-formly/core';
import { ThemeToggleComponent } from './theme-toggle.component';
import { numberValidator } from './validators/fc-validators/number-validator';

enum ArticleType {
  'Finance and insurance' = 'finance',
  Technology = 'technology',
  Health = 'health',
  Education = 'education',
}

interface FormModel {
  inputs: {
    price?: number;
    quantity?: number;
    articleType?: ArticleType;
    customerType?: 'regular' | 'premium';
  };
  discountCode?: string;
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
  model:FormModel ={
    inputs: {},
  };
  options: FormlyFormOptions = {};
  fields = [
    {
      key: 'inputs',
      wrappers: ['card-wrapper'],
      props: { label: 'Input Fields' },
      fieldGroup: [
        {
          key: 'customerType',
          type: 'fc-select',
          templateOptions: {
            label: 'Customer Type',
            required: true,
            options: [
              { label: 'Please select a value', value: undefined, default: true },
              { label: 'Regular', value: 'regular', default: false },
              { label: 'Premium', value: 'premium', default: false },
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
      ],
    },
    {
      key: 'discountCode',
      type: 'fc-text',
      templateOptions: {
        label: 'Discount Code',
      },
      expressions: {
        // TODO: now it does work???
        hide: "!model.inputs?.customerType || model.inputs.customerType !== 'premium'",
      },
    },
    {
      key: 'total',
      type: 'fc-text',
      expressions: {
        hide: '!model?.inputs?.price || !model?.inputs?.quantity',
      },
      templateOptions: {
        label: 'Total',
        disabled: true,
      },
      expressionProperties: {
        'model.total': (model: FormModel) => {
          if (!model.inputs) return undefined;
          const price = Number(model.inputs?.price);
          const quantity = Number(model.inputs?.quantity);
          const isNumber = !(Number.isNaN(price) || Number.isNaN(quantity));
          if (isNumber) {
            let total = price * quantity;
            if (model.discountCode && model.inputs.customerType === 'premium') {
              total = price * quantity * 0.9; // 10% discount for premium customers
            }
            return total;
          } else return undefined;
        },
      },
    },
  ];

  onSubmit(_model: FormGroup) {
    console.log(this.model);
    this.form.markAllAsTouched();
    if (this.form.valid) {
      alert('Form Submitted:' + JSON.stringify(this.model, null, 2));
    } else {
      console.error('Form is invalid or not touched', this.form.errors);
    }
  }
}
