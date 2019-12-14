class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        category: "",
        ideaCardClicked: {},
        indexClicked: -1
    }
}

addDefaultSrc(ev) {
  ev.target.src =
    "https://icon-library.net/images/transport-icon/transport-icon-25.jpg";
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
              onClick={() => {
                this.setState({
                    category: "Transport"
                })
              }}
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
          ? this.props.ideaCards.filter(ideaCard=>ideaCard.category.includes("Transport")).map((ideaCard, index) => {
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
                            indexClicked: index
                        })
                      }}
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

      <AddModal  
        handleSubmit = {this.props.handleSubmit}
        handleChange={this.props.handleChange}
        category={this.state.category}
        />

       <ShowModal
        ideaCards={this.props.ideaCards}
        ideaCard={this.state.ideaCardClicked}
        index={this.state.indexClicked}
        addComments= {this.props.addComments}
        />

    </div>
  );
}
}
