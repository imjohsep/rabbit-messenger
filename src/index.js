import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import Router from 'routes'
import store from 'reducers'
import { browserHistory } from 'react-router'

// @see https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const history = syncHistoryWithStore(browserHistory, store)

render((
    <Provider store={store}>
        <div>
            { Router(history) }
        </div>
    </Provider>
), document.getElementById('main'))
