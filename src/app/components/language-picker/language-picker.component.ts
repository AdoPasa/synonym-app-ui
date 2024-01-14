import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../internationalization/localization.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})

export class LanguagePickerComponent implements OnInit {
  selectedLanguage: string = '';
  languages = [
    'en_GB',
  ];

  constructor(
    private localizationService: LocalizationService, 
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    const languageFromStorage = localStorage.getItem('language');
    if (languageFromStorage) {
      this.selectedLanguage = languageFromStorage;
      this.localizationService.useLanguage(this.selectedLanguage);
    } else {
      const browserLang = this.translate.getBrowserLang();
      
      let detectedLanguage = undefined;
      
      if(browserLang) {
        detectedLanguage = this.languages.find(l => l.toLowerCase().includes(browserLang));
      }

      const languageToUse = detectedLanguage ?? this.localizationService.defaultLanguage;
      this.selectedLanguage = languageToUse;
      this.localizationService.useLanguage(languageToUse);

      localStorage.setItem('language', languageToUse);
    }
  }

  changeLanguage() {
    if(this.selectedLanguage=='en_GB') {
      this.toastr.error(this.translate.instant('error.only-english-exists'));
    }
  }
}
