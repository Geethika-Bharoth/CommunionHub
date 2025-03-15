import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

const Home = () => (
  <div className="home">
    <header>
      <h1>CommunionHub</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
      </nav>
    </header>
    <section className="hero">
      <h2>Connecting People Across Faiths & Interests</h2>
      <p>Join events and build a stronger community.</p>
      <Link to="/events" className="cta-button">Explore Events</Link>
    </section>
  </div>
);

const EventListing = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Charity Drive", date: "2025-03-15", location: "NYC", category: "Charity" },
    { id: 2, title: "Community Prayer", date: "2025-03-20", location: "LA", category: "Religious" }
  ]);
  const [filter, setFilter] = useState("");
  const [newEvent, setNewEvent] = useState({ title: "", date: "", category: "" });

  const handleAddEvent = () => {
    setEvents([...events, { id: events.length + 1, ...newEvent }]);
    setNewEvent({ title: "", date: "", category: "" });
  };

  return (
    <div className="events">
      <header>
        <h1>Events</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
        </nav>
      </header>
      <label>Filter by Category:</label>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Religious">Religious</option>
        <option value="Social">Social</option>
        <option value="Charity">Charity</option>
      </select>
      <ul>
        {events
          .filter((event) => !filter || event.category === filter)
          .map((event) => (
            <li key={event.id}>{event.title} - {event.date} - {event.location}</li>
          ))}
      </ul>
      <h2>Add New Event</h2>
      <input type="text" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
      <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
      <select onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}>
        <option value="">Select Category</option>
        <option value="Religious">Religious</option>
        <option value="Social">Social</option>
        <option value="Charity">Charity</option>
      </select>
      <button onClick={handleAddEvent}>Add Event</button>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventListing />} />
    </Routes>
  </Router>
);

export default App;
