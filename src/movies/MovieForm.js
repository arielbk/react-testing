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
        <label htmlFor="text">
          Text
          <input
            type="text"
            id="text"
            onChange={e => this.setState({ text: e.target.value })}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
