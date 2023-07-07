import { IssueDto } from 'src/app/issues/Dtos/IssueDto';

export interface ProjectDto {
  id: string;
  name: string;
  startDate: Date;
  targetEndDate: Date;
  actualEndDate: Date;
  createdOn: Date;
  createdBy: Date;
  issues: IssueDto[];
}
