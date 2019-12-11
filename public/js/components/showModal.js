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
                <li>Description:{this.props.ideaCard.description}</li>
                <li>Location: {this.props.ideaCard.location}</li>
                <li>
                  Image: <img src={this.props.ideaCard.image}></img>
                </li>
                <li>
                  URL:{" "}
                  <a href={this.props.ideaCard.url}>
                    {this.props.ideaCard.url}
                  </a>
                </li>
                <li>Contact: {this.props.ideaCard.contact}</li>
                <span>Comments <button>+</button></span>
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
