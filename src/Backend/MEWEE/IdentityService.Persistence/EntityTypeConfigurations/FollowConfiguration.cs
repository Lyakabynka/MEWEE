using IdentityService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IdentityService.Persistence.EntityTypeConfigurations;

public class FollowConfiguration : IEntityTypeConfiguration<Follower>
{
    public void Configure(EntityTypeBuilder<Follower> builder)
    {
        builder
            .HasKey(f => new { f.Id, f.UserId });

        builder
            .HasOne(f => f.User)
            .WithMany(u => u.Followers)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Restrict); // Optional: define delete behavior

        builder
            .HasOne(f => f.FollowingUser)
            .WithMany(u => u.Followings)
            .HasForeignKey(f => f.FollowingUserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}