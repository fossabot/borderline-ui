/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline */

import React, { Component, PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import BorderlineScene from '../BorderlineScene';
import contentBoxStyles from './Content.css';
import errorIcon from './images/errorIcon.svg';

// Container delcaration
@borderline.stateAware('Content')
export default class Content extends Component {

    // Custom name for container
    static displayName = 'Content';

    // Types for available context
    static contextTypes = {
        model: T.string
    };

    constructor(props, context) {
        super(props, context);
        this.pages = [];
        this.contracted = true;
    }

    componentWillUpdate(next) {
        let state = next.state ? next.state[this.context.model] : null;
        this.pages = state ? state.toJS().pages || [] : [];
        this.contracted = state ? !state.toJS().expand : true;
    }

    render() {
        console.log('Content > render'); // eslint-disable-line no-console
        const { pathname = '' } = this.props;
        const Wrapper = borderline.components.wrapper;
        return (
            <div className={`${contentBoxStyles.stage} ${this.contracted ? contentBoxStyles.contract : ''}`}>
                <Wrapper relative>
                    {this.pages.map((component) => (
                        <Route path={`${pathname}/${component.particule}`} exact={true} component={() => (
                            <BorderlineScene model={component.origin}>
                                <ContentBoxMountingContainer component={component} />
                            </BorderlineScene>
                        )} key={`${component.particule}_${(Math.random() * 1e32).toString(36)}}`} />
                    ))}
                </Wrapper>
            </div>
        );
    }
}

class ContentBoxMountingContainer extends Component {

    componentDidMount() {
        this.renderView();
    }

    componentDidUpdate() {
        this.renderView();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.slot);
    }

    renderView() {
        try {
            let View = this.props.component.view;
            this.view = ReactDOM.render(<View />, this.slot);
        } catch (e) {
            if (process.env.NODE_ENV !== 'production')
                console.error(e); // eslint-disable-line no-console
            ReactDOM.render(<ContentBoxStaleContainer />, this.slot);
        }
    }

    render() {
        return (
            <div className={contentBoxStyles.box} ref={(slot) => { this.slot = slot; }} />
        );
    }
}

class ContentBoxStaleContainer extends Component {

    render() {
        const Icon = borderline.components.svg;
        return (
            <div className={`${contentBoxStyles.stale} ${contentBoxStyles.box}`} >
                <div className={contentBoxStyles.fab}>
                    <Icon src={errorIcon} />
                </div>
            </div>
        );
    }
}

