"use client";
import { useState, useEffect } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
