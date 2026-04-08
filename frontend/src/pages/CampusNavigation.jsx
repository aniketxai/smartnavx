import { useState } from 'react';

function CampusNavigation() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  const locations = [
    'Main Entrance',
    'Library',
    'Lab A1',
    'Lab B2',
    'Conference Room 1',
    'Conference Room 2',
    'Study Room 101',
    'Study Room 102',
    'Lecture Hall A',
    'Lecture Hall B',
    'Cafeteria',
    'Student Center',
    'Admin Building',
    'Parking Lot A',
    'Parking Lot B',
  ];

  const findPath = () => {
    if (!fromLocation || !toLocation) {
      alert('Please select both locations');
      return;
    }

    if (fromLocation === toLocation) {
      alert('Starting and destination locations cannot be the same');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const steps = generateRoute(fromLocation, toLocation);
      setRoute({
        from: fromLocation,
        to: toLocation,
        steps: steps,
        distance: `${Math.floor(Math.random() * 500) + 100}m`,
        duration: `${Math.floor(Math.random() * 10) + 2} minutes`,
      });
      setLoading(false);
    }, 500);
  };

  const generateRoute = (from, to) => {
    const directions = [
      'Head north',
      'Turn right',
      'Continue straight',
      'Turn left',
      'Walk through the corridor',
      'Take the stairs',
    ];

    const numSteps = Math.floor(Math.random() * 3) + 3;
    const steps = [];

    for (let i = 0; i < numSteps - 1; i++) {
      steps.push(directions[Math.floor(Math.random() * directions.length)]);
    }

    steps.push(`Arrive at ${to}`);

    return steps;
  };

  const resetRoute = () => {
    setFromLocation('');
    setToLocation('');
    setRoute(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Campus Navigation</h1>
        <p className="page-subtitle">Find your way around campus</p>
      </div>

      <div className="form-container">
        <div className="navigation-form">
          <div className="form-group">
            <label htmlFor="from" className="form-label">
              From Location
            </label>
            <select
              id="from"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="form-select"
            >
              <option value="">Select starting point...</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="to" className="form-label">
              To Location
            </label>
            <select
              id="to"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="form-select"
            >
              <option value="">Select destination...</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button
              onClick={findPath}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Finding Path...' : 'Find Path'}
            </button>
            {route && (
              <button onClick={resetRoute} className="btn btn-secondary">
                Reset
              </button>
            )}
          </div>
        </div>

        {route && (
          <div className="route-container">
            <div className="route-header">
              <h3 className="route-title">Route Details</h3>
              <div className="route-info">
                <span className="route-badge">
                  Distance: {route.distance}
                </span>
                <span className="route-badge">
                  Duration: {route.duration}
                </span>
              </div>
            </div>

            <div className="route-steps">
              <div className="route-point route-start">
                <div className="route-marker">📍</div>
                <div className="route-text">
                  <strong>Starting Point</strong>
                  <p>{route.from}</p>
                </div>
              </div>

              {route.steps.map((step, index) => (
                <div key={index} className="route-step">
                  <div className="route-line"></div>
                  <div className="route-marker">{index + 1}</div>
                  <div className="route-text">{step}</div>
                </div>
              ))}

              <div className="route-point route-end">
                <div className="route-marker">🎯</div>
                <div className="route-text">
                  <strong>Destination</strong>
                  <p>{route.to}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CampusNavigation;
