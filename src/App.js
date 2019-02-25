import React, { Component } from "react";

import "./App.css";

class App extends Component {
  //this is where you set your initial state
  state = {
    name: "",
    lastName: "",
    info: []
  };

  // this is your event handler, this function uses the submit event
  // listener to call the function.
  // e.preventDefault prevents React from refreshing the page each time state
  // changes
  handleSubmit = e => {
    e.preventDefault();
    // declare a variable "data" and assign it to be set to a string
    // use the spread operator "..." to take in the all of the information from
    // the form and set it to state
    const data = JSON.stringify({ ...this.state });
    // this is how you would wet up a post request to your api
    fetch("http://localhost:4000", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
      //this will refresh the window once you hit submit
      .then(() => window.location.reload(true));
  };

  //see article on componentDidMount vs componentWillMount
  //https://medium.com/coffee-and-codes/componentdidmount-v-s-componnetwillmount-react-47f4f631276c
  //this will send a get request to the address in the fetch
  //it will then return the results and set the results to JSON
  //it will then take those results "data" and set them to state ==> info: data
  componentDidMount() {
    return fetch("http://localhost:4000")
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ info: data });
      });
  }

  render() {
    // this is one way to map the data, it goes in the render
    // it maps the info and sets it to a varialbe "myList"
    const myList = this.state.info.map(person => {
      return (
        <div>
          <h5>{person.name}</h5>
        </div>
      );
    });
    //this will show you state and see the data put into "info"
    //you can remove the console log, this is just to see the state initially
    console.log("info:", this.state.info);
    return (
      <div className="App">
        <h1>hello from react</h1>

        {/* This is the form with that will trigger the submit event listenter */}
        {/* This form is taken directly from bootstrap */}
        <form onSubmit={this.handleSubmit}>
          <div classname="form-group">
            <label htmlFor="exampleInput">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInput"
              placeholder="Enter Name"
              // the onchange uses an event listener to set state "name" and uses
              // e.target.value to take the input from the form and set that to state
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>

          <button type="submit" classname="btn btn-primary">
            Submit
          </button>

          <div>
            {/* within {} we can call our map function to display our data that has been mapped */}
            <h3>{myList}</h3>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
