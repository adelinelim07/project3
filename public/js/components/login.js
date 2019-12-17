class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      currentUser: "",
      message: ""
    };
  }

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

        <div class="text-center">
          <img class="mb-4" alt="" width="50%" height="50%" />
          <h1 class="h3 mb-3 font-weight-normal">Login Page</h1>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
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
                <p>{this.state.message}</p>
                <button class="btn btn-lg btn-danger btn-block" type="submit">
                  Sign in
                </button>
                <p class="mt-5 mb-3 text-muted">Travel Organiser &copy; 2019</p>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
