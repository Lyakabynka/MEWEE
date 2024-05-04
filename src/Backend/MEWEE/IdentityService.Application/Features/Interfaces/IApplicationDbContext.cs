using IdentityService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace IdentityService.Application.Features.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; set; }

    DbSet<RefreshSession> RefreshSessions { get; set; }

    DbSet<ConfirmationCode> ConfirmationCodes { get; set; }

    DbSet<ForgotPasswordCode> ForgotPasswordCodes { get; set; }

    DbSet<Follower> Followers { get; set; }

    DbSet<Photo> Photos { get; set; }

    DbSet<Group> Groups { get; set; }

    DbSet<GroupUser> GroupUsers { get; set; }

    DatabaseFacade Database { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}