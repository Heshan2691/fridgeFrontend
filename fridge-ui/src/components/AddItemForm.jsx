import React, { useState } from "react";
import axios from "axios";

const AddItemForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions

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

      // Post newItem to the backend
      const response = await axios.post(
        "https://localhost:7064/api/FridgeItems",
        newItem // Send the complete object
      );

      console.log("Item posted:", response.data);

      // Update UI only after the API confirms success
      onAddItem(response.data);

      // Clear input fields after successful submission
      setItemName("");
      setExpiryDate("");
    } catch (error) {
      console.error("Error posting item:", error);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <form
      className="add-item-form flex flex-col sm:flex-row sm:space-x-4 items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
        className="input-field sm:w-1/3 rounded border-2flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
        className="input-field sm:w-1/3 rounded border-2 flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`submit-btn sm:w-1/3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-300 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Adding..." : "Add to Fridge"}
      </button>
    </form>
  );
};

export default AddItemForm;
