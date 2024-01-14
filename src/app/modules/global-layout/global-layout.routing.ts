import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { GlobalLayoutComponent } from './global-layout.component';
import { SynonymIndexPageComponent } from '../../features/global/synonym/index-page/synonym-index-page.component';
import { SynonymResultPageComponent } from '../../features/global/synonym/result-page/synonym-result-page.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SynonymIndexPageComponent,
      },
      {
        path: 'synonym/:name',
        pathMatch: 'full',
        component: SynonymResultPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalLayoutRoutingModule {}
