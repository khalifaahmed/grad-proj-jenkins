using AutoMapper;
using issuetracker.Dtos;
using issuetracker.Entities;
using issuetracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace issuetracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
	private readonly INotificationService notificationService;
	private readonly IMapper mapper;

	private readonly UserManager<AppUser> userManager;

	public NotificationsController(INotificationService notificationService, IMapper mapper, UserManager<AppUser> userManager)
	{
		this.notificationService = notificationService;
		this.mapper = mapper;
		this.userManager = userManager;
	}


	// 1) get all notifications
	[HttpGet]
	[Authorize(Roles = "manager")]
	public async Task<IEnumerable<NotificationDto>> GetAllNotifications()
	{
		IEnumerable<Notification> notifications = await notificationService.GetAllNotifications();

		IEnumerable<NotificationDto> notificationDtos = mapper.Map<IEnumerable<NotificationDto>>(notifications);

		return notificationDtos;
	}

	// 2) get notification by id
	// 3) create notification

	// 4) delete notification
	[HttpDelete("{id}")]
	[Authorize(Roles = "manager")]
	public async Task<IActionResult> DeleteNotification(Guid id)
	{
		Notification notification = await notificationService.GetNotificationById(id);

		if (notification is null)
		{
			return Problem(
				detail: $"No Notification found with this id {id}.",
				statusCode: StatusCodes.Status404NotFound);
		}

		await notificationService.DeleteNotificationById(id);

		return NoContent();
	}
	// 5) get unseen notifications
	// 6) get seen notifications

	// 7) get my notifications
	[HttpGet("my-notifications")]
	[Authorize]
	public async Task<ActionResult<List<NotificationDto>>> GetMyNotifications()
	{
		AppUser appUser = await userManager.FindByEmailAsync(User.Identity.Name);

		if (appUser is null)
		{
			return Problem(
				"You do not have an email.",
				statusCode: StatusCodes.Status404NotFound);
		}

		IEnumerable<Notification> notifications = await notificationService.GetNotificationsForUser(appUser.Id);

		List<NotificationDto> notificationDtos = mapper.Map<List<NotificationDto>>(notifications);

		return notificationDtos;
	}


	// 8) get my unseen notifications
	[HttpGet("my-notifications/unseen")]
	[Authorize]
	public async Task<ActionResult<List<NotificationDto>>> GetMyUnSeenNotifications()
	{
		AppUser appUser = await userManager.FindByEmailAsync(User.Identity.Name);

		if (appUser is null)
		{
			return Problem(
				"You do not have an email.",
				statusCode: StatusCodes.Status404NotFound);
		}

		IEnumerable<Notification> notifications = await notificationService.GetUnSeenNotificationsForUser(appUser.Id);

		List<NotificationDto> notificationDtos = mapper.Map<List<NotificationDto>>(notifications);

		return notificationDtos;
	}

	// 9) get my seen notifications
	[HttpGet("my-notifications/seen")]
	[Authorize]
	public async Task<ActionResult<List<NotificationDto>>> GetMySeenNotifications()
	{
		AppUser appUser = await userManager.FindByEmailAsync(User.Identity.Name);

		if (appUser is null)
		{
			return Problem(
				"You do not have an email.",
				statusCode: StatusCodes.Status404NotFound);
		}

		IEnumerable<Notification> notifications = await notificationService.GetSeenNotificationsForUser(appUser.Id);

		List<NotificationDto> notificationDtos = mapper.Map<List<NotificationDto>>(notifications);

		return notificationDtos;
	}

	// 10) see a notification
	[HttpPost("seen/{notificationId}")]
	[Authorize]
	public async Task<IActionResult> MakeNotificationSeen(Guid notificationId)
	{
		Notification notification = await notificationService.GetNotificationById(notificationId);

		if (notification is null)
		{
			return Problem(
				detail: $"No notification found with this id {notificationId}",
				statusCode: StatusCodes.Status404NotFound);
		}

		await notificationService.UpdateNotificationSeen(notification);

		return Ok();
	}
}