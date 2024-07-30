import { useState } from "react";

import "./ErrorButton.scss";

interface ErrorButtonProps {
  errorMessage?: string;
}

export default function ErrorButton(props: ErrorButtonProps) {
  const [error, setError] = useState(false);

  const defaultErrorMessage = "Error was thrown by ErrorButton";
  const errorMessage = props.errorMessage || defaultErrorMessage;

  if (error) {
    throw new Error(errorMessage);
  }

  return (
    <button className="error-button" onClick={() => setError(true)}>
      Throw Error Button
    </button>
  );
}
