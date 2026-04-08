import { useEffect, useMemo, useState } from 'react';
import { checkAccess, getRooms } from '../services/api';

const DEFAULT_RFID = '123ABC';

function CheckAccess() {
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [roomsError, setRoomsError] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setRoomsLoading(true);
        setRoomsError('');
        const data = await getRooms();
        setRooms(Array.isArray(data) ? data : []);
      } catch (err) {
        setRoomsError(err.message || 'Failed to load rooms');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError('');

    if (!roomId) {
      setError('Please select a room');
      return;
    }

    try {
      setChecking(true);
      const response = await checkAccess({
        rfid: String(DEFAULT_RFID),
        roomId: String(roomId),
      });
      setResult(Boolean(response?.access));
    } catch (err) {
      setError(err.message || 'Failed to check access');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Check Access</h1>
        <p className="page-subtitle">Validate door access using RFID ({DEFAULT_RFID})</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="roomId" className="form-label">Select Room</label>
            <select
              id="roomId"
              className="form-select"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
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

          {error && <div className="message message-error">{error}</div>}

          {result !== null && (
            <div className={`message ${result ? 'message-success' : 'message-error'}`}>
              {result ? 'Access granted' : 'Access denied'}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={checking || roomsLoading || !!roomsError}
          >
            {checking ? 'Checking...' : 'Check Access'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckAccess;
