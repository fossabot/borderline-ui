import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import BorderlineProvider from './BorderlineProvider';
import storeManager from './utilities/StoreManager';

export default class BorderlineBootstrap {

    constructor() {
        this.startBorderline();
    }

    startBorderline = () => {

        // We fetch the anchor of our app the the HTML template
        const root = document.getElementById('root');

        // We render the application
        ReactDOM.render(
            <AppContainer>
                <BorderlineProvider store={storeManager.getStore()} />
            </AppContainer>,
            root
        );

        if (module.hot) {
            module.hot.accept('./BorderlineProvider', () => {

                // Upon hot reload we fetch a new instance of the application and render it
                var HotBorderlineProvider = require('./BorderlineProvider').default;
                ReactDOM.render(
                    <AppContainer>
                        <HotBorderlineProvider store={storeManager.getStore()} />
                    </AppContainer>,
                    root
                );
            });
        }
    }
}
