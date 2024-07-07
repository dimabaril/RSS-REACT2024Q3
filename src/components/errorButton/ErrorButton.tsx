import { Component } from "react";

interface ErrorButtonState {
  error: boolean;
}

interface ErrorButtonProps {
  errorMessage?: string;
}

export default class ErrorButton extends Component<
  ErrorButtonProps,
  ErrorButtonState
> {
  state: ErrorButtonState = {
    error: false,
  };

  render() {
    const defaultErrorMessage = "Error was thrown by ErrorButton";
    const errorMessage = this.props.errorMessage || defaultErrorMessage;

    if (this.state.error) {
      throw new Error(errorMessage);
    }

    return (
      <button
        className="error-button"
        onClick={() => this.setState({ error: true })}
      >
        Throw Error Button
      </button>
    );
  }
}
