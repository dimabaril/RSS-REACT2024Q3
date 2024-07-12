import { Component, ErrorInfo, ReactNode } from "react";

import "./ErrorBoundary.scss";

interface Props {
  children?: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

const logErrorToMyService = (
  error: Error,
  componentStack: ErrorInfo["componentStack"],
) => {
  console.error(error, componentStack);
};

const resetApplication = () => {
  window.location.reload();
};

export function ErrorFallbackUI() {
  return (
    <div className="error">
      Error caught by ErrorBoundary
      <button className="error__button" onClick={resetApplication}>
        Restart Application
      </button>
    </div>
  );
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
