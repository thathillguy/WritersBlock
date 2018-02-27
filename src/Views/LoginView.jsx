import 'whatwg-fetch';
import React from 'react';
import '../Styles/login';
export default class WorksView extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    handleClick(){
        let self = this;
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.refs.username.value,
                password: this.refs.password.value,
            })
        })
            .then(function(response) {
                return response.text()
            }).then(function(body) {
                console.log(body);
                let response = JSON.parse(body);
                self.props.onLogin(response.success, response.works);
        })
    }
    render(){
        return (
            <div>
                <div className="LoginForm">
                    <input type="text" ref="username" placeholder="Username"/> <br />
                    <input type="password" ref="password" placeholder="Password"/> <br />
                    <input value="Login" type="button" onClick={this.handleClick.bind(this)}/>
                </div>
            </div>

        )
    }
}