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

