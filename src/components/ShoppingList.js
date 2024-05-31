import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [inputText, setInputText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "Produce",
  });

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    if (inputText.length > 0) {
      if (item.name.toLowerCase().indexOf(inputText.toLowerCase()) === -1) {
        return null;
      } else {
        return true;
      }
    }

    if (selectedCategory === "All") {
      return true;
    }

    return item.category === selectedCategory;
  });

  function handleInputChange(e) {
    setInputText(e.target.value);
  }

  function onItemFormSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: uuid(),
      name: formData.name,
      category: formData.category,
    };

    setItems([...items, newItem]);

    setFormData({
      name: "",
      category: "Produce",
    });
  }

  return (
    <div className="ShoppingList">
      <ItemForm
        formData={formData}
        setFormData={setFormData}
        onItemFormSubmit={onItemFormSubmit}
      />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleInputChange}
        searchText={inputText}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
