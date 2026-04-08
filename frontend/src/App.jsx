import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import BookResource from './pages/BookResource';
import ViewBookings from './pages/ViewBookings';
import CampusNavigation from './pages/CampusNavigation';
import CheckAccess from './pages/CheckAccess';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/book" element={<BookResource />} />
            <Route path="/bookings" element={<ViewBookings />} />
            <Route path="/check-access" element={<CheckAccess />} />
            <Route path="/navigation" element={<CampusNavigation />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
