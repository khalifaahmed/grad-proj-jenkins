import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IssueDto } from '../../Dtos/IssueDto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CloseIssueDto } from '../../Dtos/CloseIssueDto';
import { IssuesService } from '../../services/issues.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';

@Component({
  selector: 'app-close-issue-modal',
  templateUrl: './close-issue-modal.component.html',
  styleUrls: ['./close-issue-modal.component.css'],
})
export class CloseIssueModalComponent implements OnInit {
  @Input() issue!: IssueDto;
  @Output() closedIssueSuccessfullyEvent = new EventEmitter<IssueDto>();
  @Output() closeModalEvent = new EventEmitter();

  hideModal() {
    this.closeModalEvent.emit();
  }

  btnValue: string = 'Close Issue';
  btnState: boolean = false;

  /**
   *
   */
  constructor(
    private issueService: IssuesService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.closeIssueForm = new FormGroup({
      IssueId: new FormControl(this.issue.id, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      ResolutionSummary: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  // form
  closeIssueForm = new FormGroup({
    IssueId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    ResolutionSummary: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit() {
    if (this.closeIssueForm.valid) {
      this.btnState = true;
      this.btnValue = 'Wait....';

      const closeIssueDto: CloseIssueDto = {
        issueId: this.closeIssueForm.controls.IssueId.value,
        resolutionSummary: this.closeIssueForm.controls.ResolutionSummary.value,
      };

      this.closeIssue(closeIssueDto);
    }
  }

  closeIssue(closeIssueDto: CloseIssueDto) {
    this.issueService.CloseIssue(this.issue!.id, closeIssueDto).subscribe({
      next: (v) => {
        this.closedIssueSuccessfullyEvent.emit(v);
      },
      error: (e) => {
        this.toast.show(
          e.error.detail || 'something went wrong💥 try again later',
          5,
          ToastType.Error
        );

        this.closeModalEvent.emit();
      },
    });
  }
}
