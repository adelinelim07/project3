class PlacesOfInterest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        ideaCardClicked: {},
        indexClicked: -1,
        comments: [],
    }
  }
  
  addDefaultSrc(ev) {
    ev.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuVSO6kDCbaUAl6nusYJaGLVdtuBLPfDh0-MV0xMirGiezTUDB&s";
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
                data-target="#addModal"
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
            ? this.props.ideaCards.filter(ideaCard=>ideaCard.category.includes("Places Of Interest") && ideaCard.trip.includes(this.props.trip)).map((ideaCard, index) => {
                return (
                  <div class="col-sm-4 py-2">
                    <div class="card h-100">
                      <button
                        type="button"
                        class="btn bg-transparent h-100"
                        data-toggle="modal"
                        data-target="#clickedCardModal"
                        onClick={() => {
                          this.setState({
                              ideaCardClicked: ideaCard,
                              indexClicked: index,
                              comments: ideaCard.comments
                          })
                        }}
                      >
                        <img
                          src={ideaCard.image}
                          onError={this.addDefaultSrc}
                          class="card-img-top"
                        ></img>
                        <div class="card-body py-2">
                          <h5 class="card-title">{ideaCard.title}</h5>
                          <p class="card-text">{ideaCard.description}</p>  
                        </div>
                        <div class="card-footer border-0 bg-transparent mb-0 p-0 text-left">
                          <p><i class="material-icons md-18">favorite</i>{ideaCard.likeClicks}</p>
                        </div>
                      </button>
                    </div>
                  </div>
  
  
                );
              })
            : ""}
        </div>
  
        <AddModal  
          title={this.props.title} 
          description={this.props.description}
          location={this.props.location}
          image={this.props.image}
          url={this.props.url}
          comments={this.props.comments}
          handleSubmit = {this.props.handleSubmit}
          handleChange={this.props.handleChange}
          category={this.props.category}
          />
  
         <ShowModal
          ideaCards={this.props.ideaCards}
          comments={this.state.comments}
          ideaCard={this.state.ideaCardClicked}
          index={this.state.indexClicked}
          addComments= {this.props.addComments}
          deleteIdeaCard= {this.props.deleteIdeaCard}
          incrementLikes= {this.props.incrementLikes}
          />
  
      </div>
    );
  }
  }
  