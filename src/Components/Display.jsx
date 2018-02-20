import React from 'react';
import '../Styles/display.less';

export default class Display extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        console.log(this.props.data);
        let displayText = this.props.data.map((paragraph) => {
            if (paragraph.edited) {
                return <p> {paragraph.sentences.map((sen) => {
                    let mark;
                    switch (sen.mark) {
                        case 'removed':
                            mark = <del className="removed"> {sen.sentence} </del>;
                            break;
                        case 'added':
                            mark = <ins className="added"> {sen.sentence} </ins>;
                            break;
                        case 'unedited':
                            mark = sen.sentence;
                            break;
                    }
                    return mark;
                })} </p>
            } else {
                return <p> {paragraph.text} </p>
            }
        });
        return(
            <div className="display">
                {displayText}
            </div>
        )
    }
}