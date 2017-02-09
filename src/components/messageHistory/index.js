import React, {Component, PropTypes} from 'react'
import './styles.scss'

import Message from 'components/message'

export default class MessageHistory extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        let { messages } = this.props
        
        let history = messages.map((msg, i) => {
            return ( 
                <Message key={i} text={msg.text} author={msg.userId}/> 
            )
        })

        return (
            <div>
                {history}
            </div>
        )
    }
}

MessageHistory.propTypes = {
    messages: PropTypes.array.isRequired
}
