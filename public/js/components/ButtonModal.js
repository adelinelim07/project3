class ButtonModal extends React.Component {
  constructor(props) {
    super(props);
    this.changeInput = this.changeInput.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
  }

  changeInput(event) {
    this.props.handleChange(event);
  }

  updateTrip() {
    console.log(this.props);
    this.props.changeState("title", this.props.trip.title);
    this.props.changeState("description", this.props.trip.description);
    this.props.changeState("country", this.props.trip.country);
    this.props.changeState("image", this.props.trip.image);
    this.props.changeState("_id", this.props.trip._id);
  }

  submitUpdatedMainTrip = event => {
    event.preventDefault();
    this.props.submitUpdatedMainTrip();
  };

  render() {
    // console.log(this.props.title);

    return (
      <React.Fragment>
        <button
          onClick={this.updateTrip}
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target={"#modal" + this.props.index}
        >
          <i class="material-icons">edit</i>
        </button>

        {/* UPDATE TRIP MODAL */}
        <div
          class="modal fade"
          id={"modal" + this.props.index}
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
                <div class="modal-body form-group">
                  <input
                    type="text"
                    class="form-control"
                    defaultValue={this.props.trip.title}
                    onChange={this.changeInput}
                    placeholder="Title"
                    id="title"
                  />
                  <input
                    type="text"
                    class="form-control"
                    defaultValue={this.props.trip.description}
                    onChange={this.changeInput}
                    placeholder="Description"
                    id="description"
                  />
                  <input
                    type="text"
                    class="form-control"
                    defaultValue={this.props.trip.country}
                    onChange={this.changeInput}
                    placeholder="Country"
                    id="country"
                  />
                  <input
                    type="text"
                    class="form-control"
                    defaultValue={this.props.trip.image}
                    onChange={this.changeInput}
                    placeholder="Image URL"
                    id="image"
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
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={this.submitUpdatedMainTrip}
                    data-dismiss="modal"
                  >
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
