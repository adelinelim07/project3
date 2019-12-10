//TABS ref from bootstrap: https://getbootstrap.com/docs/4.4/components/navs/
//ICONS ref https://material.io/resources/icons/?style=baseline

/////////////////////////////////////////////////
//Collaborators
/////////////////////////////////////////////////
class Collaborators extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#collaboratorModal"
        >
          <i class="material-icons">group_add</i>
        </button>

        <div
          class="modal fade"
          id="collaboratorModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="collaboratorModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="collaboratorModalLabel">
                  Invite friends
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">SEND EMAIL ETC</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/////////////////////////////////////////////////
//Accommodation Tab
/////////////////////////////////////////////////
class Accommodation extends React.Component {
  addDefaultSrc(ev) {
    ev.target.src =
      "https://icon-library.net/images/accommodation-icon/accommodation-icon-22.jpg";
  }

  render() {
    return (
      <div>
        <div class="row">
          <div class="col-sm-4 py-2">
            <div class="card text-center h-100">
              <button
                type="button"
                class="btn btn-primary h-100"
                data-toggle="modal"
                data-target="#accomModal"
              >
                <div class="card-body">
                  <h5 class="card-title">+</h5>
                  <p class="card-text">Click to add</p>
                </div>
              </button>
            </div>
          </div>

          {/* DISPLAY ALL CARDS */}
          {this.props.ideaCards
            ? this.props.ideaCards.map((ideaCard, index) => {
                return (
                  <div class="col-sm-4 py-2">
                    <div
                      class="card h-100"
                      onClick={() =>
                        this.props.showCardFunction(ideaCard, index)
                      }
                    >
                      <button
                        type="button"
                        class="btn btn-primary h-100"
                        data-toggle="modal"
                        data-target="#ideaCardModal"
                      >
                        <img
                          src={ideaCard.image}
                          onError={this.addDefaultSrc}
                          class="card-img-top"
                        ></img>
                        <div class="card-body">
                          <h5 class="card-title">{ideaCard.title}</h5>
                          <p class="card-text">{ideaCard.description}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>

        {/* Display details of cards */}
        <div>
          {this.props.ideaCards.map((ideaCard, index) => {
            return ideaCard.showCard ? (
              <div
                class="modal fade"
                id="ideaCardModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="ideaCardLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="ideaCardLabel">
                        {ideaCard.title}
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            );
          })}
        </div>

        {/* POP UP MODAL WITH ADD FORM */}
        <div
          class="modal fade"
          id="accomModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="accomModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="accomModalLabel">
                  Add accommodation ideas
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.props.handleSubmit}>
                <div class="modal-body">
                  <input
                    type="text"
                    placeholder="Title"
                    value={this.props.title}
                    onChange={this.props.handleChange}
                    id="title"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={this.props.description}
                    onChange={this.props.handleChange}
                    id="description"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={this.props.location}
                    onChange={this.props.handleChange}
                    id="location"
                  />
                  <input
                    type="text"
                    placeholder="Image"
                    value={this.props.image}
                    onChange={this.props.handleChange}
                    id="image"
                  />
                  <input
                    type="text"
                    placeholder="Website"
                    value={this.props.url}
                    onChange={this.props.handleChange}
                    id="url"
                  />
                  <input
                    type="text"
                    placeholder="Contact"
                    value={this.props.contact}
                    onChange={this.props.handleChange}
                    id="contact"
                  />
                  <input
                    type="text"
                    placeholder="Comments"
                    value={this.props.comments}
                    onChange={this.props.handleChange}
                    id="comments"
                  />

                  <input
                    type="text"
                    value={this.props.category}
                    onChange={this.props.handleChange}
                    id="category"
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/////////////////////////////////////////////////
//TRIP MAIN PARENT
/////////////////////////////////////////////////

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      location: "",
      image: "",
      url: "",
      comments: [],
      contact: 123456,
      category: "",
      // trip: { type: Schema.Types.ObjectId, ref:"TripCards" },
      showCard: false,
      ideaCards: []
    };
  }

  showCardFunction = (ideaCard, index) => {
    console.log(ideaCard);
    fetch("ideaCard/" + ideaCard._id)
      .then(response => response.json())
      .then(ideaCards => {
        this.setState({
          ideaCards: [
            ...this.state.ideaCards.slice(0, index),
            {
              ...this.state.ideaCards[index],
              showCard: !this.state.ideaCards[index].showCard
            },
            ...this.state.ideaCards.slice(index + 1)
          ]
        });
      });
  };

  updateIdeaCard = (ideaCard, index) => {
    fetch("ideaCard/" + ideaCard._id, {
      body: JSON.stringify(ideaCard),
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(updatedIdeaCard => updatedIdeaCard.json())
      .then(jsonedIdeaCard => {
        fetch("/ideaCards")
          .then(response => response.json())
          .then(ideaCards => {
            this.setState({ ideaCards: ideaCards });
          });
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

  componentDidMount() {
    fetch("/ideaCard")
      .then(response => response.json())
      .then(ideaCards => {
        this.setState({ ideaCards: ideaCards });
      });
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    console.log(this.state.title);
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
        showCard: this.state.showCard
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
          comments: [],
          contact: 123456,
          category: "",
          showCard: false,
          // trip: { type: Schema.Types.ObjectId, ref:"TripCards" },
          ideaCards: [jsonedIdeaCard, ...this.state.ideaCards]
        });
        console.log(jsonedIdeaCard);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="collaborators-tab"
              data-toggle="tab"
              href="#collaborators"
              role="tab"
              aria-controls="collaborators"
              aria-selected="true"
            >
              <div>
                <i class="material-icons">people</i>
                <br></br>
                Collaborators
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="accommodation-tab"
              data-toggle="tab"
              href="#accommodation"
              role="tab"
              aria-controls="accommodation"
              aria-selected="false"
            >
              <div>
                <i class="material-icons">hotel</i>
                <br></br>
                Accommodation
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="placesOfInterest-tab"
              data-toggle="tab"
              href="#placesOfInterest"
              role="tab"
              aria-controls="placesOfInterest"
              aria-selected="false"
            >
              <div class="icon-container">
                <i class="material-icons">beenhere</i>
                <br></br>
                <span></span>Places Of Interest
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="transport-tab"
              data-toggle="tab"
              href="#transport"
              role="tab"
              aria-controls="transport"
              aria-selected="false"
            >
              <div>
                <i class="material-icons">directions_bus</i>
                <br></br>
                Transport
              </div>
            </a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="collaborators"
            role="tabpanel"
            aria-labelledby="collaborators-tab"
          >
            <Collaborators />
          </div>
          <div
            class="tab-pane fade"
            id="accommodation"
            role="tabpanel"
            aria-labelledby="accommodation-tab"
          >
            <Accommodation
              ideaCards={this.state.ideaCards}
              showCard={this.state.showCard}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              componentDidMount={this.componentDidMount}
              showCardFunction={this.showCardFunction}
            />
          </div>
          <div
            class="tab-pane fade"
            id="placesOfInterest"
            role="tabpanel"
            aria-labelledby="placesOfInterest-tab"
          >
            Places of interest page test
          </div>
          <div
            class="tab-pane fade"
            id="transport"
            role="tabpanel"
            aria-labelledby="transport-tab"
          >
            Transport PAGE TEST
          </div>
        </div>
      </div>
    );
  }
}
