import React, { useState } from "react";
import axios from "axios";

const AddItemForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newItem = {
        name: itemName,
        expiryDate: expiryDate,
        status: "Healthy",
      };

      const response = await axios.post(
        "https://localhost:7064/api/FridgeItems",
        newItem
      );

      console.log("Item posted:", response.data);

      onAddItem(response.data);

      setItemName("");
      setExpiryDate("");
    } catch (error) {
      console.error("Error posting item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="add-item-form flex flex-col sm:flex-row sm:items-end gap-4 bg-gray-50 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto"
      onSubmit={handleSubmit}
    >
      {/* Item Name Field */}
      <div className="flex-1">
        <label
          htmlFor="itemName"
          className="block text-gray-700 font-medium mb-1 flex items-center gap-2 text-left"
        >
          <span role="img" aria-label="meat" className="text-red-500">
            🥩
          </span>
          Item Name
        </label>
        <input
          id="itemName"
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Expiry Date Field */}
      <div className="flex-1">
        <label
          htmlFor="expiryDate"
          className="block text-gray-700 font-medium mb-1 flex items-center gap-2 text-left"
        >
          <span role="img" aria-label="clock" className="text-blue-500">
            🕰️
          </span>
          Expiry Date
        </label>
        <input
          id="expiryDate"
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Adding..." : "Add to Fridge"}
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;
