class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      tripID: this.props._id,
      trip: [
        {
          day: 1,
          ideas: []
        }
      ],
      ideaPool: []
    };
  }

  fetchData = () => {
    // console.log("fetching");
    fetch("/itinerary/" + this.state.tripID)
      .then(response => {
        return response.json();
      })
      .then(fetchedIdeas => {
        if (fetchedIdeas) {
          // console.log("Itinerary already exists in the database.");
          this.reloadIdeaPool();
          this.setState({
            _id: fetchedIdeas._id,
            trip: fetchedIdeas.trip,
            ideaPool: fetchedIdeas.ideaPool
          });
        } else {
          console.log(
            "no pre-existing Itinerary in database, creating new one."
          );
          this.reloadIdeaPool().then(this.creationSpell());
        }
      });
  };

  reloadIdeaPool = () => {
    // console.log("fetching ideas");
    fetch("/ideaCard/filter/" + this.state.tripID)
      .then(response => {
        return response.json();
      })
      .then(jsonedResult => {
        this.setState({
          ideaPool: [...jsonedResult]
        });
      });
  };

  creationSpell = () => {
    fetch("/itinerary", {
      body: JSON.stringify({
        tripID: this.state.tripID,
        trip: this.state.trip,
        ideaPool: this.state.ideaPool
      }),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(createdPlan => {
        return createdPlan.json();
      })
      .catch(error => console.log(error));
  };

  alterationSpell = () => {
    fetch("/itinerary/edit/" + this.state._id, {
      body: JSON.stringify({
        tripID: this.state.tripID,
        trip: this.state.trip,
        ideaPool: this.state.ideaPool
        //, currentDay: this.state.currentDay
      }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(createdPlan => {
        console.log(createdPlan);
        return createdPlan.json();
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.alterationSpell();
  }

  render() {
    return (
      <div class="row">
        <div class="col-md-3">
          <button type="button" class="btn btn-primary btn-block btn-lg">
            <i class="material-icons">speaker_notes</i>
          </button>
          {this.state.trip.map((days, index) => {
            return (
              <button type="button" class="btn btn-lg btn-success btn-block">
                Day {days.day}
              </button>
            );
          })}
          <button type="button" class="btn btn-basic btn-block btn-lg">
            <i class="material-icons">note_add</i>
          </button>
        </div>
        <div class="col-md-9">
          {this.state.ideaPool.length ? (
            this.state.ideaPool.map((idea, index) => {
              return (
                <button type="button" class="btn btn-lg btn-block btn-success">
                  {idea.title}
                </button>
              );
            })
          ) : (
            <button
              type="button"
              class="btn btn-lg btn-block btn-danger"
            ></button>
          )}
        </div>
      </div>
    );
  }
}
