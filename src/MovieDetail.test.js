import React from 'react';
import { render, cleanup } from 'react-testing-library';

import MovieDetail from './MovieDetail';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  // this is necessary to clear out the history of the mocked function
  console.error.mockClear();
});

const match = {
  params: {
    id: 'whatever as long as its a string...',
  },
};

console.error = jest.fn();

test('<MovieDetail />', () => {
  fetch.mockResponseOnce(JSON.stringify({
    movie: {
      id: 'hi',
      movie: 'this is a movie',
    },
  }));

  const { debug } = render(<MovieDetail match={match} />);
  debug();
});
