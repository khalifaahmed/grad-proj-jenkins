using issuetracker.Entities;

namespace issuetracker.notification;

public interface INotificationMethods
{
	Task CreateNotification(string text, CreatedInType createdInType, Guid createdInId, AppUser toUser);
}