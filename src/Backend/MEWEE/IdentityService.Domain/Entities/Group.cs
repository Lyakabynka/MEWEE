﻿namespace IdentityService.Domain.Entities;

public class Group : BaseEntity
{
    public string Title { get; set; }
    public string Avatar { get; set; }
    
    
    public List<GroupUser> Users { get; set; }
}