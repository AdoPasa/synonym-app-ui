import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternationalizationModule } from './internationalization/internationalization.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { GlobalConfigService } from './services/global-config.service';
import { SharedModule } from './modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SpinnerService } from './services/spinner.service';
import { SynonymService } from './api/services/synonym.service';
import { DialogService } from './services/dialog.service';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      progressBar: true
    }),
    InternationalizationModule.forRoot({ locale_id: 'en_GB' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),    
    SharedModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configSvc: GlobalConfigService) => () => configSvc.loadConfig(),
      multi: true,
      deps: [GlobalConfigService],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DialogService,
    SynonymService,
    SpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
