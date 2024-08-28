import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const FilialCard = ({ filial }) => (
  <Card
    hoverable
    title={filial.name}
    style={{ width: 300, margin: '1rem' }}
  >
    <Meta
      description={
        <ul>
          {filial.departments.map((department, index) => (
            <li key={index}>{department}</li>
          ))}
        </ul>
      }
    />
  </Card>
);

export default FilialCard;
