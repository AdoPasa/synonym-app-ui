import { APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationService } from './localization.service';
import { LocalizationServiceConfig } from './localization-config.service';


@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, TranslateModule.forChild()],
  exports: [TranslateModule]
})
export class InternationalizationModule {
  public static forRoot(config: any): ModuleWithProviders<InternationalizationModule> {
    return {
      ngModule: InternationalizationModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initLocalizationService,
          deps: [LocalizationService],
          multi: true
        },
        LocalizationService,
        { provide: LOCALE_ID, useValue: config.locale_id },
        { provide: LocalizationServiceConfig, useValue: config }
      ]
    };
  }
}

export function initLocalizationService(service: LocalizationService) {
  return () => service.initService();
}