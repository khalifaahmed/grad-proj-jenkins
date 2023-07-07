using issuetracker.Database;
using issuetracker.Entities;
using Microsoft.EntityFrameworkCore;

namespace issuetracker.Services;

public class NotificationService : INotificationService
{

	private readonly PostgresContext context;

	public NotificationService(PostgresContext context)
	{
		this.context = context;
	}

	public async Task CreateNotification(Notification notification)
	{
		await context.Notifications.AddAsync(notification);
		await context.SaveChangesAsync();
	}

	public async Task DeleteNotificationById(Guid id)
	{
		Notification notification = await context.Notifications.FindAsync(id);
		context.Notifications.Remove(notification);
		await context.SaveChangesAsync();
	}

	public async Task<IEnumerable<Notification>> GetAllNotifications()
	{
		return await context.Notifications
				.Include(notification => notification.ToUser)
				.ToListAsync();
	}

	public async Task<Notification> GetNotificationById(Guid id)
	{
		return await context.Notifications
			.Include(notification => notification.ToUser)
			.SingleOrDefaultAsync(notification => notification.Id == id);


	}

	public async Task<IEnumerable<Notification>> GetNotificationsForUser(string userId)
	{
		return await context.Notifications
		.Include(notification => notification.ToUser)
		.Where(notification => notification.ToUser.Id == userId)
		.ToListAsync();
	}

	public async Task<IEnumerable<Notification>> GetSeenNotifications()
	{
		return await context.Notifications
		.Include(notification => notification.ToUser)
		.Where(notification => notification.Seen == true)
		.ToListAsync();
	}

	public async Task<IEnumerable<Notification>> GetSeenNotificationsForUser(string userId)
	{
		return await context.Notifications
		.Include(notification => notification.ToUser)
		.Where(notification => notification.ToUser.Id == userId && notification.Seen == true)
		.ToListAsync();
	}

	public async Task<IEnumerable<Notification>> GetUnSeenNotifications()
	{
		return await context.Notifications
		.Include(notification => notification.ToUser)
		.Where(notification => notification.Seen == false)
		.ToListAsync();
	}

	public async Task<IEnumerable<Notification>> GetUnSeenNotificationsForUser(string userId)
	{
		return await context.Notifications
		.Include(notification => notification.ToUser)
		.Where(notification => notification.ToUser.Id == userId && notification.Seen == false)
		.ToListAsync();
	}

	public async Task UpdateNotificationSeen(Notification notification)
	{
		notification.Seen = true;
		await context.SaveChangesAsync();
	}
}