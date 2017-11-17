import React, { Component } from "react";
import "./App.css";

const ENDPOINT = "https://en.wikipedia.org/w/api.php?";
const FORMAT = "&format=json";
const ORIGIN = "&origin=*";
const ACTION = "&action=opensearch&search=";
const WORD = "gundam";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      description: "",
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setData = this.setData.bind(this);
  }

  setData(data) {
    this.setState({
      link: data[3],
      description: data[2]
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    fetch(`${ENDPOINT}${ORIGIN}${FORMAT}${ACTION}${WORD}`)
      .then(res => res.json())
      .then(data => this.setData(data));
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
