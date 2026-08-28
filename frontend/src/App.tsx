import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthCallback } from './pages/AuthCallback';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { CustomerServices } from './pages/customer/CustomerServices';
import { CustomerWorkers } from './pages/customer/CustomerWorkers';
import { WorkerProfile } from './pages/customer/WorkerProfile';
import { CustomerBooking } from './pages/customer/CustomerBooking';
import { BookingConfirmation } from './pages/customer/BookingConfirmation';
import { CustomerBookings } from './pages/customer/CustomerBookings';
import { CustomerProfile } from './pages/customer/CustomerProfile';
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { WorkerJobs } from './pages/worker/WorkerJobs';
import { WorkerJobDetails } from './pages/worker/WorkerJobDetails';
import { WorkerEarnings } from './pages/worker/WorkerEarnings';
import { WorkerProfile as WorkerProfilePage } from './pages/worker/WorkerProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/customer/services" element={<CustomerServices />} />
        <Route path="/customer/workers" element={<CustomerWorkers />} />
        <Route path="/customer/workers/:id" element={<WorkerProfile />} />
        <Route path="/customer/booking" element={<CustomerBooking />} />
        <Route path="/customer/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/customer/bookings" element={<CustomerBookings />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        
        {/* Worker Routes */}
        <Route path="/worker" element={<WorkerDashboard />} />
        <Route path="/worker/jobs" element={<WorkerJobs />} />
        <Route path="/worker/jobs/:id" element={<WorkerJobDetails />} />
        <Route path="/worker/earnings" element={<WorkerEarnings />} />
        <Route path="/worker/profile" element={<WorkerProfilePage />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
