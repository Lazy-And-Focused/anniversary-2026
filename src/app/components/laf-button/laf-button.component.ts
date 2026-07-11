import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'laf-button',
  imports: [],
  templateUrl: './laf-button.html',
})
export class LafButton {
  @Input()
  public mini?: boolean;

  @Output()
  public clicked = new EventEmitter<MouseEvent>();

  public constructor() {}

  public onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
