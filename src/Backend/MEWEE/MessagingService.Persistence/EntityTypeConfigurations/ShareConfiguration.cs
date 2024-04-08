using MessagingService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MessagingService.Persistence.EntityTypeConfigurations;

public class ShareConfiguration : IEntityTypeConfiguration<Share>
{
    public void Configure(EntityTypeBuilder<Share> builder)
    {
        builder.HasOne(x => x.Post)
            .WithMany(p => p.Shares)
            .HasForeignKey(x => x.PostId);
    }
}