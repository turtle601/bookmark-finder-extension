import React from 'react';

export interface IItemProps {
  id: `${number}`;
  children: ({ id }: { id: `${number}` }) => React.ReactNode;
}

const Item: React.FC<IItemProps> = ({ id, children }) => {
  return <>{children({ id })}</>;
};

export default Item;
