import React from "react";
import axios from "axios";
class Form extends React.Component {
  state = {
    value: ""
  };
  onSubmit = async event => {
    event.preventDefault();
    const url = `http://localhost:4000/${this.props.resource}`;
    try {
      const data = { [this.props.field]: this.state.value };

      if (this.props.resource === "message") {
        data.channelId = this.props.channelId;
      }

      const response = await axios.post(url, data);
      this.clear();
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
    const placeholder = `new ${this.props.resource}`;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder={placeholder}
            onChange={this.onChange}
            value={this.state.value}
          />
          <button>Submit</button>
          <button onClick={this.clear}>Clear</button>
        </form>
      </div>
    );
  }
}

export default Form;
