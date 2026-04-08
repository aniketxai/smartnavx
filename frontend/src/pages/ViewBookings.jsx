import { useState, useEffect } from 'react';
import { getBookings } from '../services/api';

function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getBookings();
      setBookings(data.bookings || data || []);
    } catch (err) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">View Bookings</h1>
        <p className="page-subtitle">Your current and upcoming reservations</p>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading bookings...</p>
        </div>
      )}

      {error && (
        <div className="message message-error">
          {error}
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="empty-state">
          <p>No bookings found</p>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id || index}>
                  <td>{booking.room}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>{formatTime(booking.startTime || booking.start_time)}</td>
                  <td>{formatTime(booking.endTime || booking.end_time)}</td>
                  <td>
                    <span className="status-badge status-confirmed">
                      {booking.status || 'Confirmed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && (
        <button onClick={fetchBookings} className="btn btn-secondary">
          Refresh
        </button>
      )}
    </div>
  );
}

export default ViewBookings;
