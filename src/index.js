import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    /* ... (constructor and methods unchanged) ... */

    render() {
        const styles = {
            container: {
                fontFamily: '"Arial", sans-serif',
                maxWidth: '600px',
                margin: '50px auto',
                padding: '20px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '5px'
            },
            header: {
                borderBottom: '2px solid #eee',
                paddingBottom: '10px',
                marginBottom: '20px'
            },
            input: {
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: '1px solid #ccc'
            },
            button: {
                backgroundColor: '#007BFF',
                color: '#fff',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
            },
            results: {
                marginTop: '20px'
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1>IPFS CID Benchmarking</h1>
                </div>
                
                <input 
                    type="text" 
                    value={this.state.cid} 
                    onChange={this.handleCIDChange} 
                    placeholder="Content Identifier"
                    style={styles.input}
                />
                
                <button onClick={this.benchmark} style={styles.button}>
                    Benchmark
                </button>
                
                {this.state.loading && <p>Loading...</p>}
                {this.state.error && <p>Error: {this.state.error}</p>}
                
                <ul style={styles.results}>
                    {this.state.results.map((result, index) => (
                        <li key={index}>Gateway {index + 1}: {result.duration}ms</li>
                    ))}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
