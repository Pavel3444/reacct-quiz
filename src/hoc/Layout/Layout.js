import React from 'react';
import classes from './Layout.module.css';
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from '../../components/Navigation/Drawer/Drawer'
export default class Layout extends React.Component {
    state = {
        menu: false,
        links: [
            {name: 'Список', path: '/', exect: true},
            {name: 'Авторизация', path: '/auth', exect: false},
            {name: 'Создать тест', path: '/quiz-creator', exect: false},
            // {name: 'Quiz', path: '/quiz', exect: false},
            ]

    }


    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    menuCloseHandler = ()=> {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                    linkList={this.state.links}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}