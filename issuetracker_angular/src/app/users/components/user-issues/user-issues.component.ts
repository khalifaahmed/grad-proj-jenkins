import { Component, Input } from '@angular/core';
import { IssueDto } from 'src/app/issues/Dtos/IssueDto';

@Component({
  selector: 'app-user-issues',
  templateUrl: './user-issues.component.html',
  styleUrls: ['./user-issues.component.css'],
})
export class UserIssuesComponent {
  @Input() userIssues!: IssueDto[];
}
