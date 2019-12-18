const {
  BrowserRouter,
  Link,
  Switch,
  Route,
  browserHistory,
  Redirect
} = ReactRouterDOM;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ""
    };
  }
  userState = user => {
    this.setState(
      {
        currentUser: user
      },
      () => {
        console.log("user logged in");
      }
    );
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/maindashboard">Dashboard</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/">
              {this.state.currentUser ? (
                <Redirect to="/maindashboard" />
              ) : (
                <Login userState={this.userState} />
              )}
            </Route>
            <Route path="/maindashboard">
              <MainTrip />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div>

        {/* <Trip/> */}
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
