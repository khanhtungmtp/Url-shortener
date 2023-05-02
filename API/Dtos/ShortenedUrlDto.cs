namespace API.Dtos
{
    public class ShortenedUrlDto
    {
        public Guid Id { get; set; }
        public string OriginalUrl { get; set; } = default!;
        public string ShortCode { get; set; } = default!;
        public string ShortUrl { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
    }

    public class AllShortenedUrlDto
    {
        public int? Count { get; set; }
        public int CountToday { get; set; }
        public List<ShortenedUrlDto>? ListShortenedUrl { get; set; } = default!;
    }
}