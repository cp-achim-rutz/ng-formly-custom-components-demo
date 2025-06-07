import {Component} from '@angular/core';
import {FormGroup, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {FormlyForm, FormlyFormOptions} from '@ngx-formly/core';
import {ThemeToggleComponent} from './theme-toggle.component';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormlyForm, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  form = new UntypedFormGroup({});
  model = {
    price: 10,
    quantity: 2,
    discountCode: '',
    customerType: 'regular',
  };
  options: FormlyFormOptions = {};
  fields = [
    {
      key: 'customerType',
      type: 'my-select',
      templateOptions: {
        label: 'Customer Type',
        required: true,
        options: [
          { label: 'Regular', value: 'regular' },
          { label: 'Premium', value: 'premium' },
        ],
      },
    },
    {
      key: 'discountCode',
      type: 'my-text',
      expressions: {
        hide: 'model.customerType === "regular"',
      },
      templateOptions: {
        label: 'Discount Code',
      },
    },
    {
      key: 'price',
      type: 'my-text',
      templateOptions: {
        label: 'Price',
        type: 'number',
      },
    },
    {
      key: 'quantity',
      type: 'my-text',
      templateOptions: {
        label: 'Quantity',
        type: 'number',
      },
    },
    {
      key: 'total',
      type: 'my-text',
      expressions: {
        hide: '!model.price || !model.quantity',
      },
      templateOptions: {
        label: 'Total',
        disabled: true,
      },
      expressionProperties: {
        'model.total': (model: typeof this.model) => {
          if(model.discountCode && model.customerType === 'premium') {
            return model.price * model.quantity * 0.9; // 10% discount for premium customers
          } else {
            return model.price * model.quantity; // No discount
          }
        },
      },
    },
  ];

  onSubmit(_model:FormGroup) {
    console.log(JSON.stringify(this.model));
  }
}
