using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace issuetracker.Database.Migrations
{
    public partial class addNotifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "notifications",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    text = table.Column<string>(type: "text", nullable: false),
                    created_in = table.Column<int>(type: "integer", nullable: false),
                    created_in_id = table.Column<Guid>(type: "uuid", nullable: false),
                    to_user_id = table.Column<string>(type: "text", nullable: false),
                    seen = table.Column<bool>(type: "boolean", nullable: false),
                    created_on = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_notifications", x => x.id);
                    table.ForeignKey(
                        name: "fk_notifications_users_to_user_id",
                        column: x => x.to_user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_notifications_to_user_id",
                table: "notifications",
                column: "to_user_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "notifications");
        }
    }
}
