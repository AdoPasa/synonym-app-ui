import { NgModule } from '@angular/core';
import { GlobalLayoutComponent } from './global-layout.component';
import { GlobalLayoutRoutingModule } from './global-layout.routing';
import { SharedModule } from '../../modules/shared.module';
import { SynonymIndexPageComponent } from '../../features/global/synonym/index-page/synonym-index-page.component';
import { SynonymSearchComponent } from '../../features/global/synonym/search/synonym-search.component';
import { SynonymResultPageComponent } from '../../features/global/synonym/result-page/synonym-result-page.component';

@NgModule({
  declarations: [
    GlobalLayoutComponent,
    SynonymIndexPageComponent,
    SynonymResultPageComponent,
    SynonymSearchComponent,
  ],
  imports: [
    SharedModule,
    GlobalLayoutRoutingModule,
  ],
})
export class GlobalLayoutModule { }
