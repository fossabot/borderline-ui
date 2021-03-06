import { Component } from 'react';
import { default as T } from 'prop-types';
import browserBehaviour from 'utilities/browserBehaviour';
import './style.css';

export default class Body extends Component {

    // Custom name for container
    static displayName = 'Body';

    // Typechecking for container's props
    static propTypes = {
        children: T.oneOfType([T.array, T.element])
    };

    componentWillMount() {
        browserBehaviour.apply();
    }

    render() {
        const { children } = this.props;
        return children ? children : null;
    }
}
