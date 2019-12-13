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
          data-target="#exampleModal"
        >
          Add New Trip
        </button>

        <div
          class="modal fade"
          id="exampleModal"
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
                    Add New Post
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
