import React from 'react';
import Container from './components/Container';
const list = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];

function App() {
  return (
    <section className='container'>
      {
        <ul className='list-container'>
          {list.map((item, index) => (
            <Container key={index} parent={item}></Container>
          ))}
        </ul>
      }
    </section>
  );
}

export default App;
