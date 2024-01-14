import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SynonymResponse } from '../../../../api/models/synonym-response';
import { Subject } from 'rxjs';
import { SynonymService } from '../../../../api/services/synonym.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ApiResponse } from '../../../../api/models/api-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-synonym-dialog',
  templateUrl: './add-synonym-dialog.component.html',
  styleUrls: ['./add-synonym-dialog.component.scss']
})
export class AddSynonymDialogComponent {
  searchKeyword = '';
  foundItems: Subject<SynonymResponse[]> = new Subject();
  debounceTimeout: any;
  parentIdPreloaded = false;
  
  componentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(90)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    parentId: new FormControl(''),
  });

  constructor(
    private dialogRef: MatDialogRef<AddSynonymDialogComponent>,
    private synonymService: SynonymService,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) { }

  displayFn(country: SynonymResponse): string {
    return country && country .name ? country.name : '';
  }

  submitSynonym() {
    if(this.componentForm.valid) {
    
      this.spinnerService.show();
      this.synonymService.add(this.componentForm.value.name!, this.componentForm.value.description!, this.componentForm.value.parentId!).subscribe({
        next: (response) => {
          this.dialogRef.close(response.data);
          this.spinnerService.hide();
        },
        error: (err: HttpErrorResponse) => {
          let errorModel = err.error as  ApiResponse<string>
          let translatedErrors = errorModel.errors.map(e => this.translate.instant(e)).join('\n');
          this.toastr.error(translatedErrors);
          this.spinnerService.hide();
        },
      });
    }
    else {
      this.componentForm.markAllAsTouched();
    }
  }

  onKeywordChange() {
    this.clearDebounce();

    if(this.patchParent()) {
      return;
    }

    if(!this.searchKeyword.trim()) {
      this.clearAutoComplete();
      return;
    }

    this.debounceTimeout = setTimeout(() => {
      this.searchItems();
    }, 200);
  }

  onParentSelected() {
    this.patchParent();
  }

  onInputChanged() {
    if(typeof this.searchKeyword != 'object' && this.searchKeyword) {
      this.searchKeyword = '';
      this.componentForm.patchValue({parentId: ''});
    }
  }

  searchItems() {
    this.synonymService
      .search(this.searchKeyword)
      .subscribe((result) => {
        this.foundItems.next(result.data);
      });
  }

  // Helper functions
  clearDebounce() {
    if(this.debounceTimeout != null) {
      clearTimeout(this.debounceTimeout);
    }
  }

  clearAutoComplete() {
    this.foundItems.next([]);
  }

  patchParent() {
    if(typeof this.searchKeyword == 'object') {
      let synonym = this.searchKeyword as SynonymResponse;
      this.componentForm.patchValue({parentId: synonym.id.toString()});
      this.clearAutoComplete();
      return true;
    }
    
    return false;
  }
}
