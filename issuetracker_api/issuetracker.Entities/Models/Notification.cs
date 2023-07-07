using System.ComponentModel.DataAnnotations;
namespace issuetracker.Entities;

public class Notification
{
	[Key]
	public Guid Id { get; set; }

	[Required]
	public string Text { get; set; }

	[Required]
	public CreatedInType CreatedIn { get; set; }

	[Required]
	public Guid CreatedInId { get; set; }

	[Required]
	public AppUser ToUser { get; set; }

	public Boolean Seen { get; set; } = false;

	public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
}


public enum CreatedInType
{
	Issue,
	Project,
	User
}