class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      location: "",
      image: "",
      url: "",
      comments: [""],
      contact: "",
      category: this.props.category,
      likeClicks: 0,
      trip: this.props.trip,
      tripTitle: this.props.tripTitle,
      ideaCards: []
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
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
        likeClicks: 0,
        trip: this.state.trip
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
          comments: [""],
          contact: "",
          category: this.props.category,
          ideaCards: [jsonedIdeaCard, ...this.state.ideaCards]
        });
        console.log(this.state);
      })
      .then(this.props.dataRefresh())
      .catch(error => console.log(error));
    $("#addModal").modal("hide");
  };

  render() {
    return (
      <div
        class="modal fade"
        id="addModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addModalLabel">
                Add {this.state.category} ideas
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
                <input
                  type="text"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  id="title"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  id="description"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  id="location"
                />
                <input
                  type="text"
                  placeholder="Image"
                  value={this.state.image}
                  onChange={this.handleChange}
                  id="image"
                />
                <input
                  type="text"
                  placeholder="Website"
                  value={this.state.url}
                  onChange={this.handleChange}
                  id="url"
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={this.state.contact}
                  onChange={this.handleChange}
                  id="contact"
                />
                <input
                  type="text"
                  placeholder="Comments"
                  value={this.state.comments}
                  onChange={this.handleChange}
                  id="comments"
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
    );
  }
}
