import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import MoviesList from '../MoviesList';

global.fetch = require('jest-fetch-mock');

afterEach(() => cleanup());

const movies = {
  success: true,
  results: [
    {
      id: '1',
      title: 'first movie',
      poster_path: 'poster1.jpg',
      release_date: '28-07-1991',
      overview: 'This is the first film',
      backdrop_path: 'backdrop1.jpg',
    },
    {
      id: '2',
      title: 'second movie',
      poster_path: 'poster2.jpg',
      release_date: '23-04-1990',
      overview: 'This is the second film in the api mock',
      backdrop_path: 'backdrop2.jpg',
    },
    {
      id: '3',
      title: 'third movie',
      poster_path: 'poster3.jpg',
      release_date: '24-05-1980',
      overview: 'This is the third film in the api mock',
      backdrop_path: 'backdrop3.jpg',
    },
  ],
};

const movie = movies.results[0];

// test for errors - route any errors to a jest mock function
console.error = jest.fn();

test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));

  const {
    getByTestId, getAllByTestId, queryByTestId,
  } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-link'));
  // using queryByTestId because it may not actually be there
  expect(queryByTestId('loading')).toBeFalsy();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
});

test('<MoviesList /> api fail', async () => {
  movies.success = false;
  fetch.mockResponseOnce(JSON.stringify(movies));

  const {
    getByTestId, getAllByTestId, queryByTestId,
  } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );

  expect(getByTestId('loading')).toBeTruthy();

  // would check for some kind of error state here - 'could not fetch data...'
});
