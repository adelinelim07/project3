class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        category: this.props.category,
    }
}
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
                Add {this.props.category} ideas
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
            <form onSubmit={this.props.handleSubmit}>
              <div class="modal-body">
                <input
                  type="text"
                  placeholder="Title"
                  value={this.props.title}
                  onChange={this.props.handleChange}
                  id="title"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={this.props.description}
                  onChange={this.props.handleChange}
                  id="description"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={this.props.location}
                  onChange={this.props.handleChange}
                  id="location"
                />
                <input
                  type="text"
                  placeholder="Image"
                  value={this.props.image}
                  onChange={this.props.handleChange}
                  id="image"
                />
                <input
                  type="text"
                  placeholder="Website"
                  value={this.props.url}
                  onChange={this.props.handleChange}
                  id="url"
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={this.props.contact}
                  onChange={this.props.handleChange}
                  id="contact"
                />
                <input
                  type="text"
                  placeholder="Comments"
                  value={this.props.comments}
                  onChange={this.props.handleChange}
                  id="comments"
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={this.props.category}
                  onChange={this.props.handleChange}
                  id="category"
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
