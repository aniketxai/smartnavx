import { useEffect, useMemo, useState } from 'react';
import { bookResource, getRooms } from '../services/api';

const DEFAULT_RFID = '123ABC';

function BookResource() {
  const [formData, setFormData] = useState({
    roomId: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [roomsError, setRoomsError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setRoomsLoading(true);
        setRoomsError('');
        const response = await getRooms();
        setRooms(Array.isArray(response) ? response : []);
      } catch (error) {
        setRoomsError(error.message || 'Failed to load rooms');
      } finally {
        setRoomsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const roomOptions = useMemo(() => {
    return rooms
      .filter((room) => room?._id && room?.name)
      .map((room) => ({ id: String(room._id), name: room.name }));
  }, [rooms]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.roomId || !formData.date || !formData.startTime || !formData.endTime) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    const start = new Date(`${formData.date}T${formData.startTime}`);
    const end = new Date(`${formData.date}T${formData.endTime}`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setMessage({ type: 'error', text: 'Please enter valid date/time values' });
      return;
    }

    if (end <= start) {
      setMessage({ type: 'error', text: 'End time must be after start time' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await bookResource({
        rfid: String(DEFAULT_RFID),
        roomId: String(formData.roomId),
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });

      setMessage({ type: 'success', text: 'Resource booked successfully!' });
      setFormData({
        roomId: '',
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
        <p className="page-subtitle">Reserve a room or lab using your RFID ({DEFAULT_RFID})</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="roomId" className="form-label">
              Select Room
            </label>
            <select
              id="roomId"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              className="form-select"
              disabled={roomsLoading || !!roomsError}
              required
            >
              <option value="">
                {roomsLoading ? 'Loading rooms...' : 'Choose a room...'}
              </option>
              {roomOptions.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            {roomsError && <p className="field-error">{roomsError}</p>}
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
            disabled={loading || roomsLoading || !!roomsError}
          >
            {loading ? 'Booking...' : 'Book Resource'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookResource;
