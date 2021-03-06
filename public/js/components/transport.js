class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaCardClicked: {},
      indexClicked: -1,
      comments: [],
      category: "Transport"
    };
  }

  addDefaultSrc(ev) {
    ev.target.src =
      "https://icon-library.net/images/transport-icon/transport-icon-25.jpg";
  }

  render() {
    return (
      <div>
        <div class="row">
          <div class="col-sm-3 py-2">
            <div class="card border-0 text-center h-100">
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
            ? this.props.ideaCards
                .filter(
                  ideaCard =>
                    ideaCard.category.includes("Transport") &&
                    ideaCard.trip.includes(this.props.trip)
                )
                .map((ideaCard, index) => {
                  return (
                    <div class="col-sm-3 py-2">
                      <div class="card border-0 h-100">
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
                            });
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
                            <p>
                              <i class="material-icons md-18">favorite</i>
                              {ideaCard.likeClicks}
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })
            : ""}
        </div>

        <AddModal
          category={this.state.category}
          dataRefresh={this.props.dataRefresh}
          trip={this.props.trip}
          tripTitle={this.props.tripTitle}
        />

        <ShowModal
          ideaCards={this.props.ideaCards}
          comments={this.state.comments}
          ideaCard={this.state.ideaCardClicked}
          index={this.state.indexClicked}
          addComments={this.props.addComments}
          deleteIdeaCard={this.props.deleteIdeaCard}
          incrementLikes={this.props.incrementLikes}
        />
      </div>
    );
  }
}
