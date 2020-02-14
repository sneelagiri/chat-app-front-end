import React from "react";
import "./App.css";
import axios from "axios";
class App extends React.Component {
  state = {
    messages: [],
    value: ""
  };

  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      // console.log("event test", event);
      const { data } = event;
      // console.log("data test", data);
      const action = JSON.parse(data);
      // console.log("parse test", parsed);
      const { type, payload } = action;

      if (type === "MESSAGE") {
        const messages = [...this.state.messages, payload];
        this.setState({ messages: messages });
      } else if (type === "MESSAGES") {
        const messages = payload;
        this.setState({ messages: messages });
      } else {
        this.setState({ messages: this.state.messages });
      }
    };
  }

  onSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/message", {
        text: this.state.value
      });
    } catch (error) {
      console.log(error);
    }
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  clear = () => {
    this.setState({ value: "" });
  };

  render() {
    const paragraphs = this.state.messages.map(message => {
      return <p key={message.id}>{message.text}</p>;
    });

    return (
      <div>
        <h1>WhatsChat</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.value}
          />
          <button>Submit</button>
          <button onClick={this.clear}>Clear</button>
        </form>
        {paragraphs}
      </div>
    );
  }
}

export default App;
