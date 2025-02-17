namespace USWMusicals.ShowService.Models;

public class Musical
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<ShowTime> ShowTimes { get; set; } = new();
}

public class ShowTime
{
    public Guid Id { get; set; }
    public DateTime DateTime { get; set; }
    public int TotalSeats { get; set; }
    public int AvailableSeats { get; set; }
}
