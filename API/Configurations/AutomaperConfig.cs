using API.Dtos;
using API.Models;
using AutoMapper;

namespace API.Configurations
{
    public class AutomaperConfig : Profile
    {
        public AutomaperConfig()
        {
            CreateMap<ShortenedUrlDto, ShortenedUrl>().ReverseMap();
        }
    }
}