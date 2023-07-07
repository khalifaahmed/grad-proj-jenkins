import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  @Input() deletedElement!: string;
  @Input() deletedType!: string;

  @Output() closeModalEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  deleteBtnValue: string = 'Delete';
  deleteBtnState: boolean = false;

  hideModal() {
    this.closeModalEvent.emit();
  }

  confirmDelete() {
    this.deleteBtnValue = 'Wait....';
    this.deleteBtnState = true;

    this.deleteEvent.emit();
  }
}
