import { TranslateLoader } from '@ngx-translate/core';

import { en_common, en_ops, fr_common, fr_ops } from '@atelierhub/translations';

import { Observable, of } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    switch (lang) {
      case 'fr':
        return of({ ...fr_common, ...fr_ops });
      default:
        return of({ ...en_common, ...en_ops });
    }
  }
}
