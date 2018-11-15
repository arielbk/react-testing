import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';

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

// so that the test can be more resilient, if this is changed movie.title below will also change...
const movie = {
  id: 'hi',
  title: 'this is a movie',
};

test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));

  const { debug, getByTestId } = render(<MovieDetail match={match} />);
  await waitForElement(() => getByTestId('movie-title'));

  expect(getByTestId('movie-title').textContent).toBe(movie.title);
  debug();
});
