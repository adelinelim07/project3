class ShowModal extends React.Component {
    render(){
        return(
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
                      Description:{this.props.ideaCard.description}
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button 
                          type="submit" 
                          class="btn btn-primary"
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

