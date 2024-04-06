using IdentityService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Features.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; set; }

    DbSet<RefreshSession> RefreshSessions { get; set; }

    DbSet<ConfirmationCode> ConfirmationCodes { get; set; }
    
    DbSet<ForgotPasswordCode> ForgotPasswordCodes { get; set; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
