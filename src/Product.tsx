import React, { useContext } from 'react';
import { Context } from './DataContext';

export default function Product() {

  const context = useContext(Context);

  return <h1>Welcome Product  - { context.name } </h1>;
}
