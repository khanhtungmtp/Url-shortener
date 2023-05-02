namespace API.Models
{
    public class ShortenedUrl
    {
        public Guid Id { get; set; }
        public string OriginalUrl { get; set; } = default!;
        public string ShortCode { get; set; } = default!;
        public string ShortUrl { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
    }
    public class AllShortenedUrl
    {
        public int? Count { get; set; }
        public int CountToday { get; set; }
        public List<ShortenedUrl>? ListShortenedUrl { get; set; } = default!;
    }
}