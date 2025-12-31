import { useState } from "react";

export default function App() {
  /* we put the state higher so we can send it as props to the other child components*/

  const [items, setItem] = useState([]);

  function handleAddItem(item) {
    setItem((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    // Remove an item from the array by its id and return a new array
    setItem((prev) => prev.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { quantity, description, packed: false, id: Date.now() };

    console.log(newItem);
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ? </h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {/* we create a number array from 1 - 20 then map through them one by one*/}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {/* tenary operatior to conditionaly set style */}
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        {" "}
        <em>Start adding items to your packing list.</em>
      </p>
    );
  const itemNum = items.length;
  const itemPacked = items.filter((item) => item.packed).length;
  const itemPercentage = Math.round((itemPacked / itemNum) * 100);
  return (
    <footer className="stats">
      {itemPercentage === 100 ? (
        "You got everything! Ready to go✈️"
      ) : (
        <em>
          👜 You have {itemNum} items on your list, and you already packed{" "}
          {itemPacked} (%{itemPercentage}){" "}
        </em>
      )}
    </footer>
  );
}
