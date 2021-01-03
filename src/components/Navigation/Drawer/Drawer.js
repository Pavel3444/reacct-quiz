import classes from './Drawer.module.css';
import React from 'react';
import BackDrop from "../../UI/BackDrop/BackDrop";

const links = [1, 2, 3];

export default class Driver extends React.Component {
    constructor(props) {
        super(props);

    }


    renderLinks = ()=> {
    return links.map((link,index)=>{
        return(
            <li key={index}>
                <a > Link {link}</a>
               </li>
        )
    })
    }

    render() {
        const cls = [classes.Drawer];
        if(!this.props.isOpen){
            cls.push(classes.close)
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose}/> : null}
            </React.Fragment>

        )
    }

}
