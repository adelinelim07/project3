class Collaborators extends React.Component {
    render() {
      return (
        <div>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#collaboratorModal"
          >
            <i class="material-icons">group_add</i>
          </button>
  
          <div
            class="modal fade"
            id="collaboratorModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="collaboratorModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="collaboratorModalLabel">
                    Invite friends
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
                <div class="modal-body">SEND EMAIL ETC</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }