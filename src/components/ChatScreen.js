import React, { Component } from 'react';
import ChatKit from '@pusher/chatkit-client';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import TypingIndicator from './TypingIndicator'
import WhosOnlineList from './WhosOnlineList'
require("dotenv").config();

class ChatScreen extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
    }
    this.sendMessage = this.sendMessage.bind(this)
    // this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }

  // sendTypingEvent() {
  //   this.state.currentUser
  //     .isTypingIn(this.state.currentRoom.id)
  //     .catch(error => console.error('error', error))
  // }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    })
  }

  componentDidMount() {
    const chatManager = new ChatKit.ChatManager({
      instanceLocator: process.env.REACT_APP_CHATKIT_LOCATOR,
      userId: this.props.currentUsername,
      tokenProvider: new ChatKit.TokenProvider({
        url: 'http://localhost:3001/authenticate'
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
        return currentUser.subscribeToRoom({
          roomId: "28c533d3-9aff-4c3e-aaff-b3c53e158fe1",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
              console.log(message)
            },
            // userStartedTyping: user => {
            //   console.log(user.name, 'started typing')
            //   this.setState({
            //     usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
            //   })
            // },
          //   userStoppedTyping: user => {
          //     console.log(user.name, 'stopped typing')
          //     this.setState({
          //       usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
          //         username => username !== user.name
          //       ),
          //     })
          //   },
          //   onPresenceChange: () => this.forceUpdate(),
          },
        })
      })
      .then(currentRoom => {
        console.log("currentRoom", currentRoom)
        this.setState({ currentRoom })
      })
      .catch(error => console.error('error', error))
  }


  render() {
    const styles = {
      container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
      },
      whosOnlineListContainer: {
        width: '300px',
        flex: 'none',
        padding: 20,
        backgroundColor: '#2c303b',
        color: 'white',
      },
      chatListContainer: {
        padding: 20,
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
      },
    }
    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <MessageList
              messages={this.state.messages}
              style={styles.chatList}
            />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </section>
        </div>
      </div>
    )
  }
}

export default ChatScreen;