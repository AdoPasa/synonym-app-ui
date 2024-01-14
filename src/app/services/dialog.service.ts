import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { AddSynonymDialogComponent } from "../features/global/synonym/add-synonym-dialog/add-synonym-dialog.component";
import { SynonymResponse } from "../api/models/synonym-response";

@Injectable()
export class DialogService {
  constructor(
    public router: Router,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {
  }

  public addSynonym(name: string, parentId: number | null): Observable<SynonymResponse | null> {
    let dialogRef: MatDialogRef<AddSynonymDialogComponent>;
    dialogRef = this.dialog.open(AddSynonymDialogComponent, {
      width: '850px',
      height: 'auto',
    });

    if(parentId) {
      dialogRef.componentInstance.parentIdPreloaded = true;
      dialogRef.componentInstance.componentForm.patchValue({
        name: name,
        parentId: parentId.toString()
      });
    }
    else {
      dialogRef.componentInstance.componentForm.patchValue({
        name: name,
      });
    }

    return dialogRef.afterClosed();
  }
}
