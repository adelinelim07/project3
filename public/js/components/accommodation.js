class ShowModal extends React.Component {
    render(){
        return(
            // <div>{this.props.ideaCard.title}</div>
            <div
                  class="modal fade"
                  id="ideaCardModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="ideaCardLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="ideaCardLabel">
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
                      showCard:{this.props.ideaCard.showCard}
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          onClick={() =>
                            this.props.showCardFunction(this.props.ideaCard, this.props.index)
                          }
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button 
                          type="submit" 
                          class="btn btn-primary"
                          onClick={() =>
                            this.props.showCardFunction(this.props.ideaCard, this.props.index)
                          }
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
        )
    }
}


class Accommodation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ideaCardClicked: {},
            indexClicked: -1
        }
    }

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
                          onClick={() => {
                            this.setState({
                                ideaCardClicked: ideaCard,
                                indexClicked: index
                            })
                            this.props.showCardFunction(ideaCard, index)
                          }}
                        >
                        {/* {this.props.ideaCards[index].showCard ? 
                        (<ShowModal
                            showCardFunction={this.props.showCardFunction}
                            ideaCard={ideaCard}
                            index={index}
                            /> )
                            : ""} */}
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
          {/* <div>
            {this.props.ideaCards.map((ideaCard, index) => {
              return ideaCard.showCard ? (
                  <ShowModal ideaCard={this.props.ideaCards[index]}/>
                
                  // <div>
               
                // <h1 onClick={() =>
                //   this.props.showCardFunction(ideaCard, index)
                // }>{ideaCard.title}</h1>
                // </div>
  
              ) : (
                ""
              );
            })}
          </div> */}

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
           <ShowModal
            showCardFunction={this.props.showCardFunction}
            ideaCard={this.state.ideaCardClicked}
            index={this.state.indexClicked}
            />

        </div>
      );
    }
  }
  