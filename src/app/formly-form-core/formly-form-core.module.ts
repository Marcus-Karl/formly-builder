import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { DateAdapter, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TextFieldModule } from '@angular/cdk/text-field';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { DisplayHtmlComponent } from './fields/display-html/display-html.component';
import { SelectDropDownFieldComponent } from './fields/select-dropdown-field/select-dropdown-field.component';
import { CurrencyInputFieldComponent } from './fields/currency-input-field/currency-input-field.component';
import { NumberInputFieldComponent } from './fields/number-input-field/number-input-field.component';
import { TextInputComponentField } from './fields/text-input-field/text-input-field.component';
import { TextBoxFieldComponent } from './fields/textbox-field/textbox-field.component';
import { DefaultWrapperComponent } from './wrappers/default-wrapper.component';
import { registerExtensions } from './extensions/register.extension';
import { StepperFormComponent } from './display-types/stepper-form/stepper-form.component';
import { TabFormComponent } from './display-types/tab-form/tab-form.component';
import { ObjectTypeComponent } from './schema-types/object-type/object-type.component';
import { ArrayTypeComponent } from './schema-types/array-type/array-type.component';
import { FormlyTokenPipe } from './pipes/tokens.pipe';
import { DefaultFormComponent } from './display-types/default-form/default-form.component';
import { PageFormComponent } from './display-types/page-form/page-form.component';
import { CustomDateAdapter, DateTimeService } from './services/date-time.service';
import { TruncatePipe } from './pipes/truncate.pipe';
import { BypassSecurityTrustHtmlPipe } from './pipes/html-sanitizer.pipe';
import { SortOptionsPipe } from './pipes/sort-options.pipe';
import { validateBusinessRule } from './business-rules/business-rules.validator';
import { CustomMatIcons } from './services/custom-mat-icons.service';
import { SelectAutoCompleteFieldComponent } from './fields/select-autocomplete-field/select-autocomplete-field.component';
import { DateInputFieldComponent } from './fields/date-input-field/date-input-field.component';
import { ConfirmationModalComponent } from './modal/confirmation-modal/confirmation-modal.component';
import { ShowFormModalComponent } from './modal/show-form-modal/show-form-modal.component';
import { OverlayService } from './services/overlay.service';
import { InnerFormContainerComponent } from './display-types/inner-form-container/inner-form-container.component';
import { ExpansionPanelArrayFieldComponent } from './fields/expansion-panel-array-field/expansion-panel-array-field.component';
import { CustomDateInputComponent } from './components/custom-date-input/custom-date-input.component';
import { RadioButtonFieldComponent } from './fields/radio-button-field/radio-button-field.component';
import { ErrorsAndHintsComponent } from './components/errors-and-hints/errors-and-hints.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    TextFieldModule,
    MatRadioModule,
    MatRippleModule,
    MatStepperModule,
    MatTabsModule,
    OverlayModule,
    PlatformModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    TranslateModule,

    FormlyModule.forRoot({
      extras: {
        lazyRender: true
      },
      types: [
        // Custom Form Fields
        { name: 'currency-input-field', component: CurrencyInputFieldComponent },
        { name: 'date-input-field', component: DateInputFieldComponent },
        { name: 'display-html', component: DisplayHtmlComponent },
        { name: 'expansion-panel-array-field', component: ExpansionPanelArrayFieldComponent },
        { name: 'number-input-field', component: NumberInputFieldComponent },
        { name: 'radio-button-field', component: RadioButtonFieldComponent },
        { name: 'select-autocomplete-field', component: SelectAutoCompleteFieldComponent },
        { name: 'select-dropdown-field', component: SelectDropDownFieldComponent },
        { name: 'text-input-field', component: TextInputComponentField },
        { name: 'textbox-field', component: TextBoxFieldComponent },

        // Custom Form Display Types
        { name: 'default-form', component: DefaultFormComponent },
        { name: 'page-form', component: PageFormComponent },
        { name: 'stepper-form', component: StepperFormComponent },
        { name: 'tab-form', component: TabFormComponent },

        // Base Schema support types
        // See: https://json-schema.org/understanding-json-schema/reference/type.html
        { name: 'array', component: ArrayTypeComponent },
        { name: 'boolean', extends: 'object' },
        { name: 'enum', extends: 'select', defaultOptions: { wrappers: ['form-field'] } },
        { name: 'integer', extends: 'number' },
        { name: 'null', extends: 'object' },
        { name: 'number', extends: 'input', defaultOptions: { templateOptions: { type: 'number' }, wrappers: ['form-field'] } },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'string', extends: 'input', defaultOptions: { wrappers: ['form-field'] } },
      ],
      wrappers: [
        { name: 'default-wrapper', component: DefaultWrapperComponent },
      ],
      validators: [
        { name: 'business-rules', validation: validateBusinessRule }
      ]
    })
  ],
  declarations: [
    // Pipes
    BypassSecurityTrustHtmlPipe,
    FormlyTokenPipe,
    SortOptionsPipe,
    TruncatePipe,

    // Adapted Form Fields
    CurrencyInputFieldComponent,
    DateInputFieldComponent,
    DisplayHtmlComponent,
    ExpansionPanelArrayFieldComponent,
    NumberInputFieldComponent,
    RadioButtonFieldComponent,
    SelectAutoCompleteFieldComponent,
    SelectDropDownFieldComponent,
    TextBoxFieldComponent,
    TextInputComponentField,

    // Wrappers
    DefaultWrapperComponent,

    // Form Display Types
    DefaultFormComponent,
    PageFormComponent,
    StepperFormComponent,
    TabFormComponent,

    // Json Schema Field Types
    ObjectTypeComponent,
    ArrayTypeComponent,

    // Modals
    ConfirmationModalComponent,
    ShowFormModalComponent,
    InnerFormContainerComponent,

    // Misc
    CustomDateInputComponent,
    ErrorsAndHintsComponent
  ],
  exports: [
    CommonModule,
    ErrorsAndHintsComponent,
    FormlyModule,
    FormlyMaterialModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule,
    TruncatePipe,
    BypassSecurityTrustHtmlPipe,
    FormlyTokenPipe,
    SortOptionsPipe,
    TruncatePipe,
  ],
  providers: [
    CustomMatIcons,
    OverlayService,
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerExtensions, deps: [DateTimeService, TranslateService] },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormlyFormCoreModule { }
