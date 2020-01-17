import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./index.css";

// const testData = [
//   {
//     name: "Dan Abramov",
//     avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
//     company: "@facebook"
//   },
//   {
//     name: "Sophie Alpert",
//     avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
//     company: "Humu"
//   },
//   {
//     name: "Sebastian Markbåge",
//     avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
//     company: "Facebook"
//   }
// ];

class CardList extends React.Component {
  render() {
    return (
      <div>
        {this.props.profiles.map(profile => (
          <Card key={profile.id} {...profile} />
        ))}
      </div>
    );
  }
}
class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className='github-profile'>
        <img src={profile.avatar_url} />
        <div className='info'>
          <div className='name'>{profile.name}</div>
          <div className='company'>{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  // userNameInput = React.createRef();
  state = {
    userName: ""
  };
  handleSubmit = async event => {
    // alert(this.userNameInput.current.value);
    // alert(this.state.userName);
    event.preventDefault(); // To avoid page refresh on submit
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    // const resp = await fetch(
    //   `https://api.github.com/users/${this.state.userName}`
    // );

    this.props.onSubmit(resp.data);
    this.setState({ userName: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='GitHub username'
          // ref={this.userNameInput}
          // Lets do it the React way below
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     profiles: testData
  //   };
  // }
  // In new Javascript coming soon, all of the above can be shortened
  // into below. Class field object.
  state = {
    profiles: []
  };
  addNewProfile = profileData => {
    this.setState(previousState => ({
      profiles: [...previousState.profiles, profileData]
    }));
  };
  render() {
    return (
      <div>
        <div className='header'>{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
