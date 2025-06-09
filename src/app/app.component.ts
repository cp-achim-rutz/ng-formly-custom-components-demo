import { Component, effect, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormlyForm, FormlyFormOptions } from '@ngx-formly/core';
import { ThemeToggleComponent } from './theme-toggle.component';
import { betweenValidator, numberValidator } from './validators/fc-validators/number-validator';

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
    discountCode?: string;
  };
  total?: number;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormlyForm, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {
    effect(() => {
      console.log(this.options.formState.model());
    });
  }

  form = new UntypedFormGroup({});
  model: FormModel = {
    inputs: {},
  };
  options: FormlyFormOptions = {
    formState: {
      model: signal(this.model),
    },
  };
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
          key: 'discountCode',
          type: 'fc-text',
          expressions: {
            // NOTE: this expression is evaluated on the level of the inputs field group; if parents need to be accessed, things get more complicated
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
            betweenValidator: betweenValidator(1,50),
          },
          templateOptions: {
            label: 'Quantity',
            type: 'number',
            required: true,
            placeholder: 'Enter quantity',
          },
        },
      ],
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
            if (model.inputs.discountCode && model.inputs.customerType === 'premium') {
              total = price * quantity * 0.9; // 10% discount for premium customers
            }
            return total;
          } else return undefined;
        },
      },
    },
  ];

  onSubmit(_model: FormGroup) {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      alert('Form Submitted:' + JSON.stringify(this.model, null, 2));
    } else {
      console.error('Form is invalid or not touched', this.form.errors);
    }
  }

  onReset() {
    this.options.formState.model(this.model);
  }
}
