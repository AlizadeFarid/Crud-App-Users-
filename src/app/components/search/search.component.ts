import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, AfterViewInit {

  constructor() { }
  filterText :string = '';
  @ViewChild('searchInput', {static:false}) searchInput : ElementRef
  @ViewChild('inputClear', {static:false}) inputClear : ElementRef;

  @Output() filterTextFromParent = new EventEmitter();
  @Output() isActiveFromParent = new EventEmitter();

  ngAfterViewInit(): void {
    const searchText = fromEvent(this.searchInput.nativeElement,'keyup')
    searchText.pipe().subscribe(()=>{
      if (this.searchInput.nativeElement.value.length>0) {
        this.inputClear.nativeElement.classList.add('active')
      }else{
        this.inputClear.nativeElement.classList.remove('active')
      }
      this.filterText = this.searchInput.nativeElement.value.toLocaleLowerCase()
      this.callParent()
    })
    const searchTextClear = fromEvent(this.inputClear.nativeElement,'click')
    searchTextClear.subscribe(()=>{
      this.searchInput.nativeElement.value = '';
      this.filterText = '';
      this.inputClear.nativeElement.classList.remove('active')  ;
      this.callParent();
    })
  }

  callParent(): void {
    this.filterTextFromParent.emit(this.filterText);
  }

  ngOnInit(): void {
  }
}
