namespace USWMusicals.BookingService.Models;

public class Booking
{
    public Guid Id { get; set; }
    public Guid ShowTimeId { get; set; }
    public string StudentId { get; set; } = string.Empty;
    public DateTime BookingTime { get; set; }
    public int NumberOfSeats { get; set; }
    public BookingStatus Status { get; set; }
}

public enum BookingStatus
{
    Pending,
    Confirmed,
    Cancelled
}
