import React from 'react';

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  handleChange = event => {
    this.setState({ text: event.target.value })
    if (this.props.onChange) {
          this.props.onChange()
        }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' })
  }


  render() {
    const styles = {
             container: {
               padding: 20,
               borderTop: '1px #4C758F solid',
               marginBottom: 20,
             },
             form: {
               display: 'flex',
             },
             input: {
               color: 'inherit',
               background: 'none',
               outline: 'none',
               border: 'none',
               flex: 1,
               fontSize: 16,
             },
           }
    return (
      <div style={styles.container}>
        <div>
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <input
              type="text"
              id="text"
              name="text"
              placeholder="Type What?"
              value={this.state.text}
              onChange={this.handleChange}
              style={styles.input}
            />
            <input type="submit" />
            </form>
          </div>
      </div>
    )
  }
}

export default SendMessageForm;