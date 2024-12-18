import './App.css';
import React, { Component } from 'react'
import NavBar from './NavBar';
import Body from './Body';
import Footer from './Footer';

export default class App extends Component {
 
  constructor(props) {
    super(props);
    console.log("I am constructor from navbar");
    this.state = {
        mode : 'white',
    };
}

toggleMode = () => {
    console.log("toggle mode");
    this.setState(
        (prevState) => ({
            mode: prevState.mode === 'white' ? 'dark' : 'white',
        }),
        () => {
            console.log(this.state.mode); // This will run after state is updated
            document.body.style.backgroundColor = this.state.mode === 'dark' ? '#040e1c' : '#F0F0F0';
            document.body.style.color = this.state.mode === 'dark' ? 'white' : 'black';
        }
    );
};

  render() {
    
    return (
      <div>
        <NavBar toggleMode={this.toggleMode} mode={this.state.mode} />
        <Body mode={this.state.mode} />
        <Footer mode={this.state.mode} /> 
      </div>
    )
  }
}
