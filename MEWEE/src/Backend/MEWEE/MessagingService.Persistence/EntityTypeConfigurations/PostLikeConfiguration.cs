using MessagingService.Domain.Entities.Likes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MessagingService.Persistence.EntityTypeConfigurations;

public class PostLikeConfiguration : IEntityTypeConfiguration<PostLike>
{
    public void Configure(EntityTypeBuilder<PostLike> builder)
    {
        builder.HasOne(x => x.Post)
            .WithMany(p => p.Likes)
            .HasForeignKey(x => x.PostId);
    }
}