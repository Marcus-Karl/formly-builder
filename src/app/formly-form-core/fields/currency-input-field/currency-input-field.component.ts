import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { Subscription } from 'rxjs';

import { SelectOption } from 'src/app/formly-form-core/models/multiple-choice.models';

@Component({
  selector: 'currency-input-field',
  templateUrl: './currency-input-field.component.html',
  styleUrls: ['./currency-input-field.component.scss']
})
export class CurrencyInputFieldComponent extends FieldType<FormlyFieldConfig> implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('currencyinput') public currencyInput: ElementRef<HTMLInputElement> | undefined;

  public amountField: FormlyFieldConfig | undefined;
  public currencySelection: FormlyFieldConfig | undefined;
  public currencyOptions: SelectOption[] = [];
  public currencySymbolWidth: number = 0;
  public selectedCurrency: string = 'USD';
  public prefixSymbol: string = '';
  public suffixSymbol: string = '';

  private _numberFormat: Intl.NumberFormat | undefined;
  private _currencySymbol: string = '$';
  private _decimalDelimeter: string = '.';
  private _localeGroupSeperator: string = ',';
  private _localeGroupSeparatorRegex: RegExp = new RegExp(this._localeGroupSeperator, 'g');
  private _maximumDecimalPlaces: number = 2;
  private _validKeyInputs: string = '0123456789' + this._decimalDelimeter;
  private _maxAmount: number = 999999999999;

  private _subscriptions: Subscription[] = [];

  ngOnInit() {
    this.amountField = this.field.fieldGroup?.find(x => x.key === 'amount');
    this.currencySelection = this.field.fieldGroup?.find(x => x.key === 'currency');

    if (this.amountField?.props?.max) {
      this._maxAmount = this.amountField.props.max;
    }

    if (this.currencySelection) {
      if (this.currencySelection.formControl?.valueChanges) {
        this._subscriptions.push(this.currencySelection.formControl.valueChanges.subscribe((currency: string) => this.setCurrencyFormatting(currency)));
      }

      if (this.currencySelection.options?.fieldChanges) {
        this._subscriptions.push(
          this.currencySelection.options.fieldChanges.subscribe(field => {
            if (field['property'] === 'props.options' && Array.isArray(field.value)) {
              this.currencyOptions = (this.currencySelection?.props?.options || []) as SelectOption[];

              if (this.currencySelection?.formControl?.value && !this.currencyOptions.find(x => x.value === this.currencySelection?.formControl?.value)) {
                this.currencySelection.formControl.setValue(null);
              }
            }
          })
        );
      }

      if (this.currencySelection.props?.options) {
        this.currencyOptions = (this.currencySelection?.props?.options || []) as SelectOption[];
      }
    }

    this.setCurrencyFormatting(this.currencySelection?.formControl?.value);
  }

  ngAfterViewInit() {
    if (this.currencyInput?.nativeElement && !!this.amountField?.formControl?.value) {
      let amount = Number(this.amountField.formControl.value);

      if (!Number.isNaN(amount)) {
        this.currencyInput.nativeElement.value = this.formatAmount(amount);
      }
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());

    super.ngOnDestroy();
  }

  getFormControl(formControl: AbstractControl) {
    return formControl as UntypedFormControl;
  }

  formatCurrencyInput(isDelete: boolean = false) {
    let inputValue = this.currencyInput?.nativeElement.value as string;
    let currencyValueString = (inputValue).replace(this._localeGroupSeparatorRegex, '');

    // Replace decimal delimeter during conversion in the case of , is delimeter
    let currencyValue = Number(currencyValueString.replace(this._decimalDelimeter, '.'));

    let isValid = this.isValidAmount(currencyValueString);

    if (isValid && currencyValueString && this.currencyInput?.nativeElement) {
      let formattedCurrency = this.formatAmount(currencyValue, currencyValueString);

      if (inputValue === formattedCurrency) {
        return;
      }

      let selectionStart = this.currencyInput?.nativeElement.selectionStart || 0;
      let selectionEnd = this.currencyInput?.nativeElement.selectionEnd || 0;

      this.currencyInput.nativeElement.value = formattedCurrency;

      this.keepOrignalCaretPosition(this.currencyInput.nativeElement, inputValue, formattedCurrency, selectionStart, selectionEnd, isDelete);
    }
  }

  onPaste(event: ClipboardEvent) {
    let pastedData = event.clipboardData?.getData('text') || '';
    return this.isInputValid(pastedData);
  }

  keyPress(event: KeyboardEvent) {
    let keyPressed = event.key || '';
    let isRemove = keyPressed.toLowerCase() === 'delete' || keyPressed.toLowerCase() === 'backspace';

    if (!isRemove && (event.ctrlKey || keyPressed.length > 1)) {
      return true;
    } else if (!isRemove && this._validKeyInputs.indexOf(keyPressed) === -1) {
      return false;
    }

    return this.isInputValid(keyPressed);
  }

  keyUp(event: Event | KeyboardEvent) {
    let value: string = (this.currencyInput?.nativeElement.value)?.replace(this._localeGroupSeparatorRegex, '') || '';

    this.amountField?.formControl?.patchValue(value.endsWith(this._decimalDelimeter) ? value.slice(0, -1) : value.replace(this._decimalDelimeter, '.'));

    let delimeterIndex = (this.currencyInput?.nativeElement.value || '').indexOf(this._decimalDelimeter);
    let selectionStart = this.currencyInput?.nativeElement.selectionStart || 0;
    let keyPressed = (event as KeyboardEvent)?.key?.toLowerCase() || '';

    if (delimeterIndex === -1 || delimeterIndex >= selectionStart) {
      this.formatCurrencyInput(keyPressed === 'delete');
    }
  }

  private setCurrencyFormatting(currencyCode: MatSelectChange | string = 'USD') {
    if (currencyCode instanceof MatSelectChange) {
      this.selectedCurrency = currencyCode.value;
    } else {
      this.selectedCurrency = currencyCode;
    }

    this._numberFormat = new Intl.NumberFormat(undefined, { style: 'currency', currency: this.selectedCurrency });

    let formattedNumber = this._numberFormat.format(1111111.1111111);
    let currencyNumberParts = this._numberFormat.formatToParts(1111111.1111111);

    this._maximumDecimalPlaces = this._numberFormat.resolvedOptions().maximumFractionDigits;
    this._localeGroupSeperator = currencyNumberParts.find(x => x.type === 'group')?.value || ',';
    this._decimalDelimeter = currencyNumberParts.find(x => x.type === 'decimal')?.value || '.';
    this._validKeyInputs = '0123456789' + this._decimalDelimeter;

    this._localeGroupSeparatorRegex = new RegExp(this._localeGroupSeperator, 'g');

    this.setCurrencySymbolPosition(formattedNumber, currencyNumberParts);
  }

  private formatAmount(amount: number, originalValue: string = '') {
    let formattedCurrency = (this._numberFormat?.format(amount) || '').replace(this._currencySymbol, '').trim();

    if (this._decimalDelimeter && Number.isInteger(amount) && !originalValue.includes(this._decimalDelimeter)) {
      formattedCurrency = formattedCurrency.split(this._decimalDelimeter)[0];
    }

    return formattedCurrency;
  }

  private isInputValid(inputValue: string) {
    let selectionStart = this.currencyInput?.nativeElement.selectionStart || 0;
    let selectionEnd = this.currencyInput?.nativeElement.selectionEnd || 0;
    let fieldValue = this.currencyInput?.nativeElement.value as string;

    let modifiedSelectionString: string;

    if (inputValue.toLowerCase() === 'delete') {
      modifiedSelectionString = fieldValue.substring(0, selectionStart) + fieldValue.substring(selectionStart === selectionEnd ? selectionEnd + 1 : selectionEnd);
    } else if (inputValue.toLowerCase() === 'backspace') {
      modifiedSelectionString = fieldValue.substring(0, selectionStart > 0 ? selectionStart -1 : selectionStart) + fieldValue.substring(selectionEnd);
    } else {
      modifiedSelectionString = fieldValue.substring(0, selectionStart) + inputValue + fieldValue.substring(selectionEnd);
    }

    return this.isValidAmount(modifiedSelectionString);
  }

  private isValidAmount(value: string = '') {
    value = value.replace(this._localeGroupSeparatorRegex, '');

    // Replace decimal delimeter during conversion in the case of , is delimeter
    let numberValue = Number(value.replace(this._decimalDelimeter, '.'));
    let decimals = value.split(this._decimalDelimeter)[1];

    return !Number.isNaN(numberValue) && numberValue < this._maxAmount && (decimals ? decimals.length <= this._maximumDecimalPlaces : true);
  }

  private setCurrencySymbolPosition(formattedNumber: string, currencyNumberParts: Intl.NumberFormatPart[]) {
    this._currencySymbol = currencyNumberParts.find(x => x.type === 'currency')?.value || '$';

    if (this._currencySymbol && formattedNumber.indexOf(this._currencySymbol) === 0) {
      this.prefixSymbol = this._currencySymbol + ' ';
      this.suffixSymbol = '';
    } else if (this._currencySymbol) {
      this.prefixSymbol = '';
      this.suffixSymbol = ' ' + this._currencySymbol;
    } else {
      this.prefixSymbol = '';
      this.suffixSymbol = '';
    }
  }

  private keepOrignalCaretPosition(element: HTMLInputElement, originalValue: string, formattedValue: string, selectionStart: number, selectionEnd: number, isDelete: boolean) {
    if (selectionStart !== originalValue.length && element?.setSelectionRange) {
      if (selectionEnd === 0) {
        element.setSelectionRange(0, 0);

        return;
      }

      let adjustedStart = false;
      let adjustedEnd = false;

      let orginalIndex = originalValue.indexOf(this._decimalDelimeter);
      let formattedIndex = formattedValue.indexOf(this._decimalDelimeter);

      if (orginalIndex <= selectionStart && formattedIndex !== -1) {
        let decimalPosition = selectionStart - orginalIndex;
        selectionStart = formattedIndex + decimalPosition;

        adjustedStart = true;
      }

      if (orginalIndex <= selectionEnd && formattedIndex !== -1) {
        let decimalPosition = selectionEnd - orginalIndex;
        selectionEnd = formattedIndex + decimalPosition;

        adjustedEnd = true;
      }

      if (!adjustedStart || !adjustedEnd) {
        let startSubString = originalValue.substring(0, selectionStart);
        let originalStringSeparatorCount = (startSubString.match(new RegExp(`\\${this._localeGroupSeperator}`, 'g')) || []).length;

        let adjustedSelectionStart = adjustedStart ? -1 : selectionStart - originalStringSeparatorCount;
        let adjustedSelectionEnd = adjustedEnd ? -1 : selectionEnd - originalStringSeparatorCount;

        for (let i = 0; i < formattedValue.length && (adjustedSelectionStart > -1 || adjustedSelectionEnd > -1); i++) {
          if (adjustedSelectionStart === 0) {
            selectionStart = i;
            adjustedSelectionStart--;
          } else if (formattedValue.charAt(i) !== this._localeGroupSeperator) {
            adjustedSelectionStart--;
          }

          if (adjustedSelectionEnd === 0) {
            selectionEnd = i;
            adjustedSelectionEnd--;
          } else if (formattedValue.charAt(i) !== this._localeGroupSeperator) {
            adjustedSelectionEnd--;
          }
        }
      }

      let character = formattedValue.charAt(selectionStart);

      if (isDelete && selectionStart === selectionEnd && (character === this._localeGroupSeperator || character === this._decimalDelimeter)) {
        selectionStart++;
        selectionEnd++;
      }

      element.setSelectionRange(selectionStart, selectionEnd);
    }
  }
}
