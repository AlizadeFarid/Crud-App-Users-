import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements ControlValueAccessor {

  @Input() id: string;
  @Input() type: string = 'text';
  @Input() class: string = 'form-control';
  @Input() maxlength: number;
  @Input() minlength: number;
  @Input() min: number;
  @Input() max: number;
  @Input() placeholder: string;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
  }

}
