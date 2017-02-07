import React from 'react'
import { Router as ReactRouter, Route, IndexRoute } from 'react-router'
import HomeContainer from 'containers/home'

export default function Router(history) {
    return (
        <ReactRouter history={history}>
            <Route path='/' component={HomeContainer}>
                <IndexRoute component={HomeContainer} />
            </Route>
        </ReactRouter>
    )
}
