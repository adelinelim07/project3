class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      tripID: this.props._id,
      trip: [{ day: 1, ideas: [] }],
      ideaPool: [],
      currentDay: 0,
      selectedIdea: undefined
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
            ideaPool: fetchedIdeas.ideaPool,
            currentDay: fetchedIdeas.currentDay
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
        this.fetchData();
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

  eliminate = () => {
    let mirror = [...this.state.trip];
    if (mirror.length != 0) {
      mirror.splice(this.state.trip.length - 1, 1);
    }
    if (
      this.state.currentDay == this.state.trip.length &&
      this.state.currentDay != 0
    ) {
      this.setState({ currentDay: this.state.currentDay - 1 });
    }
    this.setState({ trip: mirror });
  };

  toDay = (day, operation, idea) => {
    let tempDay = this.state.currentDay;
    this.daySelector(0);
    $("#ITModal").modal("hide");
    fetch("/").then(() => {
      if (!operation) {
        let mirror = [...this.state.trip];
        mirror[day].ideas.push(this.state.ideaPool[idea]);
        this.setState({ trip: mirror });
      } else {
        let mirror = [...this.state.trip];
        mirror[tempDay - 1].ideas.splice(idea, 1);
        this.setState({ trip: mirror });
      }
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
          <div class="row">
            <div class="col-md-5"></div>
            <div class="col-md-7">
              <button
                type="button"
                className="btn btn-lg btn-block btn-danger"
                onClick={this.eliminate}
              >
                <i class="material-icons">delete</i>
                <p class="card-text">Click to remove a day</p>
              </button>
            </div>
          </div>
          {this.state.currentDay == 0
            ? this.state.ideaPool.map((idea, index) => {
                return (
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-success"
                    data-toggle="modal"
                    data-target="#ITModal"
                    onClick={() => {
                      this.setState({
                        selectedIdea: index
                      });
                    }}
                  >
                    {idea.title}
                  </button>
                );
              })
            : this.state.trip[this.state.currentDay - 1].ideas.map(
                (idea, index) => {
                  return (
                    <button
                      type="button"
                      className="btn btn-lg btn-block btn-success"
                      data-toggle="modal"
                      data-target="#ITModal"
                      onClick={() => {
                        this.setState({
                          selectedIdea: index
                        });
                      }}
                    >
                      {idea.title}
                    </button>
                  );
                }
              )}
        </div>
        <ITModal
          ideaList={
            this.state.currentDay == 0
              ? this.state.ideaPool
              : this.state.trip[this.state.currentDay - 1].ideas
          }
          currentDay={this.state.currentDay}
          trip={this.state.trip}
          selectedIdea={this.state.selectedIdea}
          alterationSpell={this.alterationSpell}
          toDay={this.toDay}
        />
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
        </button>
      </React.Fragment>
    );
  }
}

class ITModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaList: this.props.ideaList,
      currentDay: this.props.currentDay,
      trip: this.props.trip,
      selectedIdea: this.props.selectedIdea,
      selectedDay: 0,
      tempIdea: undefined
    };
  }

  handleChange = event => {
    this.setState({ selectedDay: parseInt(event.target.value) });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.ideaList == [] &&
      prevProps.ideaList !== this.props.ideaList
    ) {
      this.setState({
        ideaList: this.props.ideaList
      });
    }
    if (
      prevProps.ideaList !== this.props.ideaList &&
      this.props.ideaList !== []
    ) {
      this.setState({ ideaList: this.props.ideaList });
    }
    if (prevProps.currentDay !== this.props.currentDay) {
      this.setState({ currentDay: this.props.currentDay });
    }
    if (prevProps.trip !== this.props.trip) {
      this.setState({ trip: this.props.trip });
    }
    if (prevProps.selectedIdea !== this.props.selectedIdea) {
      this.setState({ selectedIdea: this.props.selectedIdea });
    }
  }

  toDay = () => {
    this.props.toDay(
      this.state.selectedDay,
      this.state.currentDay ? true : false,
      this.state.ideaList.indexOf(this.state.ideaList[this.state.selectedIdea])
    );
    this.props.alterationSpell();
  };

  render() {
    return (
      <div
        class="modal fade"
        id="ITModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ITModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ITModalLabel">
                Details for "
                {this.state.selectedIdea != undefined
                  ? this.state.ideaList[this.state.selectedIdea].title || //DEBUG
                    undefined
                  : "Placeholder"}
                "
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
            <button
              type="button"
              className={
                this.state.currentDay
                  ? "btn btn-lg btn-block btn-danger"
                  : "btn btn-lg btn-block btn-warning"
              }
              onClick={this.toDay}
            >
              <i class="material-icons">
                {this.state.currentDay ? "label_off" : "label"}
              </i>
            </button>
            {this.state.currentDay ? (
              undefined
            ) : (
              <select
                value={this.state.selectedDay}
                onChange={this.handleChange}
              >
                {this.state.trip.map((day, index) => {
                  return <option value={index}>Day {day.day}</option>;
                })}
              </select>
            )}
          </div>
        </div>
      </div>
    );
  }
}
