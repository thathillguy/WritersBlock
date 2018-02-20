import Works from '../Components/Works'
import React from 'react';

export default class WorksView extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <Works title="Sky Story" />
        )
    }
}