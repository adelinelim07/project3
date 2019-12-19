const { BrowserRouter, Link, Switch, Route, browserHistory } = ReactRouterDOM;

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: this.props.trip,
      tripTitle: this.props.tripTitle,
      ideaCards: []
    };
  }

  dataRefresh = () => {
    fetch("/ideaCard")
      .then(response => response.json())
      .then(ideaCards => {
        this.setState({ ideaCards: ideaCards });
      });
    console.log("Data Refreshed");
  };

  incrementLikes = ideaCard => {
    fetch("ideaCard/" + ideaCard._id, {
      body: JSON.stringify({
        title: ideaCard.title,
        description: ideaCard.description,
        location: ideaCard.location,
        image: ideaCard.image,
        url: ideaCard.url,
        comments: ideaCard.comments,
        contact: ideaCard.contact,
        category: ideaCard.category,
        likeClicks: ideaCard.likeClicks + 1
      }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => this.dataRefresh())
      .catch(error => {
        console.log(error);
      });
  };

  addComments = (ideaCard, newComment) => {
    console.log(newComment);
    console.log(ideaCard);
    fetch("ideaCard/" + ideaCard._id, {
      body: JSON.stringify({
        title: ideaCard.title,
        description: ideaCard.description,
        location: ideaCard.location,
        image: ideaCard.image,
        url: ideaCard.url,
        comments: [...ideaCard.comments, newComment],
        contact: ideaCard.contact,
        category: ideaCard.category
      }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => this.dataRefresh())
      .catch(error => {
        console.log(error);
      });
  };

  deleteIdeaCard = (id, index) => {
    fetch("ideaCard/" + id, {
      method: "DELETE"
    })
      .then(data => {
        this.setState({
          ideaCards: [
            ...this.state.ideaCards.slice(0, index),
            ...this.state.ideaCards.slice(index + 1)
          ]
        });
      })
      .then(responseJson => this.dataRefresh());
  };
  
  componentDidMount = () => {
    this.dataRefresh();
  };

  render() {
    return (
      <BrowserRouter>
        <head>
          <link rel="stylesheet" type="text/css" href="../../css/navbar.css" />
        </head>
        <div class="container">
          <div class="row">
            <div class="col-8">
              <h1>{this.state.tripTitle}</h1>
            </div>
            <div class="col-md-auto">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                onClick={() => this.props.toggleView()}
              >
                Return to trips dashboard
              </button>
            </div>
          </div>
        </div>
        <div id="cssmenu">
          <ul>
            <li>
              <a class="text-center">
                <Link to="/collaborators">
                  <i class="material-icons">people</i>
                  <br></br>
                  Collaborators
                </Link>
              </a>
            </li>
            <li>
              <a class="text-center">
                <Link to="/accommodation">
                  <i class="material-icons">hotel</i>
                  <br></br>
                  Accommodation
                </Link>
              </a>
            </li>
            <li>
              <a class="text-center">
                <Link to="/transport">
                  <i class="material-icons">directions_bus</i>
                  <br></br>
                  Transport
                </Link>
              </a>
            </li>
            <li>
              <a class="text-center">
                <Link to="/placesOfInterest">
                  <i class="material-icons">beenhere</i>
                  <br></br>
                  <span></span>Places Of Interest
                </Link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <Link to="/itinerary">
                  <i class="material-icons">map</i>
                  <br></br>
                  <span></span>Itinerary
                </Link>
              </a>
            </li>
          </ul>
          </div>
          <Switch>
            <Route exact path="/collaborators">
              <Collaborators />
            </Route>
            <Route exact path="/accommodation">
              <Accommodation
                title={this.state.title}
                description={this.state.description}
                location={this.state.location}
                image={this.state.image}
                url={this.state.url}
                comments={this.state.comments}
                contact={this.state.contact}
                category={this.state.category}
                trip={this.state.trip}
                ideaCards={this.state.ideaCards}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                addComments={this.addComments}
                deleteIdeaCard={this.deleteIdeaCard}
                incrementLikes={this.incrementLikes}
                dataRefresh={this.dataRefresh}
              />
            </Route>
            <Route path="/transport">
              <Transport
                title={this.state.title}
                description={this.state.description}
                location={this.state.location}
                image={this.state.image}
                url={this.state.url}
                comments={this.state.comments}
                contact={this.state.contact}
                category={this.state.category}
                trip={this.state.trip}
                ideaCards={this.state.ideaCards}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                addComments={this.addComments}
                deleteIdeaCard={this.deleteIdeaCard}
                incrementLikes={this.incrementLikes}
                dataRefresh={this.dataRefresh}
              />
            </Route>
            <Route path="/placesOfInterest">
              <PlacesOfInterest
                title={this.state.title}
                description={this.state.description}
                location={this.state.location}
                image={this.state.image}
                url={this.state.url}
                comments={this.state.comments}
                contact={this.state.contact}
                category={this.state.category}
                trip={this.state.trip}
                ideaCards={this.state.ideaCards}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                addComments={this.addComments}
                deleteIdeaCard={this.deleteIdeaCard}
                incrementLikes={this.incrementLikes}
                dataRefresh={this.dataRefresh}
              />
            </Route>
            <Route exact path="/itinerary">
              <Itinerary _id={this.state.trip} />
            </Route>
          </Switch>
      </BrowserRouter>
    );
  }
}