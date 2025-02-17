# USW Musicals Booking System

## System Architecture

The USW Musicals Booking System is implemented as a microservices architecture with the following components:

### Show Service
- Manages musical shows and their schedules
- Handles show time availability
- Provides API endpoints for querying available shows and seats

### Booking Service
- Manages student bookings
- Handles seat allocation
- Maintains booking status and history

### Client Application
- Console-based user interface
- Interacts with both services through REST APIs
- Provides booking and viewing functionality

## Docker Containerization

The system is containerized using Docker with the following configuration:

1. Each service runs in its own container
2. Services communicate over a Docker network
3. Ports exposed:
   - Show Service: 5001
   - Booking Service: 5002

### Docker Commands

```bash
# Build and run all services
docker-compose up --build

# Stop all services
docker-compose down
```

## Future Enhancements

1. Add authentication and authorization
2. Implement real-time seat availability updates
3. Add email notifications for booking confirmations
4. Implement a web-based user interface
