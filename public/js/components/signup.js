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
      users: [],
      redirect: false
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
      .then(() => {
        // to toggle to true to redirect
        this.setState({
          redirect: true
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/signup.css" />
        </head>
        <div>
          <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <header class="masthead mb-auto">
              <div class="inner">
                <h3 class="masthead-brand">TRAVEL LAH!</h3>
                <nav class="nav nav-masthead justify-content-center">
                  <Link class="nav-link active" to="/">
                    <a>BACK TO HOME</a>
                  </Link>
                </nav>
              </div>
            </header>
          </div>
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group col-md-4">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="firstName"
                  // aria-describedby="emailHelp"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="lastName"
                  // aria-describedby="emailHelp"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  // aria-describedby="emailHelp"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  // aria-describedby="emailHelp"
                  placeholder="Username"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  // aria-describedby="emailHelp"
                  placeholder="Password"
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style={{ marginLeft: 14 }}
            >
              Sign Up!
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
