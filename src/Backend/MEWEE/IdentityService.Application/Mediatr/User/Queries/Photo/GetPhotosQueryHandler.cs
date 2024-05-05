using IdentityService.Application.Features.Interfaces;
using IdentityService.Application.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Application.Mediatr.User.Queries.Photo;

public class GetPhotosQueryHandler : IRequestHandler<GetPhotosQuery, Result>
{
    private readonly IApplicationDbContext _dbContext;
    
    public GetPhotosQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<Result> Handle(GetPhotosQuery request, CancellationToken cancellationToken)
    {
        //var pageSize = request.Pagination.PageSize;
        //var page = request.Pagination.Page;

        var photos = await _dbContext.Photos
            .Where(p => p.UserId == request.UserId)
            //.Skip(page * pageSize)
            //.Take(pageSize)
            .ToListAsync(cancellationToken);
        
        return Result.Create(photos);
    }
}