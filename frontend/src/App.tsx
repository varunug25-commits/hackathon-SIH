import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WorkerLogin } from './pages/WorkerLogin';
import { WorkerRegister } from './pages/WorkerRegister';
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { WorkerJobs } from './pages/worker/WorkerJobs';
import { WorkerMyJobs } from './pages/worker/WorkerMyJobs';
import { WorkerJobDetails } from './pages/worker/WorkerJobDetails';
import { WorkerEarnings } from './pages/worker/WorkerEarnings';
import { WorkerProfile as WorkerProfilePage } from './pages/worker/WorkerProfile';
import { BookingConfirmationUI } from './pages/BookingConfirmationUI';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route - Worker Login */}
        <Route path="/" element={<WorkerLogin />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/worker-register" element={<WorkerRegister />} />
        
        {/* Worker Routes */}
        <Route path="/worker" element={<WorkerDashboard />} />
        <Route path="/worker/jobs" element={<WorkerJobs />} />
        <Route path="/worker/my-jobs" element={<WorkerMyJobs />} />
        <Route path="/worker/jobs/:id" element={<WorkerJobDetails />} />
        <Route path="/worker/earnings" element={<WorkerEarnings />} />
        <Route path="/worker/profile" element={<WorkerProfilePage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationUI />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
