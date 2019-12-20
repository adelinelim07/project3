class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      tripID: this.props._id,
      trip: [{ day: 1, ideas: [] }],
      ideaPool: [],
      currentDay: 0
    };
  }

  fetchData = () => {
    fetch("/itinerary/" + this.state.tripID)
      .then(response => {
        return response.json();
      })
      .then(fetchedIdeas => {
        if (fetchedIdeas) {
          // IF Itinerary already exists inside database
          this.reloadIdeaPool();
          this.setState({
            _id: fetchedIdeas._id,
            trip: fetchedIdeas.trip,
            ideaPool: fetchedIdeas.ideaPool
          });
        } else {
          // IF Itinerary DOES NOT exist inside database yet
          console.log(
            "no pre-existing Itinerary in database, creating new one."
          );
          this.reloadIdeaPool().then(this.creationSpell());
        }
      });
  };

  reloadIdeaPool = async () => {
    // console.log("fetching ideas");
    return fetch("/ideaCard/filter/" + this.state.tripID)
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
        ideaPool: this.state.ideaPool,
        currentDay: this.state.currentDay
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
        ideaPool: this.state.ideaPool,
        currentDay: this.state.currentDay
      }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(createdPlan => {
        // console.log(createdPlan);
        return createdPlan.json();
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    if (this.state._id === "") {
      return;
    } else {
      this.alterationSpell();
    }
  }

  daySelector = day => {
    this.setState({
      currentDay: day
    });
  };

  addDay = () => {
    this.setState({
      trip: [...this.state.trip, { day: this.state.trip.length + 1, ideas: [] }]
    });
  };

  render() {
    return (
      <div class="row">
        <div class="col-md-3">
          <DayButton
            currentDay={this.state.currentDay}
            day={0}
            content={<i class="material-icons">speaker_notes</i>}
            daySelector={this.daySelector}
          />

          {this.state.trip.map((days, index) => {
            return (
              <DayButton
                currentDay={this.state.currentDay}
                day={index + 1}
                content={"Day " + days.day}
                daySelector={this.daySelector}
              />
            );
          })}

          <button
            type="button"
            className="btn btn-basic btn-block btn-lg"
            onClick={this.addDay}
          >
            <i class="material-icons">note_add</i>
          </button>
        </div>

        <div class="col-md-9">
          {this.state.ideaPool.length ? (
            this.state.ideaPool.map((idea, index) => {
              return (
                <button
                  type="button"
                  className="btn btn-lg btn-block btn-success"
                >
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

class DayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryClass: "btn btn-primary btn-block btn-lg",
      secondaryClass: "btn btn-success btn-block btn-lg"
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.currentDay !== this.props.currentDay) {
  //     console.log("current day has changed.");
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className={
            this.props.currentDay == this.props.day
              ? this.state.primaryClass
              : this.state.secondaryClass
          }
          onClick={() => this.props.daySelector(this.props.day)}
        >
          {this.props.content}
          {/* {console.log(
            this.state.content,
            this.state.currentDay,
            this.state.day,
            this.state.currentDay == this.state.day ? "primary" : "secondary"
          )} */}
        </button>
      </React.Fragment>
    );
  }
}
