export default function Stats({ items }) {
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
