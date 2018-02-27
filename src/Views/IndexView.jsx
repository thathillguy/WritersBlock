import { connect } from 'react-redux'
import React from "react";
import LoginView from './LoginView';
import WorksView from './WorksView';

import {successful_login, upload_story} from "../Actions/loginActions";

class Index extends React.Component {
    render(){
        let display;
        switch(this.props.view){
            case "worksview":
                display = <WorksView stories={this.props.stories} />;
                break;
            default:
                display = <LoginView onLogin={this.props.onLogin}/>;
                break;
        }
        return(
            display
        )
    }
};

const mapStateToProps = state => {
    console.log(state.stories);
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (success, stories) => {
            if (success) {
                dispatch(successful_login(stories));
            }
        },
        uploadStory(){
            dispatch(upload_story(stories));
        }
    }
};

const IndexView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

export default IndexView;