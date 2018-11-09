import React, { Component } from 'react';

export default class MovieForm extends Component {
  state = {
    text: '',
  }

  render() {
    const { submitForm } = this.props;
    const { text } = this.state;
    return (
      <form
        onSubmit={() => submitForm({
          text,
        })}
        data-testid="movie-form"
      >
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
