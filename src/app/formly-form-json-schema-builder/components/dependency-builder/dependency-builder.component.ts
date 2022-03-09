import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';
import * as _ from 'lodash';
import { BuilderFormState, FieldInformation, PageInformation, SelectionOption } from '../../models/builder-form-state';
import { FormlyFormJsonSchemaInternalBuilderService } from '../../services/formly-form-json-schema-internal-builder.service';

@Component({
  selector: 'app-dependency-builder',
  templateUrl: './dependency-builder.component.html',
  styleUrls: ['./dependency-builder.component.scss']
})
export class DependencyBuilderComponent extends FieldArrayType implements OnDestroy, OnInit {

  private _formState?: BuilderFormState;
  private _pageFieldsWithOptions: FieldInformation[] = [];
  private _selectionOptions: SelectionOption[] = [];
  private _parentPage?: FormlyFieldConfig;

  constructor(private builderInternalService: FormlyFormJsonSchemaInternalBuilderService) {
    super();
  }

  async ngOnInit() {
    this._formState = this.options?.formState;
    this._parentPage = this.builderInternalService.findFirstAncestoryByType(this.field, 'page-form');

    await this._formState?.builder.functions.refreshPagesInformation();

    if (!this._parentPage?.model?._referenceId) {
      console.error(`Unable to find referenceId for parent page.`);
    } else if (this._formState?.builder.pagesInformation[this._parentPage.model._referenceId]) {
      this._buildFieldSelectionOptions(this._formState?.builder.pagesInformation[this._parentPage.model._referenceId]);
      this.field.fieldGroup?.forEach(field => this._setSelectionOptions(field));
    }
  }

  ngOnDestroy() {
    
  }

  public add() {
    let index = this.field.fieldGroup?.length || 0;

    super.add(index);

    if (this.field.fieldGroup && this.field.fieldGroup[index]) {
      this._setSelectionOptions(this.field.fieldGroup[index]);
    }
  }

  private _buildFieldSelectionOptions(pageInfo: PageInformation) {
    this._pageFieldsWithOptions = pageInfo.fields.filter(field => field.options?.length);

    this._pageFieldsWithOptions.forEach(field =>
      field.options.forEach(option =>
        this._selectionOptions.push({
          group: field.label,
          value: `${field.referenceId}_${option}`,
          label: `${option} - (${_.truncate(field.label)})`
        })
      )
    );

    console.log(this._selectionOptions);
    console.log(this._pageFieldsWithOptions);
  }

  private _setSelectionOptions(field: FormlyFieldConfig) {
    let selectionFields = this.builderInternalService.findAllDescendantsByKey(field, 'selection');

    selectionFields.forEach(sf => {
      if (sf.templateOptions) {
        sf.templateOptions.options = this._selectionOptions;
      }
    });
  }
}
