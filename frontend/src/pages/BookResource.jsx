import { useState } from 'react';
import { bookResource } from '../services/api';

function BookResource() {
  const [formData, setFormData] = useState({
    room: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const rooms = [
    'Lab A1',
    'Lab B2',
    'Conference Room 1',
    'Conference Room 2',
    'Study Room 101',
    'Study Room 102',
    'Lecture Hall A',
    'Lecture Hall B',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.room || !formData.date || !formData.startTime || !formData.endTime) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await bookResource(formData);
      setMessage({ type: 'success', text: 'Resource booked successfully!' });
      setFormData({
        room: '',
        date: '',
        startTime: '',
        endTime: '',
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to book resource. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Book Resource</h1>
        <p className="page-subtitle">Reserve a room or lab for your needs</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="room" className="form-label">
              Select Room
            </label>
            <select
              id="room"
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Choose a room...</option>
              {rooms.map((room, index) => (
                <option key={index} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startTime" className="form-label">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime" className="form-label">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          {message.text && (
            <div className={`message message-${message.type}`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Resource'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookResource;
