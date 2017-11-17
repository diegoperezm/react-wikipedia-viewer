import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Search ..."
          />
          <input type="submit" value="submit" />
          <a href="https://en.wikipedia.org/wiki/Special:Random">Random</a>
        </form>
        <article>
          <a href="">https://en.wikipedia.org/wiki/Gundam_model</a>
          <p>
            Gundam models are model kits depicting the vehicles and characters
            of the fictional Gundam universe by Bandai.
          </p>
        </article>
      </div>
    );
  }
}

export default App;
