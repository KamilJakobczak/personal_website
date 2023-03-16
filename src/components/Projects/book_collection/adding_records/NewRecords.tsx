import { useState } from 'react';

import { Link } from 'react-router-dom';
import Button from '../Button';

// interface NewRecordsProps {
//   resetComponent: string;
//   resetBooleans: boolean;
// }

const NewRecords: React.FC = () => {
  const showButtons = () => {
    const elements = [
      'book',
      'author',
      'genre',
      'publisher',
      'translator',
      'collection',
    ];
    return (
      <>
        {elements.map(element => {
          return (
            <Button
              key={element}
              className='bookCollection__newRecords_item'
              linkEnd={element}
              text={element}
              linkPath='/apps/collection/add'
            />
          );
        })}
      </>
    );
  };

  return <div className='bookCollection__newRecords'>{showButtons()}</div>;
};
export default NewRecords;
