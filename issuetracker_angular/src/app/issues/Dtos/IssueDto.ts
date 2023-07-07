import { PriorityDto } from 'src/app/priority/Dto/PriorityDto';
import { UserDto } from 'src/app/users/Dtos/UserDto';

export interface IssueDto {
  id: string;
  title: string;
  description: string;
  createdOn: Date;
  createdBy: string;
  targetResolutionDate?: Date;
  actualResolutionDate?: Date;
  status: string;
  priority?: PriorityDto;
  projectName: string;
  resoliotionSummary?: string;
  assignedUsers: UserDto[];
}
