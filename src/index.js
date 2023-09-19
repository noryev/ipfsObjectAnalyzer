import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cid: '',
            gateways: ['https://ipfs.io', 'https://cloudflare-ipfs.com', 'https://leto.gg/ipfs/'],
            results: [],
            loading: false,
            error: null
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
        this.setState({ loading: true, error: null });
        const results = [];
        try {
            for (const gateway of this.state.gateways) {
                const start = performance.now();
                await fetch(`${gateway}/ipfs/${this.state.cid}`);
                const end = performance.now();
                const duration = end - start;
                results.push({ gateway, duration });
            }
        } catch (error) {
            this.setState({ error: error.message });
        } finally {
            this.setState({ results, loading: false });
        }
    }

    render() {
        return (
            <div>
                <h1>IPFS CID Benchmarking</h1>
                <input type="text" value={this.state.cid} onChange={this.handleCIDChange} placeholder="Content Identifier" />
                
                <button onClick={this.benchmark}>Benchmark</button>
                
                {this.state.loading && <p>Loading...</p>}
                {this.state.error && <p>Error: {this.state.error}</p>}
                
                <ul>
                    {this.state.results.map((result, index) => (
                        <li key={index}>Gateway {index + 1}: {result.duration}ms</li>
                    ))}
                </ul>
            </div>
        );
    }
    
    
    
    
    
}

//Start adding more gateways to retrieve from (Fleek,Lighthouse.Storage)

//Move infra files out of this React App for the UI!

//Add gateway that you will race for retrievability


ReactDOM.render(<App />, document.getElementById('root'));