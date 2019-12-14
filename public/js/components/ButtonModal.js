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
          UPDATE
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
                <div class="modal-body">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    defaultValue={this.props.trip.title}
                    onChange={this.changeInput}
                    id="title"
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
