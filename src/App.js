import React, { Component } from "react";
import "./App.css";

const ENDPOINT = "https://en.wikipedia.org/w/api.php?";
const FORMAT = "&format=json";
const ORIGIN = "&origin=*";
const ACTION = "&action=opensearch&search=";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: "",
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setData = this.setData.bind(this);
  }

  setData(data) {
    const articles = [];
    data.error
      ? articles.push({
          title: data.error.code,
          description: "Please enter a search term",
          url: "",
          id: "error"
        })
      : data[1].forEach((ele, index) => {
          articles.push(
            Object.assign(
              { title: "", description: "", url: "", id: "" },
              {
                title: ele,
                description: data[2][index],
                url: data[3][index],
                id: index.toString()
              }
            )
          );
        });

    this.setState({
      articles
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    fetch(`${ENDPOINT}${ORIGIN}${FORMAT}${ACTION}${this.state.value}`)
      .then(res => res.json())
      .then(data => this.setData(data));
    event.preventDefault();
  }

  render() {
    const { articles } = this.state;
    return (
      <div>
        <header>
          <h1>Wikipedia Viewer</h1>
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
        </header>
        {!articles
          ? null
          : articles.map(ele => (
              <article key={ele.id}>
                <header>
                  <h2>{ele.title}</h2>
                </header>
                <section>
                  <p>{ele.description}</p>
                </section>
                <footer>
                  <a href={ele.url}>Wikipedia page</a>
                </footer>
              </article>
            ))}
      </div>
    );
  }
}

export default App;
