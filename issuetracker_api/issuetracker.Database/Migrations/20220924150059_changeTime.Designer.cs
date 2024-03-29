﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using issuetracker.Database;

#nullable disable

namespace issuetracker.Database.Migrations
{
    [DbContext(typeof(PostgresContext))]
    [Migration("20220924150059_changeTime")]
    partial class changeTime
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "uuid-ossp");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("IssueTag", b =>
                {
                    b.Property<Guid>("IssuesId")
                        .HasColumnType("uuid")
                        .HasColumnName("issues_id");

                    b.Property<Guid>("TagsId")
                        .HasColumnType("uuid")
                        .HasColumnName("tags_id");

                    b.HasKey("IssuesId", "TagsId")
                        .HasName("pk_issue_tag");

                    b.HasIndex("TagsId")
                        .HasDatabaseName("ix_issue_tag_tags_id");

                    b.ToTable("issue_tag", (string)null);
                });

            modelBuilder.Entity("issuetracker.Entities.Issue", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<DateTime>("ActualResolutionDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("actual_resolution_date");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_on");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<Guid?>("PriorityId")
                        .HasColumnType("uuid")
                        .HasColumnName("priority_id");

                    b.Property<Guid>("ProjectId")
                        .HasColumnType("uuid")
                        .HasColumnName("project_id");

                    b.Property<string>("ResoliotionSummary")
                        .HasColumnType("text")
                        .HasColumnName("resoliotion_summary");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("slug");

                    b.Property<int>("Status")
                        .HasColumnType("integer")
                        .HasColumnName("status");

                    b.Property<DateTime>("TargetResolutionDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("target_resolution_date");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("Id")
                        .HasName("pk_issues");

                    b.HasIndex("PriorityId")
                        .HasDatabaseName("ix_issues_priority_id");

                    b.HasIndex("ProjectId")
                        .HasDatabaseName("ix_issues_project_id");

                    b.ToTable("issues", (string)null);
                });

            modelBuilder.Entity("issuetracker.Entities.Priority", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("color");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_priority");

                    b.ToTable("priority", (string)null);
                });

            modelBuilder.Entity("issuetracker.Entities.Project", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<DateTime>("ActualEndDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("actual_end_date");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_on");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("slug");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("start_date");

                    b.Property<DateTime>("TargetEndDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("target_end_date");

                    b.HasKey("Id")
                        .HasName("pk_projects");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasDatabaseName("ix_projects_name");

                    b.ToTable("projects", (string)null);
                });

            modelBuilder.Entity("issuetracker.Entities.Tag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("color");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_tags");

                    b.ToTable("tags", (string)null);
                });

            modelBuilder.Entity("IssueTag", b =>
                {
                    b.HasOne("issuetracker.Entities.Issue", null)
                        .WithMany()
                        .HasForeignKey("IssuesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_issue_tag_issues_issues_id");

                    b.HasOne("issuetracker.Entities.Tag", null)
                        .WithMany()
                        .HasForeignKey("TagsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_issue_tag_tags_tags_id");
                });

            modelBuilder.Entity("issuetracker.Entities.Issue", b =>
                {
                    b.HasOne("issuetracker.Entities.Priority", "Priority")
                        .WithMany("Issues")
                        .HasForeignKey("PriorityId")
                        .HasConstraintName("fk_issues_priority_priority_id");

                    b.HasOne("issuetracker.Entities.Project", "Project")
                        .WithMany("Issues")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_issues_projects_project_id");

                    b.Navigation("Priority");

                    b.Navigation("Project");
                });

            modelBuilder.Entity("issuetracker.Entities.Priority", b =>
                {
                    b.Navigation("Issues");
                });

            modelBuilder.Entity("issuetracker.Entities.Project", b =>
                {
                    b.Navigation("Issues");
                });
#pragma warning restore 612, 618
        }
    }
}
