class MainTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      country: "",
      image: "",
      startDate: "",
      endDate: "",
      mainTrips: []
    };
  }

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

  updateMainTrip = (mainTrips, index) => {
    fetch("maindashboard/" + mainTrips._id, {
      body: JSON.stringify(mainTrips),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(updatedMainTrip => updatedMainTrip.json())
      .then(jsonedMainTrip => {
        fetch("/maindashboard")
          .then(response => response.json())
          .then(mainTrips => {
            this.setState({ mainTrips: mainTrips });
          });
      });
  };

  componentDidMount() {
    fetch("/maindashboard")
      .then(response => response.json())
      .then(mainTrips => {
        this.setState({
          mainTrips: mainTrips
        });
      });
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("/maindashboard", {
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        country: this.state.country,
        image: this.state.image,
        startDate: this.state.startDate,
        endDate: this.state.endDate
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
          image: "",
          startDate: "",
          endDate: "",
          todos: [jsonedMainTrip, ...this.state.mainTrips]
        });
        console.log(jsonedMainTrip);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <React.Fragment>
        <h1>Main Dashboard</h1>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#newTripModal"
        >
          Add New Trip
        </button>
        {/* bootstrap card not working */}
        {/* <div class="card" style="width: 18rem;">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div> */}
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Trip Title</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.mainTrips.map((mainTrips, index) => {
              return (
                <tr>
                  <td>{mainTrips.title}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#updateTripModal"
                    >
                      UPDATE
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={() => this.deleteMainTrip(mainTrips._id, index)}
                    >
                      DELETE
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
                <div class="modal-body">
                  <label htmlFor="title">Title</label>
                  <input type="text" onChange={this.handleChange} id="title" />
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

        {/* UPDATE TRIP MODAL */}
        <div
          class="modal fade"
          id="updateTripModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="updateTripModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="updateTripModalLabel">
                  Update Trip
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
              <form>
                <div class="modal-body">
                  <label htmlFor="title">Title</label>
                  <input type="text" onChange={this.handleChange} id="title" />
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
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
