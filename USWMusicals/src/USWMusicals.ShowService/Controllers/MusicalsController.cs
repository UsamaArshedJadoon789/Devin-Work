using Microsoft.AspNetCore.Mvc;
using USWMusicals.ShowService.Models;

namespace USWMusicals.ShowService.Controllers;

[ApiController]
[Route("api/musicals")]
[Produces("application/json")]
public class MusicalsController : ControllerBase
{
    private static readonly List<Musical> _musicals = new();

    public MusicalsController()
    {
        if (!_musicals.Any())
        {
            // Add sample data
            _musicals.Add(new Musical
            {
                Id = Guid.NewGuid(),
                Title = "The Lion King",
                Description = "Disney's award-winning musical",
                ShowTimes = new List<ShowTime>
                {
                    new() { 
                        Id = Guid.NewGuid(),
                        DateTime = DateTime.Now.AddDays(7),
                        TotalSeats = 100,
                        AvailableSeats = 100
                    },
                    new() {
                        Id = Guid.NewGuid(),
                        DateTime = DateTime.Now.AddDays(8),
                        TotalSeats = 100,
                        AvailableSeats = 100
                    }
                }
            });
            
            _musicals.Add(new Musical
            {
                Id = Guid.NewGuid(),
                Title = "Wicked",
                Description = "The untold story of the Witches of Oz",
                ShowTimes = new List<ShowTime>
                {
                    new() {
                        Id = Guid.NewGuid(),
                        DateTime = DateTime.Now.AddDays(14),
                        TotalSeats = 150,
                        AvailableSeats = 150
                    }
                }
            });
        }
    }

    [HttpGet]
    [Produces("application/json")]
    public ActionResult<IEnumerable<object>> GetAll()
    {
        Console.WriteLine($"GetAll called at {DateTime.UtcNow}");
        
        Response.Headers["Content-Type"] = "application/json; charset=utf-8";
        Response.Headers.Add("Access-Control-Allow-Origin", "*");
        Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        Response.Headers.Add("Access-Control-Allow-Headers", "*");
        
        var musicals = _musicals.Select(m => new
        {
            m.Id,
            m.Title,
            m.Description,
            ShowTimes = m.ShowTimes.Select(st => new
            {
                st.Id,
                st.DateTime,
                st.TotalSeats,
                st.AvailableSeats
            }).ToList()
        }).ToList();

        Console.WriteLine($"Returning {musicals.Count} musicals");
        return Ok(musicals);
    }

    [HttpGet("{id}")]
    public ActionResult<Musical> GetById(Guid id)
    {
        var musical = _musicals.FirstOrDefault(m => m.Id == id);
        if (musical == null)
            return NotFound();
        return Ok(musical);
    }

    [HttpGet("showtime/{showtimeId}")]
    public ActionResult<ShowTime> GetShowTime(Guid showtimeId)
    {
        var showTime = _musicals
            .SelectMany(m => m.ShowTimes)
            .FirstOrDefault(st => st.Id == showtimeId);
        
        if (showTime == null)
            return NotFound();
        return Ok(showTime);
    }
}
