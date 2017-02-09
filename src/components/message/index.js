import React, {Component, PropTypes} from 'react'
import './styles.scss'

export default class Message extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                {this.props.author}: {this.props.text}
            </div>
        )
    }
}

Message.propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
}
