import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  //Dos formas de hacerlo... o bien con la comentada aquí abajo
  // static getDerivedStateFromError(error){
  //   return {error}
  // }
  //O bien con la activa a continuación
  componentDidCatch(error, errorInfo) {
    //send error to backend or log system
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className='error'
          onClick={() => this.setState({ error: null })}>
          {`Oooops! ... there was an error: ${this.state.error.message}`}
        </div>
      );
    }
    return this.props.children;
  }
}
