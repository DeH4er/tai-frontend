import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {

  @Input() page = 1;
  @Input() per_page = 5;
  @Input() total: number;

  @Output() onChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  canPrev() {
    return this.page > 1;
  }

  canNext() {
    return this.page < (this.total / this.per_page);
  }

  prev() {
    if (this.canPrev) {
      this.page--;
      this.emit();
    }
  }

  next() {
    if (this.canNext()) {
      this.page++;
      this.emit();
    }
  }

  emit() {
    this.onChange.emit({page: this.page, per_page: this.per_page});
  }

}
