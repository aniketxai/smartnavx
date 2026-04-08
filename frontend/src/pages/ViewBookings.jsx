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
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return '-';

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoomName = (roomIdValue) => {
    if (!roomIdValue) return 'N/A';
    if (typeof roomIdValue === 'object' && roomIdValue.name) return roomIdValue.name;
    return String(roomIdValue);
  };

  const getBookingId = (booking, index) => {
    return booking?._id || booking?.id || `${booking?.userId || 'booking'}-${index}`;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">View Bookings</h1>
        <p className="page-subtitle">Current and upcoming reservations</p>
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
                <th>Start</th>
                <th>End</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={getBookingId(booking, index)}>
                  <td>{getRoomName(booking.roomId)}</td>
                  <td>{formatDateTime(booking.startTime)}</td>
                  <td>{formatDateTime(booking.endTime)}</td>
                  <td>{booking.userId || 'N/A'}</td>
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
