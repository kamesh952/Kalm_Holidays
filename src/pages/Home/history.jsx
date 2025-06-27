// src/components/history/History.jsx
import React from 'react';
import Car from './car';
import Content from './main';

const History = () => {
  return (
    <div>
      <div style={{
        height: '500px',
        overflow: 'hidden',
       
        marginBottom: '20px'
      }}>
        <Car />
      </div>
      <Content />
    </div>
  );
};

export default History;
