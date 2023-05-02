using System.Text.RegularExpressions;
using API.Data;
using API.Helpers;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlShortenerController : ControllerBase
    {
        private readonly DataContext _context;
        public UrlShortenerController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("GetUrlShortener")]
        public async Task<IActionResult> GetUrlShortener(string shortCode)
        {
            ShortenedUrl? shortenedUrl = await _context.ShortenedUrl.FirstOrDefaultAsync(x => x.ShortCode == shortCode);
            if (shortenedUrl == null)
                return BadRequest(new OperationResult { IsSuccess = false, Message = "Url not found" });
            return Ok(new { shortenedUrl.OriginalUrl });
        }
        [HttpGet("GetAllUrlShortener")]
        public async Task<IActionResult> GetAllUrlShortener()
        {
            List<ShortenedUrl>? listUrlShortener = await _context.ShortenedUrl.AsQueryable().OrderByDescending(x => x.CreatedAt).ToListAsync();
            int? count = listUrlShortener?.Count();
            // get all url today
            List<ShortenedUrl>? allshortenUrlToday = _context.ShortenedUrl
                .Where(s => EF.Functions.DateDiffDay(s.CreatedAt, DateTime.Today) == 0) // filter by the date component of the CreatedAt field
                .ToList();
            AllShortenedUrl listUrl = new AllShortenedUrl
            {
                Count = count,
                CountToday = allshortenUrlToday.Count(),
                ListShortenedUrl = listUrlShortener
            };
            return Ok(listUrl);
        }
        [HttpPost("CreateUrlShortener")]
        public async Task<IActionResult> CreateUrlShortener([FromForm] string longUrl)
        {
            bool result = false;
            if (!string.IsNullOrEmpty(longUrl))
                result = IsValidURL(longUrl);
            if (!result)
                return BadRequest(new OperationResult { IsSuccess = false, Message = "Unable to shorten that link. It is not a valid url." });
            // first check if we have the url stored
            ShortenedUrl? shortenedUrl = await _context.ShortenedUrl.FirstOrDefaultAsync(x => x.OriginalUrl == longUrl);
            // if the long url has not been shortened
            if (shortenedUrl == null)
            {
                const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                Random random = new Random();
                string randomString = new string(Enumerable.Repeat(chars, 8)
                                                        .Select(s => s[random.Next(s.Length)]).ToArray());
                string shortCode = randomString;
                shortenedUrl = new ShortenedUrl
                {
                    ShortCode = shortCode,
                    OriginalUrl = longUrl,
                    ShortUrl = shortCode,
                    CreatedAt = DateTime.Now
                };
                await _context.ShortenedUrl.AddAsync(shortenedUrl);
                await _context.SaveChangesAsync();
            }

            return Ok(shortenedUrl);
        }
        private bool IsValidURL(string URL)
        {
            string Pattern = @"^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$";
            Regex Rgx = new Regex(Pattern, RegexOptions.Compiled | RegexOptions.IgnoreCase);
            return Rgx.IsMatch(URL);
        }
    }
}