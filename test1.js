import React, { Component } from 'react';
import { render } from 'react-dom';

// To simulate a api call
const fetchData = () => new Promise(
  (resolve) => setTimeout(() => resolve([1,2,3,4,5]), 3000)
);

class Test extends Component {
  state = {
    numbers: [],
  };
  componentDidMount() {
    fetchData().then((numbers) => this.setState({ numbers }));
  }
  render() {
    return (
      <div>
        {this.state.numbers.join(', ')}
      </div>
    );
  }
}

render(<Test />, document.getElementById('container'));
