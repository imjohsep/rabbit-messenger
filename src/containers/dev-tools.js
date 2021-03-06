import React from 'react'
import {createDevTools} from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import config from 'config'

export default createDevTools(
    <DockMonitor
        toggleVisibilityKey='ctrl-h' 
        defaultPosition='right'
        changePositionKey='ctrl-p'
        defaultIsVisible={config.showDevTools}
    >
        <LogMonitor />
    </DockMonitor>
)
