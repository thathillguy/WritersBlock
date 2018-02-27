import React from 'react';
import Display from '../Components/Display'
import JSZip from 'jszip';
import fs from 'fs';

export default class VersionView extends React.Component {
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
        let filepars = [];
        let compars = [];
        //if in file but not compare, it was deleted from file
        //if in both, it was unedited
        //if in compare but not in file it was added.

        //assume added. if in both, make it null.
        console.log(this.state['file']);
        if (this.state['file'] && this.state['compare']) {
            filepars = Array.from(this.state['file'].getElementsByTagName('body')[0].getElementsByTagName('p')).map((par) => {
                return {sentences: par.textContent.split(/\./).map((sen)=>{
                    return {sentence: sen,
                        mark: 'removed'}
                }), id:par.getAttribute('w14:paraId'),
                    edited: true,text:par.textContent }
            });
            compars = Array.from(this.state['compare'].getElementsByTagName('body')[0].getElementsByTagName('p')).map((par) => {
                return {sentences: par.textContent.split(/\./).map((sen)=>{
                    return {sentence: sen,
                        mark: 'added'}
                }), id:par.getAttribute('w14:paraId'),
                    edited: true,
                    text:par.textContent }
            });
            filepars.forEach((fpar) => {
                compars.forEach((cpar) => {
                    if (fpar.text === cpar.text){
                        fpar.edited = false;
                        cpar.edited = false;
                    } else {
                        fpar.sentences = fpar.sentences.map((sen) => {
                            return {sentence: sen.sentence,
                                mark: cpar.text.includes(sen.sentence) ? 'unedited' : sen.mark}
                        });
                        cpar.sentences =cpar.sentences.map((sen) => {
                            return {sentence: sen.sentence,
                                mark: fpar.text.includes(sen.sentence) ? 'unedited' : sen.mark}
                        });
                    }
                });
            });
        }
        return (
            <div>
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
                <Display data={filepars} />
                <Display data={compars} />
            </div>
        );
    }
}