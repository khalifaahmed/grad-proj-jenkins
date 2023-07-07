using AutoMapper;
using issuetracker.Aws;
using issuetracker.Dtos;
using issuetracker.Entities;
using issuetracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace issuetracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "manager")]
public class UsersController : ControllerBase
{
	private readonly UserManager<AppUser> userManager;
	private readonly RoleManager<IdentityRole> roleManager;
	private readonly IProjectsService projectsService;
	private readonly IIssuesService issuesService;
	private readonly IMapper mapper;
	private readonly IS3Client s3Client;
	public UsersController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IMapper mapper, IProjectsService projectsService, IIssuesService issuesService, IS3Client s3Client)
	{
		this.userManager = userManager;
		this.roleManager = roleManager;
		this.mapper = mapper;
		this.projectsService = projectsService;
		this.issuesService = issuesService;
		this.s3Client = s3Client;
	}


	// 1) get all users
	[HttpGet]
	public async Task<IEnumerable<UserDto>> GetAllUsers()
	{
		IEnumerable<AppUser> users = await userManager.Users.ToListAsync();

		IEnumerable<UserDto> usersDto = mapper.Map<IEnumerable<UserDto>>(users);

		foreach (var user in usersDto)
		{
			user.Roles = (await userManager.GetRolesAsync(mapper.Map<AppUser>(user))).ToList();
		}

		return usersDto;
	}


	// 2) get user by Id
	[HttpGet("{id}")]
	public async Task<ActionResult<UserDto>> GetUserById(string id)
	{
		AppUser user = await userManager.FindByIdAsync(id);

		if (user is null)
		{
			return Problem(
				detail: $"No user found with this Id '{id}'.",
				statusCode: StatusCodes.Status404NotFound);
		}

		UserDto userDto = mapper.Map<UserDto>(user);
		userDto.Roles = (await userManager.GetRolesAsync(user)).ToList();

		return userDto;
	}


	// 3) get issues assigned to user
	[HttpGet("{userId}/issues")]
	[AllowAnonymous]
	public async Task<ActionResult<List<IssueDto>>> GetIssuesAssignedToUser(string userId)
	{
		AppUser appUser = await userManager.Users
		.Include(user => user.AssignedIssues)
		.ThenInclude(issue => issue.Priority)
		.Include(user => user.AssignedIssues)
		.ThenInclude(issue => issue.Project)
		.SingleOrDefaultAsync(user => user.Id == userId);

		if (appUser is null)
		{
			return Problem(
				detail: $"No user found with this Id '{userId}'.",
				statusCode: StatusCodes.Status404NotFound);
		}



		List<IssueDto> issueDtos = mapper.Map<List<IssueDto>>(appUser.AssignedIssues);

		return issueDtos;

	}


	[HttpGet("{userId}/issuesReportedByUser")]
	[AllowAnonymous]
	public async Task<ActionResult<List<IssueDto>>> GetIssuesReportedByUser(Guid userId)
	{
		AppUser appUser = await userManager.FindByIdAsync(userId.ToString());

		if (appUser is null)
		{
			return Problem(
				detail: $"No user found with this Id {userId}",
				statusCode: StatusCodes.Status404NotFound);
		}

		IEnumerable<Issue> issues = await issuesService.GetIssuesReportedByUser(appUser.Email);

		List<IssueDto> issueDtos = mapper.Map<List<IssueDto>>(issues);

		return issueDtos;
	}

	// 4) get projects assigned to user
	[HttpGet("{id}/projects")]
	public async Task<ActionResult<List<ProjectDto>>> GetProjectAssignedToUser(string id)
	{
		AppUser appUser = await userManager.Users.Include(user => user.AssignedProjects)
																					 .SingleOrDefaultAsync(user => user.Id == id);

		if (appUser is null)
		{
			return Problem(
			detail: $"No user found with this Id '{id}'.",
			statusCode: StatusCodes.Status404NotFound);
		}

		List<ProjectDto> projectDtos = mapper.Map<List<ProjectDto>>(appUser.AssignedProjects);

		return projectDtos;
	}


	// 5) delete user by id
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteUserById(string id)
	{
		AppUser appUser = await userManager.FindByIdAsync(id);

		if (appUser is null)
		{
			return Problem(
				detail: $"No user found with this Id '{id}'.",
				statusCode: StatusCodes.Status404NotFound);
		}

		var result = await userManager.DeleteAsync(appUser);

		if (!result.Succeeded)
		{
			return Problem();
		}
		await s3Client.DeleteImage(appUser.Image);
		return NoContent();
	}



	// 6) update user by id



	// 7) Edit Roles for users
	[HttpPost("{userId}/editroles")]
	public async Task<ActionResult<List<string>>> EditRolesInUser(List<AssignRoleDto> assignRoleDtos, string userId)
	{
		AppUser appUser = await userManager.FindByIdAsync(userId);

		if (appUser is null)
		{
			return Problem(
				detail: $"No user found with this Id '{userId}'.",
				statusCode: StatusCodes.Status404NotFound);
		}

		List<string> userRoles = (await userManager.GetRolesAsync(appUser)).ToList();

		foreach (AssignRoleDto assignRoleDto in assignRoleDtos)
		{
			IdentityRole identityRole = await roleManager.FindByIdAsync(assignRoleDto.RoleId);

			if (identityRole is null)
			{
				return Problem(
					detail: $"No Role found with this Id '{assignRoleDto.RoleId}'.",
					statusCode: StatusCodes.Status404NotFound);
			}

			if (assignRoleDto.IsSelected && !userRoles.Contains(assignRoleDto.Name))
			{
				await userManager.AddToRoleAsync(appUser, assignRoleDto.Name);
			}
			else if (!assignRoleDto.IsSelected && userRoles.Contains(assignRoleDto.Name))
			{
				await userManager.RemoveFromRoleAsync(appUser, assignRoleDto.Name);
			}
		}

		userRoles = (await userManager.GetRolesAsync(appUser)).ToList();

		return userRoles;
	}

	// 8) Get Roles In User
	[HttpGet("{userId}/roles")]
	public async Task<IActionResult> GetUserRoles(string userId)
	{
		AppUser appUser = await userManager.FindByIdAsync(userId);

		if (appUser is null)
		{
			return Problem(
				detail: $"No user found with this Id '{userId}'.",
				statusCode: StatusCodes.Status404NotFound);
		}

		List<string> userRoles = (await userManager.GetRolesAsync(appUser)).ToList();

		return Ok(userRoles);

	}




	// 9) edit projects
	[HttpPost("{userId}/editprojects")]
	public async Task<ActionResult<List<ProjectDto>>> EditProjectsForUser(List<AssignProjectDto> assignProjectDtos, string userId)
	{
		AppUser appUser = await userManager.Users.Include(user => user.AssignedProjects)
			.SingleOrDefaultAsync(user => user.Id == userId);

		if (appUser is null)
		{
			return Problem(
			detail: $"No user found with this Id '{userId}'.",
			statusCode: StatusCodes.Status404NotFound);
		}




		foreach (AssignProjectDto assignProjectDto in assignProjectDtos)
		{
			Project project = await projectsService.GetProjectByIdAsync(Guid.Parse(assignProjectDto.ProjectId));

			if (project is null)
			{
				return Problem(detail: $"No project found with this Id '{assignProjectDto.ProjectId}'", statusCode
				: StatusCodes.Status404NotFound);
			}


			if (assignProjectDto.IsSelected && !appUser.AssignedProjects.Contains(project))
			{
				await projectsService.AssignUser(appUser, project.Id);
			}
			else if (!assignProjectDto.IsSelected && appUser.AssignedProjects.Contains(project))
			{
				await projectsService.UnAssignUser(appUser, project.Id);
			}

		}

		appUser = await userManager.Users.Include(user => user.AssignedProjects)
			.SingleOrDefaultAsync(user => user.Id == userId);

		List<ProjectDto> projectDtos = mapper.Map<List<ProjectDto>>(appUser.AssignedProjects);

		return projectDtos;


	}
}