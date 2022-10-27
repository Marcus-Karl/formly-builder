import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormBuilder, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formly-form-builder-preview',
  templateUrl: './formly-form-builder-preview.component.html',
  styleUrls: ['./formly-form-builder-preview.component.scss']
})
export class FormlyFormBuilderPreviewComponent implements OnDestroy, OnInit {

  public isFormLoading = true;

  public form: UntypedFormGroup;
  public model: { [key: string]: any };
  public options: FormlyFormOptions;
  public fields: FormlyFieldConfig[];

  private _subscriptions: Array<Subscription>;

  constructor(private formlyJsonschema: FormlyJsonschema, private formlyBuilder: FormlyFormBuilder) {
    this._subscriptions = [];

    this.form = new UntypedFormGroup({});
    this.model = getModel;
    this.options = getOptions();

    let jsonSchema = getFieldValues();

    let formlyFieldConfig = this.formlyJsonschema.toFieldConfig(jsonSchema as any);

    console.log('Formly Field Config Before Build Form', JSON.parse(JSON.stringify(formlyFieldConfig)));

    this.fields = [formlyFieldConfig];

    this.formlyBuilder.buildForm(this.form, this.fields, this.model, this.options);

    console.log('Formly Fields After Build Form', this.fields[0]);
    console.log('FormGroup', this.form);
  }

  ngOnInit() {
    this.isFormLoading = false;
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());

    if (this.options.formState?.changeMap) {
      Object.values(this.options.formState?.changeMap || {}).forEach((x: any) => {
        if (x.unsubscribe) {
          x.unsubscribe();
        }
      });

      this.options.formState.changeMap = {};
    }
  }

  onSubmit(model: any) {
    console.log(`Called onSubmit!`);

    console.log(model);

    console.log(`JSON: ${JSON.stringify(model)}`);
  }
}

const getModel = {};

/* eslint-disable @typescript-eslint/naming-convention, max-len */

const getOptions = (): FormlyFormOptions => ({
  formState: {
    mainModel: getModel,
    changeMap: {}
  }
});

const getFieldValues = () => ({})
/* eslint-enable @typescript-eslint/naming-convention, max-len */
