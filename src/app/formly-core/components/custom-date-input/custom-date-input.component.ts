import { Component, ElementRef, Inject, Input, OnDestroy, Optional, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';

import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'custom-date-input',
  templateUrl: './custom-date-input.component.html',
  styleUrls: ['./custom-date-input.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: CustomDateInputComponent }
  ],
})
export class CustomDateInputComponent implements ControlValueAccessor, MatFormFieldControl<any>, OnDestroy {
  static nextId = 0;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;

  @ViewChild('year') public yearInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('month') public monthInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('day') public dayInput: ElementRef<HTMLInputElement> | undefined;

  @Input() public describedBy: string | undefined;
  @Input() public id: string = `custom-date-input-${CustomDateInputComponent.nextId++}`;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.formGroup.disable() : this.formGroup.enable();
    this.stateChanges.next();
  }

  @Input()
  get value(): string | null {
    if (this.formGroup.valid) {
      let { value: { year, month, day } } = this.formGroup;

      if (year && month && day) {
        let dateTime = this.dateService.getDateFromParts(year, month, day);

        return dateTime?.toISOString() ?? null;
      }
    }

    return null;
  }

  set value(date: string | null) {
    let { year, month, day } = this.dateService.getDateToParts(date);

    this.formGroup.setValue({
      year: (year?.length && this.dateService.padLeadingZero(year, 4)) ?? null,
      month: (month?.length && this.dateService.padLeadingZero(month)) ?? null,
      day: (day?.length && this.dateService.padLeadingZero(day)) ?? null,
    })

    this.stateChanges.next();
  }

  @Input()
  get dateFormat(): string {
    return this._dateFormat;
  }

  set dateFormat(value: string) {
    if (value?.trim()) {
      this._dateFormat = value.trim();
    } else {
      this._dateFormat = 'mm/dd/yyyy';
    }

    this.parseDatePartsOrder();
  }

  get errorState(): boolean {
    return this.formGroup.invalid && this.touched;
  }

  get empty() {
    const { value: { year, month, day } } = this.formGroup;

    return !year && !month && !day;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  public formGroup: FormGroup;
  public stateChanges = new Subject<void>();
  public focused = false;
  public touched = false;
  public controlType = 'custom-date-input';
  public dateParts: string[] = [];
  public datePartDelimeter: string = '/';

  private _placeholder: string = '';
  private _required = false;
  private _disabled = false;
  private _dateFormat: string = 'mm/dd/yyyy';
  private _validKeyInputs: string = '0123456789';
  private _subscriptions: Subscription[] = [];

  constructor(
    formBuilder: FormBuilder,
    private _elementRef: ElementRef<HTMLElement>,
    private dateService: DateTimeService,
    private translateService: TranslateService,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {

    this.formGroup = formBuilder.group({
      year: [null, [Validators.minLength(4), Validators.maxLength(4)]],
      month: [null, [Validators.minLength(1), Validators.maxLength(2), Validators.max(12), Validators.min(1)]],
      day: [null, [Validators.minLength(1), Validators.maxLength(2), Validators.max(31), Validators.min(1)]]
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this._subscriptions.push(
      this.dateService.dateFormat$.subscribe(dateFormat => {
        this.dateFormat = dateFormat;
        this.parseDatePartsOrder();
      })
    );
  }

  onChange = (_: any) => { };
  onTouched = () => { };

  ngOnDestroy() {
    this.stateChanges.complete();

    this._subscriptions.forEach(x => x.unsubscribe());
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      let dateTime;
      let { value: { year, month, day } } = this.formGroup;

      if (this.ngControl?.control && (year || month || day)) {
        dateTime = this.dateService.getDateFromParts(year, month, day);
      }

      if (!dateTime && this.ngControl?.control) {
        this.formGroup.setErrors({ invalidDate: { message: this.translateService.stream('Invalid date') } });
      } else if (this.ngControl?.control?.hasError('invalidDate')) {
        this.formGroup.setErrors({ invalidDate: null });
      }

      if (this.ngControl.control) {
        this.ngControl.control?.patchValue(this.value)
      }

      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  setDescribedByIds(ids: string[]) {
    let controlElement = this._elementRef.nativeElement.querySelector('.custom-date-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() { }

  writeValue(date: string | null): void {
    this.value = date;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  parseDatePartsOrder() {
    this.datePartDelimeter = this._dateFormat.replace(/[\w]/g, '')[0];

    this.dateParts = this._dateFormat.split(this.datePartDelimeter);
  }

  keyPress(event: KeyboardEvent, input: HTMLInputElement, index: number, max: number, min: number = 1) {
    let keyPressed = event.key ?? '';
    let keyPressedLower = keyPressed.toLowerCase();

    let isBackspace = keyPressedLower === 'backspace';
    let isDelete = keyPressedLower === 'delete';
    let isLeftArrow = keyPressedLower === 'arrowleft';
    let isRightArrow = keyPressedLower === 'arrowright';
    let isSpecialKey = isBackspace || isDelete || isLeftArrow || isRightArrow;

    if (!isSpecialKey && (event.ctrlKey || keyPressed.length > 1)) {
      return true;
    } else if (!isSpecialKey && this._validKeyInputs.indexOf(keyPressed) === -1) {
      return false;
    }

    let modifiedSelectionString = (!isSpecialKey || isBackspace || isDelete) && this.getModifiedSelectionString(input, keyPressed) || '';

    let isValidKeypress = !modifiedSelectionString || this.isValidValueInclusive(modifiedSelectionString, max, min);

    let selectionStart = input.selectionStart ?? 0;
    let selectionEnd = input.selectionEnd ?? 0;

    if (isRightArrow && selectionStart === (input.value ?? '').length && selectionStart === selectionEnd) {
      this.autoFocusNext(index, false, true);
    } else if (isValidKeypress && selectionStart === 0 && selectionStart === selectionEnd && (isBackspace || isLeftArrow)) {
      this.autoFocusNext(index, true);

      return false;
    }

    return isValidKeypress;
  }

  keyUp(event: KeyboardEvent, input: HTMLInputElement, index: number, max: number, maxLength: number = 2) {
    let value: string = input.value ?? '';

    let keyPressed = event?.key?.toLowerCase() ?? '';

    if (this.datePartDelimeter === keyPressed || (this._validKeyInputs.indexOf(keyPressed) > -1 && (value.length >= maxLength || Number(value + '0') > max))) {
      this.autoFocusNext(index);
    }
  }

  onBlur(control: AbstractControl, max: number, min: number = 1, maxLength: number = 2, canPad: boolean = true) {
    let value = control.value as string ?? '';

    if (Number(value) === 0) {
      control.patchValue('');
    } else if (canPad && value.length < maxLength && this.isValidValueInclusive(value, max, min)) {
      control.patchValue(('000000' + value).slice(- maxLength));
    }
  }

  onPaste(event: ClipboardEvent) {
    let pastedData = event.clipboardData?.getData('text') ?? '';

    if (/^[\d]{1,4}$/.test(pastedData)) {
      return true;
    }

    let pastedParts = pastedData.split('/');

    if (pastedParts.length < 3) {
      pastedParts = pastedData.split('-');

      if (pastedParts.length < 3) {
        console.error(`Unable to parse date: ${pastedData}`);
        return false;
      }
    }

    let parsedDate = this.dateService.parseUserPastedDateToISO(pastedData);

    if (parsedDate) {
      let { year, month, day } = this.dateService.getDateToParts(parsedDate);

      this.formGroup.setValue({
        year: this.dateService.padLeadingZero(year, 4),
        month: this.dateService.padLeadingZero(month),
        day: this.dateService.padLeadingZero(day)
      });

      this.stateChanges.next();
    }

    return false;
  }

  private isValidValueInclusive(value: any, max: number, min: number = 1) {
    let number = Number(value);

    return !Number.isNaN(number) && number >= min && number <= max;
  }

  private getModifiedSelectionString(input: HTMLInputElement, keyPressed: string) {
    let selectionStart = input.selectionStart ??0;
    let selectionEnd = input.selectionEnd ?? 0;
    let fieldValue = input.value as string ?? '';

    let modifiedSelectionString: string;

    if (keyPressed.toLowerCase() === 'delete') {
      modifiedSelectionString = fieldValue.substring(0, selectionStart) + fieldValue.substring(selectionStart === selectionEnd ? selectionEnd + 1 : selectionEnd);
    } else if (keyPressed.toLowerCase() === 'backspace') {
      modifiedSelectionString = fieldValue.substring(0, selectionStart > 0 ? selectionStart - 1 : selectionStart) + fieldValue.substring(selectionEnd);
    } else {
      modifiedSelectionString = fieldValue.substring(0, selectionStart) + keyPressed + fieldValue.substring(selectionEnd);
    }

    return modifiedSelectionString;
  }

  private autoFocusNext(index: number, isBackspace: boolean = false, isRightArrow: boolean = false): void {
    let nextElement: HTMLInputElement | undefined;

    let nextPart = this.dateParts[isBackspace ? index - 1 : index + 1] ?? '';

    switch (nextPart) {
      case 'yyyy':
        nextElement = this.yearInput?.nativeElement;
        break;
      case 'mm':
        nextElement = this.monthInput?.nativeElement;
        break;
      case 'dd':
        nextElement = this.dayInput?.nativeElement;
        break;
      default:
        break;
    }

    if (nextElement) {
      nextElement.focus();

      let endPosition = isRightArrow ? 0 : (nextElement.value ?? '').length;
      let startPosition = isBackspace ? endPosition : 0;

      setTimeout(() => nextElement?.setSelectionRange(startPosition, endPosition), 0);
    }
  }
}
