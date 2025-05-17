"use client";
import { useState, useEffect } from "react";
const allowedZips = ["30523", "30528", "30545", "30571"];
const baseLat = 34.6132; // ZIP 30523
const baseLon = -83.5249;

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 0.621371; // Convert to miles
};

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    service: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
    const geoRes = await fetch(
  `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    form.address
  )}&format=json&addressdetails=1&limit=1`
);
const geoData = await geoRes.json();

if (geoData.length === 0) {
  alert("Address not found.");
  return;
}

const userLat = parseFloat(geoData[0].lat);
const userLon = parseFloat(geoData[0].lon);
const zip = geoData[0].address.postcode;
const distance = getDistance(baseLat, baseLon, userLat, userLon);

if (distance > 15 && !allowedZips.includes(zip)) {
  alert("Sorry, we only serve within 15 miles of ZIP 30523 or selected ZIP codes.");
  return;
}
await fetch(
  "https://script.google.com/macros/s/AKfycbwaA1eKrrEWGQH1RS38jS7nTS8J9gAMoTJqp-Q0cT4zajrt_v3xnN_jN__lpcl7aqbX/exec",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  }
);

    alert("Booking submitted!");
    setForm({
      name: "",
      phone: "",
      address: "",
      service: "",
      date: "",
      notes: "",
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold text-center text-blue-900">Book Your Detail</h1>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-blue-700 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-blue-700 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full p-2 border border-blue-700 rounded"
        />
        <input
          type="text"
          name="service"
          placeholder="Service (e.g. Interior Deep Clean)"
          value={form.service}
          onChange={handleChange}
          required
          className="w-full p-2 border border-blue-700 rounded"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full p-2 border border-blue-700 rounded"
        />
        <textarea
          name="notes"
          placeholder="Notes or special requests"
          value={form.notes}
          onChange={handleChange}
          className="w-full p-2 border border-blue-700 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Booking
        </button>
      </form>
    </main>
  );
}
