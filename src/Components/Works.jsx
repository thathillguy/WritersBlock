import React from 'react';
import '../Styles/works.less';

export default class Works extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div className="works">
                <h3>{this.props.title}</h3>
            </div>
        )
    }
}