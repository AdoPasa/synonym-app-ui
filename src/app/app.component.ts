import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    public spinnerService: SpinnerService,
    private translate: TranslateService,
    private titleService: Title,
  ) {
    
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.translate.instant('page-title'));
  }
}
