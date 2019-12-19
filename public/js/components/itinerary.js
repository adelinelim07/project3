class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripID: this.props._id,
      trip: [
        {
          day: 1,
          ideas: []
        }, //temporary values: days
        {
          day: 2,
          ideas: []
        },
        {
          day: 3,
          ideas: []
        }
      ],
      ideaPool: [
        //temporary values: ideas
        // {
        //   _id: "5df8bbef4495283f30a4d9df",
        //   comments: [""],
        //   title: "Accom1",
        //   description: "desc123",
        //   location: "",
        //   image: "",
        //   url: "",
        //   contact: null,
        //   category: "Accommodation",
        //   likeClicks: 4,
        //   trip: "5df8807f23d0e20cccfc5dff",
        //   __v: 0
        // },
        // {
        //   _id: "5df8bf9b7277f640d438efcb",
        //   comments: [""],
        //   title: "Titanic Voyage",
        //   description: "description 123",
        //   location: "",
        //   image: "",
        //   url: "",
        //   contact: null,
        //   category: "Transport",
        //   likeClicks: 0,
        //   trip: "5df8807f23d0e20cccfc5dff",
        //   __v: 0
        // },
        // {
        //   _id: "5df8bfae7277f640d438efcc",
        //   comments: [""],
        //   title: "Festival at the Beach",
        //   description:
        //     "Enter the futuristic year of 1984, an age where ducks run wild in a frantic battle for glory. Blast your friends with Shotguns, Net Guns, Mind Control Rays, Saxophones, Magnet Guns, and much, much more. This is DUCK GAME. Don't blink.",
        //   location: "",
        //   image: "",
        //   url: "",
        //   contact: 123456,
        //   category: "Places Of Interest",
        //   likeClicks: 0,
        //   trip: "5df8807f23d0e20cccfc5dff",
        //   __v: 0
        // }
      ]
    };
  }

  fetchData = () => {
    // console.log("fetching");
    fetch("/itinerary/" + this.state.tripID)
      .then(response => {
        response.json();
      })
      .then(fetchedIdeas => {
        if (fetchedIdeas) {
          this.setState({
            trip: fetchedIdeas.trip,
            ideaPool: fetchedIdeas.ideaPool
          });
        } else {
          fetch("/ideaCard/filter/" + this.state.tripID)
            .then(response => {
              return response.json();
            })
            .then(jsonedResult => {
              this.setState({
                ideaPool: [...this.state.ideaPool, jsonedResult]
              });
              console.log(this.state.ideaPool);
            });
        }
      });
  };

  continuumShift = () => {
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
        console.log(this.state);
        return createdPlan.json();
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.continuumShift();
  }

  render() {
    return (
      <div class="row">
        <div class="col-md-3">
          {this.state.trip.map((days, index) => {
            return (
              <button type="button" class="btn btn-lg btn-success btn-block">
                Day {days.day}
              </button>
            );
          })}
          <button type="button" class="btn btn-success btn-block btn-lg">
            <i class="material-icons">note_add</i>
          </button>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-12">
              {this.state.ideaPool.length ? (
                this.state.ideaPool.map((idea, index) => {
                  return (
                    <button
                      type="button"
                      class="btn btn-lg btn-block btn-success"
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
        </div>
      </div>
    );
  }
}
