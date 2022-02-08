import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

export class TranslateExtension implements FormlyExtension {
  private static TRANSLATE: TranslateService;

  constructor(translate: TranslateService) {
    TranslateExtension.TRANSLATE = translate;
  }

  prePopulate(field: FormlyFieldConfig) {
    if (TranslateExtension.TRANSLATE) {
      TranslateExtension.TRANSLATE.onLangChange.subscribe(event => {
        this.setTranslationsForLanguage(field, event.lang);
      });

      this.setTranslationsForLanguage(field, TranslateExtension.TRANSLATE.defaultLang, true);

      if (TranslateExtension.TRANSLATE.defaultLang !== TranslateExtension.TRANSLATE.currentLang) {
        this.setTranslationsForLanguage(field, TranslateExtension.TRANSLATE.currentLang);
      }
    }
  }

  setTranslationsForLanguage(field: FormlyFieldConfig, lang: string, initialSetup: boolean = false) {
    if (!field.templateOptions || !field.templateOptions.label || !lang) {
      return;
    }

    let translationsRef: any = {};

    if (initialSetup) {
      translationsRef['label'] = field.templateOptions?.label || '';
      translationsRef['help'] = field.templateOptions?.help || '';
      translationsRef['hint'] = field.templateOptions?.hint || '';
      translationsRef['placeholder'] = field.templateOptions?.placeholder || '';
    } else if (field.templateOptions?.translations && field.templateOptions?.translations[lang]) {
      translationsRef = field.templateOptions?.translations[lang];
    }

    let translationKey = getTranslationKey(field);

    if (!translationsRef) {
      console.error(`No translations available for ${translationKey} in language ${lang}.`);

      return;
    }

    if (field.templateOptions && !field.templateOptions?._translationBaseKey) {
      let copy = translationKey.slice();
      translationKey.length = 0;

      copy.forEach(key => translationKey.push(key.replace(/\./, '_')));

      field.templateOptions._translationBaseKey = translationKey.join('.');
    }

    let translations = translationKey.reverse().reduce((obj, key) => ({ [key]: obj }), translationsRef);

    TranslateExtension.TRANSLATE.setTranslation(lang, translations, true);
  }
}

const getTranslationKey = (field: FormlyFieldConfig): string[] => {
  if (field.templateOptions?._translationBaseKey) {
    return field.templateOptions._translationBaseKey.split('.');
  }

  if (!field?.parent) {
    if (field.templateOptions && !field.templateOptions._translationBaseKey) {
      field.templateOptions._translationBaseKey = `base_form_key_${new Date().getTime()}`;
    }

    return [field.templateOptions?._translationBaseKey || `base_form_key_${new Date().getTime()}`];
  }

  let keySegments = [];
  keySegments.push(...getTranslationKey(field.parent));
  keySegments.push(field.templateOptions?._translationBaseKey || field.templateOptions?._referenceId || field.id || field.key);

  return keySegments;
}
