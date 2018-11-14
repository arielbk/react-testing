import React from 'react';
import { render, cleanup } from 'react-testing-library';
import NewMovie from './NewMovie';

afterEach(cleanup);

test('<NewMovie />', () => {
  // this was an integration test (included MovieForm) but that has since been split up
  const { getByTestId, queryByTestId, container } = render(<NewMovie />);
  expect(getByTestId('page-title').textContent).toBe('New Movie');
  expect(queryByTestId('movie-form')).toBeTruthy();
  expect(container.firstChild).toMatchSnapshot();
});
