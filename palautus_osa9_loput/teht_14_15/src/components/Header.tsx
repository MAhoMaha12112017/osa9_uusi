import React from 'react';
// import ReactDOM from 'react-dom';

const Header: React.FC<{name: string}> = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

export default Header;