using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ActivitiesConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Categogry",
                table: "Activities");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Activities",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Activities");

            migrationBuilder.AddColumn<string>(
                name: "Categogry",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
