class AddModal extends React.Component {
    render(){
        return(
            <div
              class="modal fade"
              id="accomAddModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="accomAddModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="accomAddModalLabel">
                      Add accommodation ideas
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

        )
    }         
}

class Accommodation extends React.Component {
    addDefaultSrc(ev) {
      ev.target.src =
        "https://icon-library.net/images/accommodation-icon/accommodation-icon-22.jpg";
    }
  
    render() {
      return (
        <div>
          <div class="row">
            <div class="col-sm-4 py-2">
              <div class="card text-center h-100">
                <button
                  type="button"
                  class="btn btn-primary h-100"
                  data-toggle="modal"
                  data-target="#accomAddModal"
                >
                  <div class="card-body">
                    <h5 class="card-title">+</h5>
                    <p class="card-text">Click to add</p>
                  </div>
                </button>
              </div>
            </div>
  
            {/* DISPLAY ALL CARDS */}
            {this.props.ideaCards
              ? this.props.ideaCards.map((ideaCard, index) => {
                  return (
                    <div class="col-sm-4 py-2">
                      <div class="card h-100">
                        <button
                          type="button"
                          class="btn bg-transparent h-100"
                          data-toggle="modal"
                          data-target="#ideaCardModal"
                          onClick={() =>
                            this.props.showCardFunction(ideaCard, index)
                          }
                        >
                          <img
                            src={ideaCard.image}
                            onError={this.addDefaultSrc}
                            class="card-img-top"
                          ></img>
                          <div class="card-body">
                            <h5 class="card-title">{ideaCard.title}</h5>
                            <p class="card-text">{ideaCard.description}</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
  
          {/* Display details of cards */}
          <div>
            {this.props.ideaCards.map((ideaCard, index) => {
              return ideaCard.showCard ? (
                <div>
               
                <h1 onClick={() =>
                  this.props.showCardFunction(ideaCard, index)
                }>{ideaCard.title}</h1>
                </div>
  
              ) : (
                ""
              );
            })}
          </div>

          <AddModal  
            title={this.props.title} 
            description={this.props.description}
            location={this.props.location}
            image={this.props.image}
            url={this.props.url}
            comments={this.props.comments}
            contact={this.props.comments}
            category={this.props.category}
            handleSubmit = {this.props.handleSubmit}
            handleChange={this.props.handleChange}
            />

        </div>
      );
    }
  }
  