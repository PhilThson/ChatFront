import React, { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    const content = (
      <div className="errorStyle">
        <h1 className="errorMessageStyle">Something went wrong!</h1>
        <p>We apologize for the inconvenience.</p>
      </div>
    );

    if (this.state.hasError) {
      return content;
    }

    return this.props.children;
  }
}

export default ErrorBoundary