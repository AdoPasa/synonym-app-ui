import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SynonymService } from '../../../../api/services/synonym.service';
import { SynonymResponse } from '../../../../api/models/synonym-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-synonym-search',
  templateUrl: './synonym-search.component.html',
  styleUrls: ['./synonym-search.component.scss']
})
export class SynonymSearchComponent implements OnDestroy {
  searchKeyword = '';
  foundItems: Subject<SynonymResponse[]> = new Subject();
  debounceTimeout: any;
  
  constructor(
    private synonymService: SynonymService,
    private router: Router,
  ) { }
  
  ngOnDestroy(): void {
    this.clearDebounce();
    this.foundItems.complete();
  }

  onInputChange() {
    this.clearDebounce();

    if(!this.searchKeyword.trim()) {
      this.clearAutoComplete();
      return;
    }

    this.debounceTimeout = setTimeout(() => {
      this.searchItems();
    }, 200);
  }

  onInputKeyUp(event: KeyboardEvent) {
    if(event.key == 'Enter') {
      this.redirectToSynonym();
    }
  }

  searchItems() {
    this.synonymService
      .search(this.searchKeyword)
      .subscribe((result) => {
        this.foundItems.next(result.data);
      });
  }

  redirectToSynonym() {
    this.clearDebounce();
    this.clearAutoComplete();

    this.router.navigate(['synonym', this.searchKeyword]);
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
}