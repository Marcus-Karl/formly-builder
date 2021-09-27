
import { HttpClient } from '@angular/common/http';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class TranslateOverrideHttpLoader extends TranslateHttpLoader {

}

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    // console.warn('Translation Missing: ', params);
  }
}

export const createTranslateLoader = (http: HttpClient) => new TranslateOverrideHttpLoader(http, 'assets/i18n/', '.json')

