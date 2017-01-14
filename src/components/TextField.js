import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

const REQUIRED = 'This field is required.';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: props.required ? REQUIRED : null,
    };

    this.value = '';
  }

  /**
   * Return the current value
   */
  getValue() {
    return this.value;
  }

  /**
   * Validate the current value
   */
  validate() {
    if (this.props.validator) {
      this.setState({
        error: this.props.validator(this.value),
      });
    }
  }

  isValid() {
    if (this.props.validator) {
      return this.props.validator(this.value) === null;
    } else if (this.props.required) {
      return this.value !== '';
    }

    return true;
  }

  /**
   * Handle onChange events by running them through
   * any validator props that have been given
   * @param e
   */
  onChange(e) {
    const { onChange, validator, required } = this.props;
    this.value = e.target.value;

    if (required || validator) {
      if (required && !this.value) {
        this.setState({
          error: REQUIRED,
        });
      } else if (validator) {
        this.validate();
      } else {
        this.setState({
          error: null,
        });
      }
    }

    if (onChange) onChange(e);
  }

  render() {
    const props = { ...this.props };
    delete props.validator;

    return (
      <TextField
        {...props}
        onChange={this.onChange.bind(this)}
        errorText={this.state.error}
      />
    );
  }

}
