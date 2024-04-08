using MessagingService.Domain.Entities.Likes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MessagingService.Persistence.EntityTypeConfigurations;

public class CommentLikeConfiguration : IEntityTypeConfiguration<CommentLike>
{
    public void Configure(EntityTypeBuilder<CommentLike> builder)
    {
        builder.HasOne(x => x.Comment)
            .WithMany(p => p.Likes)
            .HasForeignKey(x => x.CommentId);
    }
}