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
              <Link to="/itinerary">Itinerary</Link>
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
