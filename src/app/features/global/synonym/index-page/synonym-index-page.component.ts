import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-synonym-index-page',
  templateUrl: './synonym-index-page.component.html',
  styleUrls: ['./synonym-index-page.component.scss']
})
export class SynonymIndexPageComponent {
  constructor(
    private dialogService: DialogService,
    private router: Router
  ) { }

  addSynonym(parentId: number | null = null) {
    this.dialogService
      .addSynonym('', parentId)
      .subscribe((synonymAdded) => {
        if(synonymAdded) {
          this.router.navigate(['synonym', synonymAdded.name]);
        }
      });
  }
}
