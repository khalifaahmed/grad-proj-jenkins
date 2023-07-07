export interface NotificationDto {
  id: string;
  text: string;
  createdInType: string;
  createdInId: string;
  seen: boolean;
  createdOn: Date;
}
