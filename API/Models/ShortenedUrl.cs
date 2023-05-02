namespace API.Models
{
    public class ShortenedUrl
    {
        public Guid Id { get; set; }
        public string OriginalUrl { get; set; } = default!;
        public string ShortCode { get; set; } = default!;
        public string ShortUrl { get; set; } = default!;
        public int Hits { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}