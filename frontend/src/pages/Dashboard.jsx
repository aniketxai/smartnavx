import Card from '../components/Card';

function Dashboard() {
  const cards = [
    {
      title: 'Book Resource',
      description: 'Reserve rooms and labs for your activities',
      icon: '📅',
      linkTo: '/book',
    },
    {
      title: 'View Bookings',
      description: 'Check your current and upcoming reservations',
      icon: '📋',
      linkTo: '/bookings',
    },
    {
      title: 'Campus Navigation',
      description: 'Find your way around campus',
      icon: '🗺️',
      linkTo: '/navigation',
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Smart Campus Resource Optimizer</h1>
        <p className="dashboard-subtitle">
          Manage your campus resources efficiently
        </p>
      </div>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            linkTo={card.linkTo}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
