const { BrowserRouter, Link, Switch, Route, browserHistory } = ReactRouterDOM;

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      location: "",
      image: "",
      url: "",
      comments: [""],
      contact: 123456,
      category: "",
      likeClicks: 0,
      // trip: { type: Schema.Types.ObjectId, ref:"TripCards" },
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

  incrementLikes=(ideaCard)=> {
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
        likeClicks: ideaCard.likeClicks +1
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
    }).then(data => {
      this.setState({
        ideaCards: [
          ...this.state.ideaCards.slice(0, index),
          ...this.state.ideaCards.slice(index + 1)
        ]
      });
    });
  };

  componentDidMount = () => {
    this.dataRefresh();
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("/ideaCard", {
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        location: this.state.location,
        image: this.state.image,
        url: this.state.url,
        comments: this.state.comments,
        contact: this.state.contact,
        category: this.state.category,
        likeClicks: 0,
      }),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(createdIdeaCard => {
        console.log(createdIdeaCard);
        return createdIdeaCard.json();
      })
      .then(jsonedIdeaCard => {
        console.log(jsonedIdeaCard);
        // reset the form
        this.setState({
          title: "",
          description: "",
          location: "",
          image: "",
          url: "",
          comments: [""],
          contact: 123456,
          category: "",
          // trip: { type: Schema.Types.ObjectId, ref:"TripCards" },
          ideaCards: [jsonedIdeaCard, ...this.state.ideaCards]
        });
        console.log(this.state);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <BrowserRouter>
        <div id="navBar">
          <ul class="nav nav-tabs">
            <li class="nav-item active">
              <a class="nav-link">
                <Link to="/collaborators">
                  <i class="material-icons">people</i>
                  <br></br>
                  Collaborators
                </Link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <Link to="/accommodation">
                  <i class="material-icons">hotel</i>
                  <br></br>
                  Accommodation
                </Link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <Link to="/transport">
                  <i class="material-icons">directions_bus</i>
                  <br></br>
                  Transport
                </Link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <Link to="/placesOfInterest">
                  <i class="material-icons">beenhere</i>
                  <br></br>
                  <span></span>Places Of Interest
                </Link>
              </a>
            </li>
          </ul>
          <hr />
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
                ideaCards={this.state.ideaCards}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                addComments={this.addComments}
                deleteIdeaCard={this.deleteIdeaCard}
                incrementLikes={this.incrementLikes}
              />
            </Route>
            <Route path="/transport">
              <Transport
                ideaCards={this.state.ideaCards}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                addComments={this.addComments}
              />
            </Route>
            <Route path="/placesOfInterest">
              <PlacesOfInterest
                ideaCards={this.state.ideaCards}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                addComments={this.addComments}
              />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
