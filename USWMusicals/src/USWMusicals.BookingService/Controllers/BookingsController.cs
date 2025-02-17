using Microsoft.AspNetCore.Mvc;
using USWMusicals.BookingService.Models;

namespace USWMusicals.BookingService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private static readonly List<Booking> _bookings = new();

    [HttpPost]
    public async Task<ActionResult<Booking>> Create(Booking booking)
    {
        booking.Id = Guid.NewGuid();
        booking.BookingTime = DateTime.UtcNow;
        booking.Status = BookingStatus.Confirmed;
        
        _bookings.Add(booking);
        return CreatedAtAction(nameof(GetById), new { id = booking.Id }, booking);
    }

    [HttpGet("{id}")]
    public ActionResult<Booking> GetById(Guid id)
    {
        var booking = _bookings.FirstOrDefault(b => b.Id == id);
        if (booking == null)
            return NotFound();
        return Ok(booking);
    }

    [HttpGet("student/{studentId}")]
    public ActionResult<IEnumerable<Booking>> GetByStudentId(string studentId)
    {
        var bookings = _bookings.Where(b => b.StudentId == studentId);
        return Ok(bookings);
    }
}
