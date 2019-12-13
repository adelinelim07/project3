class DisplayComments extends React.Component {
  render(){
    return(
      (this.props.ideaCard.comments || []).map(comment => (
        <li class="list-group-item py-0">{comment}</li>
      ))
    )
  }
}

class ShowModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaCard: this.props.ideaCard,
      addCommentState: false,
      newComment: "",
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.ideaCard !== prevProps.ideaCard) {
      this.setState({
        ideaCard: this.props.ideaCard
      })
    }
  }

  toggleAddCommentState = () => {
    this.setState({
      addCommentState: !this.state.addCommentState
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addComments(this.state.ideaCard, this.state.newComment);
    this.setState({
      ideaCard: this.state.ideaCard,
      newComment: ""
    });
  };

  handleChange = event => {
    this.setState({ [event.target.id] : event.target.value });
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
                {this.state.ideaCard.title}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.toggleAddCommentState()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul class="list-unstyled">
                <table class="table table-sm table-borderless">
                  <tr>
                    <td class="font-weight-light">Description</td>
                    <td>{this.state.ideaCard.description}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-light">Location</td>
                    <td>{this.state.ideaCard.location}</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <img src={this.state.ideaCard.image} width="100%"></img>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-light">URL</td>
                    <td>
                      <a href={this.state.ideaCard.url}>
                        {this.state.ideaCard.url}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-light">Contact</td>
                    <td>{this.state.ideaCard.contact}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-light">
                        Comments{" "}
                        <button onClick={() => this.toggleAddCommentState()}
                        class="border-0 bg-transparent">
                        <i class="material-icons">add_comment</i>
                        </button>
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
                      <button 
                      class="bg-transparent border-0 text-muted" type="submit">Post</button>
                    </form>
                  </li>
                ) : (
                  ""
                )}

                <DisplayComments ideaCard={this.state.ideaCard} id={this.state.ideaCard._id}/>


              </ul>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => this.toggleAddCommentState()}
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
