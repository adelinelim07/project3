class ShowModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCommentState: false,
      newComment: ""
    };
  }

  toggleAddCommentState = () => {
    this.setState({
      addCommentState: !this.state.addCommentState
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addComments(this.props.ideaCard, this.state.newComment);
    this.setState({
      newComment: ""
    });
  };

  handleChange = event => {
    this.setState({ newComment: event.target.value });
  };

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
                <table class="table table-sm table-borderless">
                  <tr>
                    <td class="font-weight-light">Description</td>
                    <td>{this.props.ideaCard.description}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-light">Location</td>
                    <td>{this.props.ideaCard.location}</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <img src={this.props.ideaCard.image} width="100%"></img>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-light">URL</td>
                    <td>
                      <a href={this.props.ideaCard.url}>
                        {this.props.ideaCard.url}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-light">Contact</td>
                    <td>{this.props.ideaCard.contact}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-light">
                      <span>
                        Comments{" "}
                        <button onClick={() => this.toggleAddCommentState()}>
                          +
                        </button>
                      </span>
                    </td>
                  </tr>
                </table>

                <ul class="list-group list-group-flush"></ul>

                {this.state.addCommentState ? (
                  <li class="list-group-item py-0 bg-light">
                    <form onSubmit={this.handleSubmit}>
                      <input
                        class="w-75 bg-transparent border-0"
                        type="text"
                        value={this.state.newComment}
                        id="newComment"
                        onChange={this.handleChange}
                      ></input>
                      <button type="submit">+</button>
                    </form>
                  </li>
                ) : (
                  ""
                )}

                {(this.props.ideaCard.comments || []).map(comment => (
                  <li class="list-group-item py-0">{comment}</li>
                ))}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
