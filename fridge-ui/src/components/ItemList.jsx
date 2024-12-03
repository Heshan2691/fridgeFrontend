import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const ItemList = ({ items, onDeleteItem }) => {
  const calculateStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    if (expiry < today) return "Expired";
    if ((expiry - today) / (1000 * 60 * 60 * 24) <= 30) return "Expiring-soon";
    return "Healthy";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  return (
    <div className="item-list max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
        Total items — {items.length}
      </h2>
      {items.map((item) => (
        <div
          className="item flex items-center justify-between bg-white p-4 mb-3 border border-gray-300 rounded-lg shadow-md"
          key={item.id}
        >
          <span className="item-name text-lg font-medium text-gray-800">
            {item.name}
          </span>
          <span className="item-expiry text-sm text-gray-500">
            Expiry date — {formatDate(item.expiryDate)}
          </span>
          <span className="align-items">
            <span
              className={`status px-2 py-1 text-sm font-medium rounded ${
                calculateStatus(item.expiryDate) === "Expired"
                  ? "bg-red-400 text-red-700"
                  : calculateStatus(item.expiryDate) === "Expiring-soon"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-300 text-green-700".toLowerCase()
              } px-4 py-2 text-center rounded-full text-white w-28`}
            >
              {calculateStatus(item.expiryDate)}
            </span>
          </span>

          <FaTrashAlt
            className="delete-icon text-gray-400 hover:text-red-500 cursor-pointer"
            onClick={() => onDeleteItem(item.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
