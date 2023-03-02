import React, { useState, useEffect } from 'react';
import '../css/kanban.css';

function KanbanCard({ id, title, items, updateTitle, removeCard }) {
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(`kanbanItems-${id}`));
    if (storedItems) {
      setLocalItems(storedItems);
    }
  }, [id]);

  const handleAddItem = () => {
    const newItems = [...localItems, 'New item'];
    setLocalItems(newItems);
    localStorage.setItem(`kanbanItems-${id}`, JSON.stringify(newItems));
  };

  const handleRemoveItem = (index) => {
    const newItems = [...localItems];
    newItems.splice(index, 1);
    setLocalItems(newItems);
    localStorage.setItem(`kanbanItems-${id}`, JSON.stringify(newItems));
  };

  const handleEditItem = (index, content) => {
    const newItems = [...localItems];
    newItems[index] = content;
    setLocalItems(newItems);
    localStorage.setItem(`kanbanItems-${id}`, JSON.stringify(newItems));
  };

  const handleEditTitle = (event) => {
    updateTitle(event.target.value);
  };

  return (
    <div className="kanban-card">
      <div className='cardHead'>
        <input
          type="text"
          defaultValue={title}
          onBlur={handleEditTitle}
          className="title"
        />
        <button className="material-symbols-outlined closeBtn" onClick={removeCard}>Close</button>
      </div>
      <ul>
        {localItems.map((item, index) => (
          <li key={index}>
            <input
              type="text"
              defaultValue={item}
              onBlur={(e) => handleEditItem(index, e.target.value)}
            />
            <button onClick={() => handleRemoveItem(index)}>
              <i className='material-symbols-outlined'>Close</i>
            </button>
          </li>
        ))}
      </ul>
      <button className="addbtn" onClick={handleAddItem}>
        <i className='material-symbols-outlined'>Add</i>
        <span>Add Items</span>
      </button>
    </div>
  );
}

export default KanbanCard;
