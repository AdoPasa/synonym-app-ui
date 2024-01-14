import { Injectable, Optional, SkipSelf } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationServiceConfig } from './localization-config.service';
import { Observable } from 'rxjs';

@Injectable()
export class LocalizationService {
  public readonly defaultLanguage = 'en_GB';
  private _localeId: string = this.defaultLanguage;

  constructor(
    @Optional() @SkipSelf() private singleton: LocalizationService,
    private config: LocalizationServiceConfig,
    private translateService: TranslateService
  ) {
    if (this.singleton) {
      throw new Error(
        'LocalizationService is already provided by the root module'
      );
    }
    this._localeId = this.config.locale_id;
  }

  public initService(): Observable<any> {
    this._localeId = localStorage.getItem('language') || this.defaultLanguage;
    return this.useLanguage(this._localeId, false);
  }

  public useLanguage(lang: string, saveToLocalStorage = true): Observable<any> {
    if(saveToLocalStorage) {
      localStorage.setItem('language', lang);
    }

    this.translateService.setDefaultLang(lang);
    return this.translateService.use(lang);
  }

  public getUserLanguage(): string {
    return this._localeId;
  }

  public translate(key: string | string[], interpolateParams?: object): string {
    return this.translateService.instant(key, interpolateParams) as string;
  }
}