import React, {Component} from 'react'
import styles from './styles.scss'
import Messenger from 'components/messenger'
import { Jumbotron } from 'react-bootstrap'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render () {
        return (
            <Jumbotron className={styles.flex_center}>
                <h1>Rabbit Messenger</h1>
                <Messenger />
            </Jumbotron>
        )
    }
}
