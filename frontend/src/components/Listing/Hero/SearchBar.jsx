import { Form } from "react-router";
import "./SearchBar.css";

import {
  Search,
  MapPin,
  CalendarDays,
  Users,
} from "lucide-react";

export default function SearchBar() {
  return (
    <Form className="search-bar" action="/listings" method="get">

      <div className="search-item">
        <MapPin size={20} />

        <div className="search-field">
          <label htmlFor="location">Where</label>

          <input
            id="location"
            type="text"
            name="location"
            placeholder="Search destination"
          />
        </div>
      </div>

      <div className="divider"></div>

      <div className="search-item">
        <CalendarDays size={20} />

        <div className="search-field">
          <label htmlFor="checkIn">Check In</label>

          <input
            id="checkIn"
            type="date"
            name="checkIn"
          />
        </div>
      </div>

      <div className="divider"></div>

      <div className="search-item">
        <CalendarDays size={20} />

        <div className="search-field">
          <label htmlFor="checkOut">Check Out</label>

          <input
            id="checkOut"
            type="date"
            name="checkOut"
          />
        </div>
      </div>

      <div className="divider"></div>

      <div className="search-item">
        <Users size={20} />

        <div className="search-field">
          <label htmlFor="guests">Guests</label>

          <input
            id="guests"
            type="number"
            name="guests"
            min="1"
            defaultValue={1}
          />
        </div>
      </div>

      <button type="submit" className="search-btn">
        <Search size={20} />
        <span>Search</span>
      </button>

    </Form>
  );
}