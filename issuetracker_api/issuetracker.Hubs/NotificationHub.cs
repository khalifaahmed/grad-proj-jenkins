using Microsoft.AspNetCore.SignalR;

namespace issuetracker.Hubs;

public class NotificationHub : Hub
{
	public async Task ConnectUser(string userId)
	{
		await Groups.AddToGroupAsync(Context.ConnectionId, userId);
	}

}