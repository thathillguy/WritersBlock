import React from 'react';
import '../Styles/display.less';

export default class Display extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        let displayText = this.props.data.map((paragraph, id) => {
            if (paragraph.edited) {
                return <p key={id}> {paragraph.sentences.map((sen, kid) => {
                    let mark;
                    switch (sen.mark) {
                        case 'removed':
                            mark = <del key={kid} className="removed"> {sen.sentence} </del>;
                            break;
                        case 'added':
                            mark = <ins key={kid} className="added"> {sen.sentence} </ins>;
                            break;
                        case 'unedited':
                            mark = sen.sentence;
                            break;
                    }
                    return mark;
                })} </p>
            } else {
                return <p key={id}> {paragraph.text} </p>
            }
        });
        return(
            <div className="display">
                {displayText}
            </div>
        )
    }
}