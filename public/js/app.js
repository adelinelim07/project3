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
            <li>
              <Link to="/tripdetails">Trip Details</Link>
            </li>
            <li>
              <Link to="/itinerary">Itinerary</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/">
              {this.state.currentUser ? (
                <Redirect to={"/maindashboard/" + this.state.currentUser._id} />
              ) : (
                <Login userState={this.userState} />
              )}
            </Route>
            <Route path="/maindashboard">
              <MainTrip currentUserId={this.state.currentUser._id} />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/tripdetails">
              <Trip />
            </Route>
            <Route path="/itinerary">
              <Itinerary />
            </Route>
          </Switch>
        </div>

        {/* <Trip/> */}
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
