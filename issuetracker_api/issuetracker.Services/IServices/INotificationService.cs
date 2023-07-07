using issuetracker.Entities;

namespace issuetracker.Services;

public interface INotificationService
{
	// 1) get All notification in database
	Task<IEnumerable<Notification>> GetAllNotifications();

	// 2) get notification by id
	Task<Notification> GetNotificationById(Guid id);

	// 3) create new notification
	Task CreateNotification(Notification notification);

	// 4) delete notification by id
	Task DeleteNotificationById(Guid id);

	// 5) get notifications for specific user
	Task<IEnumerable<Notification>> GetNotificationsForUser(string userId);

	// 6) get seen notifications
	Task<IEnumerable<Notification>> GetSeenNotifications();

	// 7) get unseen notifications
	Task<IEnumerable<Notification>> GetUnSeenNotifications();

	// 8) get seen notification for user
	Task<IEnumerable<Notification>> GetSeenNotificationsForUser(string userId);

	// 9) get unseen notifications for user
	Task<IEnumerable<Notification>> GetUnSeenNotificationsForUser(string userId);

	// 10) update notification seen
	Task UpdateNotificationSeen(Notification notification);
}