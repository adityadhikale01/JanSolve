import { Form } from "react-router";
import {
  Search,
  House,
  Waves,
  Mountain,
  Building2,
  Tent,
  Hotel,
  TreePalm,
  Filter,
} from "lucide-react";

import "./FilterBar.css";
import { useNavigate } from "react-router-dom";
export default function FilterBar() {
   const navigate = useNavigate();
   function handleReset() {
    navigate("/listings");
  }
  return (
    <section className="filter-bar-container">
      <Form
        className="filter-form"
        method="get"
        action="/listings"
      >
        {/* ================= Search ================= */}

        <div className="search-wrapper">
          <Search size={20} />

          <input
            type="text"
            name="search"
            placeholder="Search destination or property..."
          />

          <button
            type="submit"
            className="search-btn"
          >
            Search
          </button>
        </div>

        {/* ================= Categories ================= */}

        <div className="category-row">
          <input
            type="radio"
            id="all"
            name="category"
            value=""
            defaultChecked
          />
          <label htmlFor="all" className="category">
            <House size={18} />
            All
          </label>

          <input
            type="radio"
            id="beach"
            name="category"
            value="Beach"
          />
          <label htmlFor="beach" className="category">
            <Waves size={18} />
            Beach
          </label>

          <input
            type="radio"
            id="mountain"
            name="category"
            value="Mountain"
          />
          <label htmlFor="mountain" className="category">
            <Mountain size={18} />
            Mountain
          </label>

          <input
            type="radio"
            id="apartment"
            name="category"
            value="Apartment"
          />
          <label htmlFor="apartment" className="category">
            <Building2 size={18} />
            Apartment
          </label>

          <input
            type="radio"
            id="villa"
            name="category"
            value="Villa"
          />
          <label htmlFor="villa" className="category">
            <Hotel size={18} />
            Villa
          </label>

          <input
            type="radio"
            id="camping"
            name="category"
            value="Camping"
          />
          <label htmlFor="camping" className="category">
            <Tent size={18} />
            Camping
          </label>

          <input
            type="radio"
            id="farm"
            name="category"
            value="Farm"
          />
          <label htmlFor="farm" className="category">
            <TreePalm size={18} />
            Farm
          </label>
        </div>

        {/* ================= Filters ================= */}

        <div className="filter-row">

          <div className="filter-group">
            <label>Country</label>

            <select name="country">
              <option value="">All Countries</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="France">France</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price</label>

            <select name="price">
              <option value="">Any Price</option>
              <option value="1000">₹1,000+</option>
              <option value="3000">₹3,000+</option>
              <option value="5000">₹5,000+</option>
              <option value="10000">₹10,000+</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Guests</label>

            <select name="guests">
              <option value="">Guests</option>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="6">6+ Guests</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>

            <select name="sort">
              <option value="">Recommended</option>
              <option value="priceLow">Price : Low to High</option>
              <option value="priceHigh">Price : High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

        </div>

        {/* ================= Buttons ================= */}

        <div className="filter-actions">

        <button
          type="button"
          className="reset-btn"
          onClick={handleReset}
        >
          Reset
        </button>


          <button
            type="submit"
            className="apply-btn"
          >
            <Filter size={18} />
            Apply Filters
          </button>

        </div>

      </Form>
    </section>
  );
}