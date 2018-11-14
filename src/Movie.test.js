import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from './Movie';

afterEach(() => {
  cleanup();
  // this is necessary to clear out the history of the mocked function
  console.error.mockClear();
});

console.error = jest.fn();

test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).toHaveBeenCalled();
});

const movie = {
  id: 'hi',
  title: 'Title for a movie',
  poster_path: 'filmpost.jpg',
};

test('<Movie /> with movie', () => {
  const { getByTestId } = render(
    // a 'fake' router so that we can use a link tag without complaints
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getByTestId('movie-image').src).toBe(`${POSTER_PATH}${movie.poster_path}`);
});
