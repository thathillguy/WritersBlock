import React from 'react';
import ReactDOM from 'react-dom';
import sha from './functions/sha.js';
import JSZip from 'JSZip';
import fs from 'fs';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {};
    }
    handleSubmit(file, name) {
        let fr = new FileReader();
        let self = this;
        let parser = new DOMParser();
        fs.readFile(file.path, (err, data)=>{
            JSZip.loadAsync(data).then(function (zip) {
                let xml = zip.files["word/document.xml"];
                xml.async("string").then((data) => {
                    let xmlDoc = parser.parseFromString(data, "text/xml");
                    let state = {};
                    state[name] = xmlDoc;
                    self.setState(state);
                });
            });
        });
    }
    render() {
        console.log(this.state)
        if (this.state['file'] && this.state['compare']) {
            let filebody = this.state['file'].getElementsByTagName('body')[0];
            let comparebody = this.state['compare'].getElementsByTagName('body')[0];
            console.log(filebody.getElementsByTagName('p'));
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input
                        type="file"
                        onChange={(e) => {this.handleSubmit(e.target.files[0], 'file')}}
                    />
                    <input
                        type="file"
                        onChange={(e) => {this.handleSubmit(e.target.files[0], 'compare')}}
                    />
                </label>
                <br />
            </form>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));