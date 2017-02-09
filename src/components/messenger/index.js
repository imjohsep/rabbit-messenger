import React, {Component} from 'react'
import styles from './styles.scss'
import SocketIOClient from 'socket.io-client'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

import MessageHistory from 'components/messageHistory'

export default class Messenger extends Component {
    constructor(props) {
        super(props)
        this.socket = SocketIOClient('http://localhost:3000')
        
        this.sendMessage = this.sendMessage.bind(this)
        
        this.socket.on('serverMessage', (msg) => {
            let messages = this.state.messages
            messages.push(msg)
            this.setState({ messages: messages})
        })

        this.handleChange = this.handleChange.bind(this)
        this.joinRoom = this.joinRoom.bind(this)

        this.state = {
            room: '',
            message: '',
            messages: [],
            userId: '',
            visible: styles.visible
        }
    }

    componentWillMount() {
        this.determineUser()
    }

    joinRoom(e) {
        e.preventDefault()
        let { room } = this.state
        this.socket.emit('create', room)
        this.setState({
            visible: styles.hidden,
            room
        })
    }

    sendMessage(e) {
        e.preventDefault()
        let createAt = (new Date).getTime()
        let msg = {
            text: this.state.message,
            createdAt: createAt,
            userId: this.state.userId,
            chatId: '',
            room: this.state.room
        }

        this.socket.emit('clientMessage', msg)
        this.refs.form.reset()
    }

    determineUser() {
         let userId = localStorage.getItem('userId')
         if (!userId) {
             this.socket.emit('need-id')
             this.socket.on('here-is-your-id', (userId) => {
                 this.setState({userId})
                 localStorage.setItem('userId', userId)
             })
         } else {
             this.setState({userId})
         }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render () {
        return (
            <div>
                <form className={ this.state.visible } onSubmit={ this.joinRoom } ref="form">
                    <FormGroup className={styles.chat_client}>
                        <FormControl
                            type="text"
                            name="room"
                            placeholder="Enter room name"
                            onChange={ this.handleChange }
                            className={styles.chat_entry}
                            autoComplete="off"
                        />
                            <Button type="submit" bsStyle="success">
                                Join Room
                            </Button>
                    </FormGroup>
                </form>

                <form onSubmit={ this.sendMessage } ref="form">
                    <FormGroup className={styles.chat_client}>
                        <FormControl
                            type="text"
                            name="message"
                            placeholder="Enter text"
                            onChange={ this.handleChange }
                            className={styles.chat_entry}
                            autoComplete="off"
                        />
                            <Button type="submit" bsStyle="success">
                                Send
                            </Button>
                    </FormGroup>
                </form>
                <MessageHistory messages={this.state.messages} />
            </div>
        )
    }
}
