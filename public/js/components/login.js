class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/login-style.css"
          />
        </head>

        <h1>TRAVEL LAH!</h1>
        <p>
          A platform for travel khakis <br></br>to plan trips together :)
        </p>
        <button class="enterButton" onClick={() => this.props.toggleView()}>
          ENTER
        </button>
      </React.Fragment>
    );
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      currentUser: "",
      loginView: false,
      mainPageView: true,
      message: ""
    };
  }

  toggleView = () => {
    console.log("toggling view");
    this.setState({
      loginView: !this.state.loginView,
      mainPageView: !this.state.mainPageView
    });
  };

  // HandleChange & handleSubmit
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("/sessions", {
      body: JSON.stringify(this.state),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(loggedInUser => {
        return loggedInUser.json();
      })
      .then(jsonedUser => {
        if (jsonedUser.message === null) {
          this.setState({
            message: "User cannot be found"
          });
        } else if (jsonedUser.message === false) {
          this.setState({
            message: "Wrong Password"
          });
        } else {
          console.log(jsonedUser);
          this.setState({
            currentUser: jsonedUser
          });
          console.log("Current User is:", this.state.currentUser);
        }
      })
      .then(() => {
        this.props.userState(this.state.currentUser);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <React.Fragment>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/login-style.css"
          />
        </head>

        {this.state.mainPageView && <Home toggleView={this.toggleView} />}

        {this.state.loginView && (
          <div id="loginBox" class="text-center">
            <h2>TRAVEL LAH!</h2>
            <p>Welcome to Travel Lah!</p>
            <form class="form-signin" onSubmit={this.handleSubmit}>
              <label for="inputEmail" class="sr-only">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                class="form-control"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                required
                autofocus
              />
              <label for="inputPassword" class="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="form-control"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />

              <p style={{ color: "red" }}>{this.state.message}</p>
              <button id="loginButton" type="submit">
                Log In
              </button>
              <br />
              <p>Don't have an account yet?</p>
              <Link to="/signup">
                <a id="signup">Create an account</a>
              </Link>
              <p class="mt-5 mb-3 text-muted">Travel Lah! &copy; 2019</p>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}
