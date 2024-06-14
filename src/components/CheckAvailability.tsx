import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { checkAvailability } from "../slice/availabilitySlice";
import { RootState, AppDispatch } from "../store/store";
import { Draft, SerializedError } from "@reduxjs/toolkit"; // Import the WritableDraft type

const CheckAvailability: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const dispatch = useDispatch<AppDispatch>(); // Use the AppDispatch type here
  const { available, loading, error } = useSelector(
    (state: RootState) => state.availability
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (checkInDate && checkOutDate) {
      dispatch(
        checkAvailability({
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString(),
        })
      );
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Check Availability</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Check-in Date</label>
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Check-out Date</label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Check Availability
        </button>
      </form>
      {loading && (
        <div className="mt-4 text-xl font-bold">Checking availability...</div>
      )}
      {available !== null && !loading && (
        <div className="mt-4 text-xl font-bold">
          Availability: {available ? "Available" : "Not Available"}
        </div>
      )}
      {error && (
        <div>
          Error:{" "}
          {(error as Draft<SerializedError>).code === "400"
            ? "Bad Request: Something went wrong with your request."
            : Number((error as Draft<SerializedError>).code) ||
              "An error occurred"}
        </div>
      )}
    </div>
  );
};

export default CheckAvailability;
