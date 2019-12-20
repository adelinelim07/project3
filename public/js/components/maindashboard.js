const { BrowserRouter, Link, Switch, Route, browserHistory } = ReactRouterDOM;

class MainTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      country: "",
      // image: "",
      startDate: "",
      endDate: "",
      _id: "",
      userId: this.props.currentUserId,
      showDashboard: true,
      showTrips: false,
      mainTrips: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchTrips();
  }

  //fetching tripData filtered by User
  fetchTrips = () => {
    fetch("/maindashboard/" + this.props.currentUserId)
      .then(response => response.json())
      .then(mainTrips => {
        console.log("IM FETCHING", mainTrips);
        this.setState({
          mainTrips: mainTrips
        });
      });
  };

  toggleView = (tripID, tripTitle) => {
    this.setState({
      showDashboard: !this.state.showDashboard,
      showTrips: !this.state.showTrips,
      _id: tripID,
      title: tripTitle
    });
    console.log(tripID);
  };

  //delete tripData entry
  deleteMainTrip = (id, index) => {
    fetch("/maindashboard/" + id, {
      method: "DELETE"
    }).then(date => {
      this.setState({
        mainTrips: [
          ...this.state.mainTrips.slice(0, index),
          ...this.state.mainTrips.slice(index + 1)
        ]
      });
    });
  };

  //send in updated tripData to database
  submitUpdatedMainTrip = () => {
    fetch("/maindashboard/" + this.state._id, {
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        country: this.state.country,
        // image: this.state.image,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.fetchTrips)
      .then(this.clearState);

    console.log("hihi, running async");
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  changeState = (key, value) => {
    this.setState({ [key]: value });
  };

  clearState = () => {
    this.setState({
      title: "",
      description: "",
      country: "",
      // image: "",
      startDate: "",
      endDate: ""
    });
  };
  //create new tripData entry
  handleSubmit = event => {
    event.preventDefault();

    fetch("/maindashboard", {
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        country: this.state.country,
        // image: this.state.image,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        userId: this.props.currentUserId
      }),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(createdMainTrip => {
        return createdMainTrip.json();
      })
      .then(jsonedMainTrip => {
        // reset the form
        // add person to list
        this.setState({
          title: "",
          description: "",
          country: "",
          // image: "",
          startDate: "",
          endDate: "",
          mainTrips: [...this.state.mainTrips, jsonedMainTrip]
        });
        console.log(jsonedMainTrip);
      })
      .catch(error => console.log(error));
    $("#newTripModal").modal("hide");
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showTrips && (
          <Trip
            toggleView={this.toggleView}
            trip={this.state._id}
            tripTitle={this.state.title}
            logout={this.props.logout}
          />
        )}
        {this.state.showDashboard && (
          <React.Fragment>
            <head>
              <link
                rel="stylesheet"
                type="text/css"
                href="../../css/dashboard-style.css"
              />
            </head>
            <MastHead logout={this.props.logout} />

            <h1>My Trips</h1>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#newTripModal"
              onClick={this.clearState}
              id="newTripButton"
            >
              Add New Trip
            </button>
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Trip Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Country</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.mainTrips.map((mainTrips, index) => {
                  return (
                    <tr>
                      <td class="align-middle">
                        {" "}
                        <button
                          class="bg-transparent border-0"
                          style={{
                            color: "white",
                            textDecorationLine: "underline"
                          }}
                          onClick={() =>
                            this.toggleView(mainTrips._id, mainTrips.title)
                          }
                        >
                          {mainTrips.title}
                        </button>
                      </td>
                      <td class="align-middle">{mainTrips.description}</td>
                      <td class="align-middle">{mainTrips.country}</td>
                      <td class="align-middle">
                        {mainTrips.startDate.slice(0, 10)}
                      </td>
                      <td class="align-middle">
                        {mainTrips.endDate.slice(0, 10)}
                      </td>
                      <td></td>
                      <td>
                        <ButtonModal
                          trip={mainTrips}
                          index={index}
                          handleChange={this.handleChange}
                          changeState={this.changeState}
                          submitUpdatedMainTrip={this.submitUpdatedMainTrip}
                        />
                      </td>
                      <td>
                        <button
                          class="bg-transparent border-0 text-white"
                          onClick={() =>
                            this.deleteMainTrip(mainTrips._id, index)
                          }
                        >
                          <i class="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* NEW TRIP MODAL */}

            <div
              class="modal fade"
              id="newTripModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add New Trip
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

                  <form onSubmit={this.handleSubmit}>
                    <div class="modal-body form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Title"
                        onChange={this.handleChange}
                        value={this.state.title}
                        id="title"
                        required
                      />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        id="description"
                      />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Country"
                        onChange={this.handleChange}
                        value={this.state.country}
                        id="country"
                      />
                      {/* <input
                        type="text"
                        class="form-control"
                        placeholder="Image URL"
                        onChange={this.handleChange}
                        value={this.state.image}
                        id="image"
                      /> */}
                      <input
                        type="date"
                        class="form-control"
                        placeholder="Start Date"
                        onChange={this.handleChange}
                        value={this.state.startDate}
                        id="startDate"
                        required
                      />
                      <input
                        type="date"
                        class="form-control"
                        placeholder="End Date"
                        onChange={this.handleChange}
                        value={this.state.endDate}
                        id="endDate"
                        required
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
                        Add New Trip
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
