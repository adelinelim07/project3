class Itinerary extends React.Component {
  render() {
    return (
      <div class="row">
        <div class="col-md-3">
          <button type="button" class="btn btn-lg btn-primary btn-block">
            Day 1
          </button>
          <button type="button" class="btn btn-success btn-block btn-lg">
            Day 2
          </button>
          <button type="button" class="btn btn-success btn-block btn-lg">
            Day 3
          </button>
          <button type="button" class="btn btn-success btn-block btn-lg">
            <i class="material-icons">note_add</i>
          </button>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-6">
              <img
                alt="Bootstrap Image Preview"
                src=""
                class="rounded bg-dark"
              />
              <img
                alt="Bootstrap Image Preview"
                src=""
                class="rounded bg-dark"
              />
            </div>
            <div class="col-md-6">
              <img
                alt="Bootstrap Image Preview"
                src=""
                class="rounded  bg-dark"
              />
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <img
            alt="Bootstrap Image Preview"
            src=""
            class="rounded-circle bg-dark"
          />
          <img
            alt="Bootstrap Image Preview"
            src=""
            class="rounded-circle bg-dark"
          />
        </div>
      </div>
    );
  }
}
