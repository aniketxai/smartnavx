# Smart Campus Resource Optimizer

A modern, responsive web application built with React for managing campus resources, booking rooms/labs, and navigating the campus.

## Features

- **Dashboard**: Central hub with quick access to all features
- **Book Resource**: Form to reserve rooms and labs with date and time selection
- **View Bookings**: Table view of all current and upcoming reservations
- **Campus Navigation**: Interactive route finder for campus locations

## Tech Stack

- React 18.3
- React Router DOM for navigation
- Axios for API calls
- Modern CSS with responsive design
- Vite for fast development and building

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Navigation bar component
│   └── Card.jsx          # Reusable card component
├── pages/
│   ├── Dashboard.jsx      # Home page with feature cards
│   ├── BookResource.jsx   # Resource booking form
│   ├── ViewBookings.jsx   # Bookings table view
│   └── CampusNavigation.jsx # Campus route finder
├── services/
│   └── api.js            # API service with axios
├── utils/                # Utility functions (if needed)
├── App.jsx               # Main app with routing
├── App.css               # Application styles
├── index.css             # Global styles
└── main.jsx              # Application entry point
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Backend API Requirements

The application expects a backend API running on `http://localhost:3000` with the following endpoints:

### POST /api/book
Book a resource (room/lab)

**Request Body:**
```json
{
  "room": "Lab A1",
  "date": "2024-03-15",
  "startTime": "09:00",
  "endTime": "11:00"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Resource booked successfully",
  "booking": { ... }
}
```

### GET /api/bookings
Get all bookings for the current user

**Response:**
```json
{
  "bookings": [
    {
      "id": "1",
      "room": "Lab A1",
      "date": "2024-03-15",
      "startTime": "09:00",
      "endTime": "11:00",
      "status": "Confirmed"
    }
  ]
}
```

## Features Breakdown

### 1. Dashboard
- Welcome message
- Three feature cards linking to main features
- Clean, modern UI with hover effects

### 2. Book Resource
- Room selection dropdown (8 rooms available)
- Date picker
- Start and end time selection
- Form validation
- Success/error message display
- Loading states

### 3. View Bookings
- Table displaying all bookings
- Columns: Room, Date, Start Time, End Time, Status
- Loading state while fetching data
- Empty state when no bookings exist
- Refresh button to reload data
- Error handling

### 4. Campus Navigation
- Dropdown selection for starting point
- Dropdown selection for destination
- 15 predefined campus locations
- Route generation with step-by-step directions
- Visual representation with markers and connecting lines
- Distance and duration estimates
- Reset functionality

## Design Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Modern UI**: Clean cards, smooth transitions, and hover effects
- **Professional Color Scheme**: Blue primary color with neutral grays
- **Accessibility**: Proper form labels, semantic HTML
- **Loading States**: Spinners and disabled buttons during async operations
- **Error Handling**: User-friendly error messages
- **Visual Feedback**: Success/error messages, hover states

## Notes

- No authentication required (user identity handled via RFID in backend)
- All API calls include proper error handling
- Mobile-responsive with breakpoints at 768px
- Built with modern React patterns (functional components, hooks)
- Clean component architecture for maintainability

## Available Rooms

1. Lab A1
2. Lab B2
3. Conference Room 1
4. Conference Room 2
5. Study Room 101
6. Study Room 102
7. Lecture Hall A
8. Lecture Hall B

## Campus Locations

- Main Entrance
- Library
- All Lab and Conference Rooms
- Cafeteria
- Student Center
- Admin Building
- Parking Lots A & B

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
