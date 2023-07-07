using System.ComponentModel.DataAnnotations;

public class CloseIssueDto
{
	[Required]
	public string IssueId { get; set; }
	[Required]
	public string ResolutionSummary { get; set; }
}