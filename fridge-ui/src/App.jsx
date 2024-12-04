import React, { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import "./App.css";

const App = () => {
  const [greeting, setGreeting] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date());

  // Fetch items from backend
  useEffect(() => {
    fetch("https://localhost:7064/api/FridgeItems")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  // Determine greeting based on time of day
  useEffect(() => {
    const determineGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        return "Good Morning";
      } else if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    setGreeting(determineGreeting());

    const interval = setInterval(() => {
      setGreeting(determineGreeting());
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  // Generate recommendation logic
  useEffect(() => {
    const generateRecommendation = () => {
      const isWeekend = [0, 6].includes(date.getDay());
      const isFestiveSeason = date.getMonth() === 11; // December
      const itemsExpiringSoon = items.filter((item) => {
        const expiryDate = new Date(item.expiryDate);
        const diffInDays = (expiryDate - date) / (1000 * 60 * 60 * 24);
        return diffInDays > 0 && diffInDays <= 7; // Expiring in 7 days or less
      });
      const expiredItems = items.filter((item) => {
        const expiryDate = new Date(item.expiryDate);
        return expiryDate < date; // Already expired
      });

      if (expiredItems.length > 0) {
        return `🚨 Warning! ${expiredItems.length} item(s) in your fridge have already expired. Time to clean up!`;
      } else if (itemsExpiringSoon.length > 0) {
        return `⚠️ Heads up! ${itemsExpiringSoon.length} item(s) are nearing expiry. Use them soon!`;
      } else if (items.length === 0) {
        return `🌞 Your fridge looks empty! It's time to go grocery shopping.`;
      } else if (isWeekend) {
        return `🛒 It's the weekend! Stock up before the rush.`;
      } else if (isFestiveSeason) {
        return `🎉 A festive feast is on the horizon! Check your fridge and start planning ahead.`;
      } else if (items.length > 15) {
        return `📦 Your fridge is overcrowded with ${items.length} items. Use what you have before buying more.`;
      } else if (items.length <= 5) {
        return `🛒 Your fridge has only ${items.length} item(s). Time to restock with fresh groceries.`;
      } else {
        return `🍲 Your fridge is stocked with ${items.length} item(s). Happy cooking and meal prepping!`;
      }
    };

    setRecommendation(generateRecommendation());
  }, [items, date]);

  // Add item to fridge
  const addItem = (item) => {
    setItems([...items, item]);
    fetch("https://localhost:7064/api/FridgeItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save item to the backend");
        }
        return response.json();
      })
      .then((savedItem) => {
        console.log("Item saved to backend:", savedItem);
      })
      .catch((error) => {
        console.error("Error saving item:", error);
      });
  };

  // Delete item from fridge
  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    fetch(`https://localhost:7064/api/FridgeItems/${id}`, {
      method: "DELETE",
    }).catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className="font-sans text-center bg-gray-50 p-5">
      <h1 className="greeting text-3xl font-bold text-blue-800 pt-4 pb-4">
        {greeting}, Johny!
      </h1>
      <p className="text-lg text-gray-700">{recommendation}</p>
      <AddItemForm onAddItem={addItem} />
      <ItemList items={items} onDeleteItem={deleteItem} />
    </div>
  );
};

export default App;
