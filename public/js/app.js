const { BrowserRouter, Link, Switch, Route, browserHistory } = ReactRouterDOM;

class App extends React.Component {
  render() {
    return (
      // <React.Fragment>
      //   <h1>Hello World</h1>
      // </React.Fragment>
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/maindashboard">
              <Main />
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
