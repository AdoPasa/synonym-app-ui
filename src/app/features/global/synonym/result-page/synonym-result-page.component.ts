import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SynonymService } from '../../../../api/services/synonym.service';
import { SynonymResponse } from '../../../../api/models/synonym-response';
import { SpinnerService } from '../../../../services/spinner.service';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-synonym-result-page',
  templateUrl: './synonym-result-page.component.html',
  styleUrls: ['./synonym-result-page.component.scss']
})
export class SynonymResultPageComponent implements OnInit {
  synonymResponse: SynonymResponse | null = null;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private synonymService: SynonymService,
    private spinnerService: SpinnerService,
    private dialogService: DialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.loadData(params['name']);
    });
  }

  loadData(name: string) {
    this.spinnerService.show();

    this.synonymService
        .getByName(name)
        .subscribe({ 
          next: (response) => {
            this.synonymResponse = response.data;
            this.spinnerService.hide();
          }, error: (error) => {
            this.synonymResponse = null;
            this.spinnerService.hide();
          }
        });
  }

  addSynonym(parentId: number | null = null) {
    const courrentSynonymName = this.activatedRoute.snapshot.params['name'];

    this.dialogService
      .addSynonym(parentId ? '' : courrentSynonymName, parentId)
      .subscribe((synonymAdded) => {
        if(synonymAdded) {
          if(synonymAdded.name == courrentSynonymName) {
            this.loadData(courrentSynonymName);
          }
          else {
            this.router.navigate(['synonym', synonymAdded.name]);
          }
        }
      });
  }
}
