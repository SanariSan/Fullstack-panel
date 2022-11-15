import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

type TProps = {
  children: ReactNode;
};

type TState = {
  error?: Error | undefined;
  errorInfo?: ErrorInfo | undefined;
};

class ErrorBoundary extends Component<TProps, TState> {
  public state: TState = {
    error: undefined,
    errorInfo: undefined,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error !== undefined && this.state.errorInfo !== undefined) {
      return (
        <div>
          <h2>Error in component lifecycle</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error.message}
            <hr />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
