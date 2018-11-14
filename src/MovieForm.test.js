import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import MovieForm from './MovieForm';

afterEach(cleanup);

// jest Spy function
const onSubmit = jest.fn();

test('<MovieForm />', () => {
  const {
    queryByTestId, getByText, getByLabelText,
  } = render(<MovieForm submitForm={onSubmit} />);
  expect(queryByTestId('movie-form')).toBeTruthy();

  // alternate version that did not work before an update to RTL
  // getByLabelText('Text').value = 'hello';
  // fireEvent.change(getByLabelText('Text'));
  // actually fires the change on the controlled component, rather than just placing the text in
  fireEvent.change(getByLabelText('Text'), { target: { value: 'hello' } });

  fireEvent.click(getByText('Submit'));
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    text: 'hello',
  });
});
