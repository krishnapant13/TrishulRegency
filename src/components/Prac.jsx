import React, { useState } from "react";

const ArrayDisplay = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const arrays = [
    ["Item 1", "Item 2", "Item 3"],
    ["Item A", "Item B", "Item C", "Item D"],
    ["Apple", "Banana", "Orange", "Grapes", "Mango"],
    // Add more arrays as needed
  ];

  const handleButtonClick = () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= items.length) {
      // If reached end of current array, reset to the beginning
      newIndex = 0;
      const nextArrayIndex = (arrays.indexOf(items) + 1) % arrays.length;
      setItems(arrays[nextArrayIndex]);
    }
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <h2>Array Display</h2>
      <button onClick={handleButtonClick}>Next</button>
      <div>
        <p>Displayed items:</p>
        {items.slice(0, currentIndex + 1).map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default ArrayDisplay;
