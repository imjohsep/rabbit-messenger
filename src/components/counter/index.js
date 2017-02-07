import React, {Component, PropTypes} from 'react'
import styles from './styles.scss'

export default class Counter extends Component {

    constructor(props) {
        super(props)
        this.state = {timer: null}
        this.tick = this.tick.bind(this)
    }

    componentWillMount() {
        const timer = setInterval(this.tick, 2000)
        this.setState({timer})
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
        this.setState({timer: null})
    }

    tick() {
        this.props.onUpdate()
    }

    render() {
        return (
            <p>
                count: 
                <span className={styles.counter}>{this.props.count}</span>
            </p>
        )
    }
}

Counter.propTypes = {
    count: PropTypes.number,
    onUpdate: PropTypes.func.isRequired
}

Counter.defaultProps = {
    count: 0
}
