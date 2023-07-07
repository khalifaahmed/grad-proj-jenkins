namespace issuetracker.Dtos;

public class NotificationDto
{
	public string Id { get; set; }
	public string Text { get; set; }
	public string CreatedInType { get; set; }
	public string CreatedInId { get; set; }
	public Boolean Seen { get; set; }
	public DateTime CreatedOn { get; set; }
}