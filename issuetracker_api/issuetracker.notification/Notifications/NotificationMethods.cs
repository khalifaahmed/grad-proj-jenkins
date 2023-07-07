using issuetracker.Entities;
using issuetracker.Hubs;
using issuetracker.Services;
using Microsoft.AspNetCore.SignalR;

namespace issuetracker.notification;
public class NotificationMethods : INotificationMethods
{
	private readonly INotificationService notificationService;

	private readonly IHubContext<NotificationHub> hubContext;

	public NotificationMethods(INotificationService notificationService, IHubContext<NotificationHub> hubContext)
	{
		this.notificationService = notificationService;
		this.hubContext = hubContext;
	}


	// method to create notification in db
	public async Task CreateNotification(string text, CreatedInType createdInType, Guid createdInId, AppUser toUser)
	{
		Notification notification = new()
		{
			Text = text,
			CreatedIn = createdInType,
			CreatedInId = createdInId,
			ToUser = toUser
		};

		await notificationService.CreateNotification(notification);

		await hubContext.Clients.Group(toUser.Id).SendAsync(
			"RecieveNotification",
			new
			{
				Id = notification.Id,
				Text = notification.Text,
				CreatedInType = Enum.GetName(typeof(CreatedInType), notification.CreatedIn),
				CreatedInId = notification.CreatedInId,
				Seen = notification.Seen,
				CreatedOn = notification.CreatedOn
			});
	}
}
