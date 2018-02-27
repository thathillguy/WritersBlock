import Works from '../Components/Works'
import 'whatwg-fetch';
import React from 'react';

export default class WorksView extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    handleClick(){

    }
    render(){
        let storiesDisplay;
        if (this.props.stories[0]) {
            storiesDisplay = this.props.stories.map((story, id) => {
                return <Works key={id} title={story}/>
            });
        } else {
            storiesDisplay = <h3> You have no stories uploaded yet! </h3>
        }
        return (
            <div>
                {storiesDisplay}
                <input type="button" onClick={this.props.uploadStory.bind(this)}/>
            </div>
        )
    }
}