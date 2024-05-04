using IdentityService.Domain.Entities;
using IdentityService.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IdentityService.Persistence.EntityTypeConfigurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Role)
            .HasConversion(
                r => r.ToString(),
                r => Enum.Parse<UserRole>(r));
        
        builder.HasOne(u => u.ConfirmationCode)
            .WithOne(cc => cc.User)
            .HasForeignKey<ConfirmationCode>(cc => cc.UserId);
        
        builder.HasOne(u => u.ForgotPasswordCode)
            .WithOne(fc => fc.User)
            .HasForeignKey<ForgotPasswordCode>(fc => fc.UserId);

    }
}
