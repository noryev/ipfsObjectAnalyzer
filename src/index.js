import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cid: '',
      gateways: ['https://ipfs.io', 'https://leto.gg', 'https://cloudflare-ipfs.com'],
      results: []
    };
  }

  handleCIDChange = (event) => {
    this.setState({ cid: event.target.value });
  }

  handleGatewayChange = (index, event) => {
    const newGateways = this.state.gateways.map((gateway, idx) => idx === index ? event.target.value : gateway);
    this.setState({ gateways: newGateways });
  }

  benchmark = async () => {
    const results = [];
    for (const gateway of this.state.gateways) {
      const start = performance.now();
      await fetch(`${gateway}/ipfs/${this.state.cid}`);
      const end = performance.now();
      const duration = end - start;
      results.push({ gateway, duration });
    }
    this.setState({ results });
  }

  render() {
    return (
      <div>
        <h1>IPFS CID Benchmarking</h1>
        <input type="text" value={this.state.cid} onChange={this.handleCIDChange} placeholder="Content Identifier" />
        {this.state.gateways.map((gateway, index) => (
          <input key={index} type="text" value={gateway} onChange={(e) => this.handleGatewayChange(index, e)} />
        ))}
        <button onClick={this.benchmark}>Benchmark</button>
        <ul>
          {this.state.results.map((result, index) => (
            <li key={index}>{result.gateway}: {result.duration}ms</li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
