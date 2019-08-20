import React, { Component } from 'react';

class MessageList extends Component {

  render() {
    const styles = {
              container: {
                overflowY: 'scroll',
                flex: 1,
              },
              ul: {
                listStyle: 'none',
              },
              li: {
                marginTop: 13,
                marginBottom: 13,
              },
              senderUsername: {
                fontWeight: 'bold',
              },
              message: { fontSize: 15 },
            }
    return (
      <div style={{
        ...this.props.style,
        ...styles.container,
      }}>
        <ul>
          
        {this.props.messages.map((message, index) => (
          <li key={index} style={styles.li}>
            <div>
              <h4 style={styles.senderUsername}>{message.senderId}</h4>
              <p style={styles.message}>{message.text}</p>
            </div>
          </li>
        ))}
        </ul>
        </div>
    )
  }
}

export default MessageList;