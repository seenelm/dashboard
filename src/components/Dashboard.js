import React, { useState, useEffect } from 'react';
import '../css/main.css'
import PieChart from './PieChart'
import TotalCalls from './TotalCalls';
import Tiles from './Tiles';
import GrabData from './/GrabData';
import HistTotCases from './HistTotCases';
import KanbanCard from './KanbanCard';

function Dashboard() {
  const [kanbanCards, setKanbanCards] = useState(() => {
    const storedCards = JSON.parse(localStorage.getItem('kanbanCards'));
    return storedCards || [
      { title: 'HOT CLIENTS', items: [] },
      { title: 'WARM CLIENTS', items: [] }
    ];
  });

  const addKanbanCard = () => {
    const newCard = { title: 'New card', items: [] };
    setKanbanCards([...kanbanCards, newCard]);
  };

  const removeKanbanCard = (index) => {
    const updatedKanbanCards = [...kanbanCards];
    updatedKanbanCards.splice(index, 1);
    setKanbanCards(updatedKanbanCards);
  };

  const updateKanbanCardTitle = (index, newTitle) => {
    const updatedKanbanCards = [...kanbanCards];
    updatedKanbanCards[index].title = newTitle;
    setKanbanCards(updatedKanbanCards);
  };

  useEffect(() => {
    localStorage.setItem('kanbanCards', JSON.stringify(kanbanCards));
  }, [kanbanCards]);

  return (
    <div className='content-wrapper'>
      <div className='mainContainer'>
        <div className='page-title-header'>
          <Tiles />
        </div>
        <div className='row'>
          <GrabData />
          <div className='spacer'></div>
          <TotalCalls />
          <div className='spacer'></div>
          <PieChart />
        </div>
        <div className='row'>
          <HistTotCases />
        </div>
        <div className='row'>
          {kanbanCards.map((card, index) => (
            <KanbanCard
              key={index}
              id={`kanbanCard-${index}`}
              title={card.title}
              items={card.items.slice()}
              updateTitle={(newTitle) => updateKanbanCardTitle(index, newTitle)}
              removeCard={() => removeKanbanCard(index)}
              className='kanbanCard'
            />
          ))}
          <div className='cardAddBtnContainer'>
            <button onClick={addKanbanCard} className="material-symbols-outlined cardAddBtn">Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard

