"use client";
import { useState } from "react";

const allowedZips = ["30523", "30528", "30545", "30571"];
const baseLat = 34.6132;
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
  return R * c * 0.621371;
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
      alert(
        "Sorry, we only serve within 15 miles of ZIP 30523 or selected ZIP codes."
      );
      return;
    }

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
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md space-y-4 border border-white/20"
      >
        <img
          src="/stravo-logo.png"
          alt="Stravo Logo"
          className="mx-auto w-32 mb-4"
        />
        <h1 className="text-xl font-bold text-center text-white">
          Book Your Detail
        </h1>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-blue-400 focus:ring-2 focus:ring-blue-500 placeholder-white text-white"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-blue-400 focus:ring-2 focus:ring-blue-500 placeholder-white text-white"
        />
        <input
          type="text"
          name="address"
          placeholder="Service Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-blue-400 focus:ring-2 focus:ring-blue-500 placeholder-white text-white"
        />
        <input
          type="text"
          name="service"
          placeholder="Service (e.g. Interior Deep Clean)"
          value={form.service}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-blue-400 focus:ring-2 focus:ring-blue-500 placeholder-white text-white"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-blue-400 focus:ring-2 focus:ring-blue-500 text-white"
        />
        <textarea
          name="notes"
          placeholder="Notes or special requests"
          value={form.notes}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-blue-400 focus:ring-2 focus:ring-blue-500 placeholder-white text-white"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded shadow-md hover:shadow-blue-500/50 transition-all"
        >
          Submit Booking
        </button>
      </form>
    </main>
  );
}
