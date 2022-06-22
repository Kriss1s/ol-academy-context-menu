import React from 'react';
import Li from './components/Li';

function App() {
  const list = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];

  return (
    <section className='container'>
      {
        <ul className='list-container'>
          {list.map((e, index) => (
            <Li key={index} parent={e}></Li>
          ))}
        </ul>
      }
    </section>
  );
}

export default App;
