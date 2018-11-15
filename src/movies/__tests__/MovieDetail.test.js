import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';

import MovieDetail, { POSTER_PATH, BACKDROP_PATH } from '../MovieDetail';

global.fetch = require('jest-fetch-mock');

afterEach(() => { cleanup(); });

const match = {
  params: {
    id: 'whatever as long as its a string...',
  },
};

// so that the test can be more resilient, if this is changed movie.title below will also change...
const movie = {
  id: '7902139',
  title: 'this is a movie',
  poster_path: 'poster.jpg',
  release_date: '28-07-1991',
  overview: 'A string containing the full overview of the film lorem ipsum',
  backdrop_path: 'backdrop.jpg',
};

test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));

  const { getByTestId, debug } = render(<MovieDetail match={match} />);
  await waitForElement(() => getByTestId('movie-title'));

  expect(getByTestId('movie-title').textContent).toBe(movie.title);
  expect(getByTestId('movie-poster').getAttribute('src')).toBe(`${POSTER_PATH}${movie.poster_path}`);
  expect(getByTestId('movie-release_date').textContent).toBe(movie.release_date);
  expect(getByTestId('movie-overview').textContent).toBe(movie.overview);
  // not sure how to test the backdrop path, which is set as a css class background...
});
