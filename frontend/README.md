# Cooperative Gig Services Platform

A trusted marketplace connecting customers with cooperative workers for household and community services.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Axios (for future API integration)

## Features

### Customer Features
- Browse service categories (Electrician, Plumber, Carpenter, Cleaner, Painter, Mechanic)
- Search and filter verified workers
- View worker profiles with ratings and reviews
- Book services with preferred date/time
- Track booking status
- Manage profile

### Worker Features
- View available jobs
- Accept/reject job requests
- Track active jobs
- Manage availability
- View earnings
- Update profile

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
│   ├── customer/   # Customer-specific pages
│   └── worker/     # Worker-specific pages
├── data/           # Mock data layer
├── types/          # TypeScript type definitions
├── App.tsx         # Main app with routing
└── main.tsx        # Entry point
```

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Available Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page

### Customer Routes
- `/customer` - Customer dashboard
- `/customer/services` - Service selection
- `/customer/workers` - Worker listings
- `/customer/workers/:id` - Worker profile
- `/customer/booking` - Booking page
- `/customer/booking-confirmation` - Booking confirmation
- `/customer/bookings` - My bookings
- `/customer/profile` - Customer profile

### Worker Routes
- `/worker` - Worker dashboard
- `/worker/jobs` - Available jobs
- `/worker/jobs/:id` - Job details
- `/worker/earnings` - Earnings overview
- `/worker/profile` - Worker profile

## Mock Data

The application uses realistic mock data for:
- Workers (with Indian names, locations, skills)
- Services (7 household service categories)
- Bookings (various statuses)
- Reviews

The mock data is centralized in `src/data/mockData.ts` and can be easily replaced with API calls.

## Architecture Notes

- **Separation of Concerns**: UI components are separated from data access
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **API-Ready**: Structured to easily replace mock data with real API calls

## Future Enhancements

- Real authentication system
- Backend API integration
- Real-time notifications
- Payment processing
- Location-based services
- AI-powered service categorization
- Advanced filtering and search
