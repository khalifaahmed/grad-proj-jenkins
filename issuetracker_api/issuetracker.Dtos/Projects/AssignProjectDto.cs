using System.ComponentModel.DataAnnotations;

namespace issuetracker.Dtos;

public class AssignProjectDto
{

	[Required]
	public string ProjectId { get; set; }

	[Required]
	public string Name { get; set; }

	[Required]
	public Boolean IsSelected { get; set; }
}