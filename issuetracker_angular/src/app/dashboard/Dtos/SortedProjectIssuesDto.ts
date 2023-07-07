import { IssueDto } from 'src/app/issues/Dtos/IssueDto';

export interface SortedProjectIssuesDto {
  projectName: string;
  openIssues: IssueDto[];
  closedIssue: IssueDto[];
  unAssignedIssues: IssueDto[];
  overdueIssues: IssueDto[];
}
