import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('ooops!!', error, errorInfo);
    // send error to backend
    //Si usamos la función estática getDerivedStateFromError(error), no hace falta realizar la carga en el estado del error.
    //this.setState({ error });
  }
  render() {
    if (this.state.error) {
      return (
        <div
          className='error'
          onClick={() =>
            this.setState({ error: null })
          }>{`Oooops!: ${this.state.error.message}`}</div>
      );
    }
    return this.props.children;
  }
}
