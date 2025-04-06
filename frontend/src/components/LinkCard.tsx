import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkCard() {
  return (
    <Link to="./pages/EventPage">
        <div>
            <h2>button</h2>
        </div>
    </Link>
  );
}