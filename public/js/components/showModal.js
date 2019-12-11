class ShowModal extends React.Component {
  render() {
    return (
      <div
        class="modal fade"
        id="clickedCardModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="clickedCardLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="clickedCardLabel">
                {this.props.ideaCard.title}
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
            <div class="modal-body">
              <ul class="list-unstyled">
                <table class="table table-borderless">
                  <tr>
                    <td>Description</td>
                    <td>{this.props.ideaCard.description}</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>{this.props.ideaCard.location}</td>
                  </tr>
                  <tr>
                    <td>Image</td>
                    <td><img src={this.props.ideaCard.image}></img></td>
                  </tr>
                  <tr>
                    <td>URL</td>
                    <td><a href={this.props.ideaCard.url}>{this.props.ideaCard.url}</a></td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td>{this.props.ideaCard.contact}</td>
                  </tr>
                  <tr>
                    <td> <span>Comments <button>+</button></span></td>
                  </tr>
                  </table>
               
                <ul class="list-group list-group-flush">
                  {(this.props.ideaCard.comments || []).map(comment=> 
                       <li class="list-group-item py-0">{comment}</li>
                       )}
                </ul>
              </ul>
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
          </div>
        </div>
      </div>
    );
  }
}
