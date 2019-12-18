class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      image: "",
      email: "",
      users: []
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    fetch("/users", {
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        image: this.state.image,
        email: this.state.email
      }),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(createdUser => {
        return createdUser.json();
      })
      .then(jsonedUser => {
        this.setState({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          image: "",
          email: "",
          users: [jsonedUser, ...this.state.users]
        });
        console.log(jsonedUser);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <React.Fragment>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          {/* <label for="firstName">First Name:</label>
          <input type="text" onChange={this.handleChange} name="firstName" />
          <br />
          <label for="lastName">Last Name:</label>
          <input type="text" onChange={this.handleChange} name="lastName" />
          <br />
          <label for="email">Email:</label>
          <input type="email" onChange={this.handleChange} name="email" />
          <br />
          <label for="username">Username:</label>
          <input type="text" onChange={this.handleChange} name="username" />
          <br />
          <label for="password">Password:</label>
          <input type="password" onChange={this.handleChange} name="password" />
          <br />

          <input type="submit" value="Sign Up!" /> */}
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              class="form-control"
              name="firstName"
              // aria-describedby="emailHelp"
              placeholder="First Name"
              onChange={this.handleChange}
            />
            <label for="lastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              // aria-describedby="emailHelp"
              placeholder="Last Name"
              onChange={this.handleChange}
            />
            <label for="email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              // aria-describedby="emailHelp"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              name="username"
              // aria-describedby="emailHelp"
              placeholder="Username"
              onChange={this.handleChange}
            />
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              // aria-describedby="emailHelp"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onclick="location.href='/'"
          >
            Sign Up!
          </button>
        </form>
      </React.Fragment>
    );
  }
}
