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

  logout = () => {
    console.log("logging out")
    this.setState({
      currentUser: ""
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              {this.state.currentUser ? (
                <Redirect to={"/maindashboard/" + this.state.currentUser._id} />
              ) : (
                <Login userState={this.userState} />
              )}
            </Route>
            <Route path="/maindashboard">
              <MainTrip
                currentUserId={this.state.currentUser._id}
                logout={this.logout}
              />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
