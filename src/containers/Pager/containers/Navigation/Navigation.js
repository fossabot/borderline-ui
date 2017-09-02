import React, { Component } from 'react';
import { default as T } from 'prop-types';
import { NavLink } from 'react-router-dom';
import Enclave from 'containers/Enclave';
import { stateAware } from 'utilities/storeManager';
import style from './style.css';

@stateAware(state => ({
    buttons: state.pages || []
}))
class Navigation extends Component {

    static contextTypes = {
        router: T.object
    }

    render() {
        const { buttons } = this.props;
        const panels = Object.keys(buttons).map(key => {
            const Component = buttons[key].icon;
            return <NavLink key={buttons[key].origin} to={`/${buttons[key].path}`} activeClassName={style.active} >
                <Enclave domain={'extensions'} modelName={buttons[key].origin} >
                    <Component />
                </Enclave>
            </NavLink>;
        });
        return (
            <div className={style.navigation}>
                {panels}
            </div>
        );
    }
}

export default Navigation;