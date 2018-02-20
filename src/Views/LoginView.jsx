import React from 'react';

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <input type="text" />
                <input type="password" />
                <input type="button" />
            </div>
        );
    }
}