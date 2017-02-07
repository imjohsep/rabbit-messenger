import React, {Component, PropTypes} from 'react'
import styles from './styles.scss'

import { Jumbotron, Button } from 'react-bootstrap'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render () {
        return (
            <Jumbotron className={styles.flex_center}>
                <h1>Boilerplate</h1>
                <Button bsStyle="success" bsSize="large">Get Started</Button>
            </Jumbotron>
        )
    }
}

Home.PropTypes = {}
