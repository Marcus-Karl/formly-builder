import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

export class TranslateExtension implements FormlyExtension {
  private static TRANSLATE: TranslateService;

  constructor(translate: TranslateService) {
    TranslateExtension.TRANSLATE = translate;
  }

  prePopulate(field: FormlyFieldConfig) {
    if (TranslateExtension.TRANSLATE?.defaultLang) {
      this.setDefaultTranslations(field);
    }
  }

  setDefaultTranslations(field: FormlyFieldConfig) {
    if (!field.templateOptions?.label && !field.templateOptions?.help && !field.templateOptions?.hint && !field.templateOptions?.placeholder) {
      return;
    }

    let translationsRef: any = {
      label: field.templateOptions?.label || '',
      help: field.templateOptions?.help || '',
      hint: field.templateOptions?.hint || '',
      placeholder: field.templateOptions?.placeholder || ''
    };

    let translationKey = getTranslationKey(field);

    if (field.templateOptions && !field.templateOptions?._translationKey) {
      let copy = translationKey.slice();
      translationKey.length = 0;

      copy.forEach(key => translationKey.push(key.replace(/\./, '_')));

      field.templateOptions._translationKey = translationKey.join('.');
    }

    let translations = translationKey.reverse().reduce((obj, key) => ({ [key]: obj }), translationsRef);

    TranslateExtension.TRANSLATE.setTranslation(TranslateExtension.TRANSLATE.defaultLang, translations, true);
  }
}

const getTranslationKey = (field: FormlyFieldConfig): string[] => {
  if (field.templateOptions?._translationKey) {
    return field.templateOptions._translationKey.split('.');
  }

  let keySegments = [];
  keySegments.push(...getPathTranslationKeys(field));

  return keySegments;
}

const getPathTranslationKeys = (field: FormlyFieldConfig): Array<string> => {
  if (field?.templateOptions?.translationKey) {
    return [getTranslationFormKey(field)].concat(field?.templateOptions?.translationKey);
  }

  if (field.parent) {
    return getPathTranslationKeys(field.parent).concat(field.templateOptions?.translationKey || field.templateOptions?._referenceId || field.id || field.key || []);
  } else {
    return [getTranslationFormKey(field)].concat(field.templateOptions?.translationKey || field.templateOptions?._referenceId || field.id || field.key || []);
  }
}

const getTranslationFormKey = (field: FormlyFieldConfig): string => {
  if (!field?.parent) {
    if (field.templateOptions && !field.templateOptions.translationFormKey) {
      if (field.fieldGroup?.length === 1 && field.fieldGroup[0].templateOptions?.translationFormKey) {
        field.templateOptions.translationFormKey = field.fieldGroup[0].templateOptions?.translationFormKey;
      } else {
        field.templateOptions.translationFormKey = `base_form_key_${new Date().getTime()}`;
      }
    }

    return field.templateOptions?.translationFormKey;
  }

  return getTranslationFormKey(field.parent);
}
