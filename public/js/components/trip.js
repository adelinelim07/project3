//TABS ref from bootstrap: https://getbootstrap.com/docs/4.4/components/navs/
//ICONS ref https://material.io/resources/icons/?style=baseline

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      location: "",
      image: "",
      url: "",
      comments: [""],
      contact: 123456,
      category: "",
      editing: false,
      // trip: { type: Schema.Types.ObjectId, ref:"TripCards" },
      ideaCards: []
    };
  }

  // setCardCategory = () => {
  //   this.setState({
  //     category: "Accommodation"
  //   })
  // }

  addComments = (ideaCard, newComment) => {
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };
    fetch("ideaCard/" + ideaCard._id, {
      body: JSON.stringify({
        title: title,
        description: description,
        location: location,
        image: image,
        url: url,
        comments: [...comments,newComment],
        contact: contact,
        category: category,
      }, getCircularReplacer() ),
      method: "PUT",
      headers: { 
        "Content-Type": "application/json"
      }
    })
      .then(response=>response.json())
      .then(response => console.log(response))
      
      //how to clear addComment of child?
  };

  deleteIdeaCard = (id, index) => {
    fetch("ideaCard/" + id, {
      method: "DELETE"
    }).then(data => {
      this.setState({
        ideaCards: [
          ...this.state.ideaCards.slice(0, index),
          ...this.state.ideaCards.slice(index + 1)
        ]
      });
    });
  };

  componentDidMount() {
    fetch("/ideaCard")
      .then(response => response.json())
      .then(ideaCards => {
        this.setState({ ideaCards: ideaCards });
      });
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    console.log(this.state.title);
    event.preventDefault();
    fetch("/ideaCard", {
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        location: this.state.location,
        image: this.state.image,
        url: this.state.url,
        comments: this.state.comments,
        contact: this.state.contact,
        category: this.state.category,
      }),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(createdIdeaCard => {
        console.log(createdIdeaCard);
        return createdIdeaCard.json();
      })
      .then(jsonedIdeaCard => {
        console.log(jsonedIdeaCard);
        // reset the form
        this.setState({
          title: "",
          description: "",
          location: "",
          image: "",
          url: "",
          comments: [""],
          contact: 123456,
          category: "",
          // trip: { type: Schema.Types.ObjectId, ref:"TripCards" },
          ideaCards: [jsonedIdeaCard, ...this.state.ideaCards]
        });
        console.log(jsonedIdeaCard);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="collaborators-tab"
              data-toggle="tab"
              href="#collaborators"
              role="tab"
              aria-controls="collaborators"
              aria-selected="true"
            >
              <div>
                <i class="material-icons">people</i>
                <br></br>
                Collaborators
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="accommodation-tab"
              data-toggle="tab"
              href="#accommodation"
              role="tab"
              aria-controls="accommodation"
              aria-selected="false"
            >
              <div>
                <i class="material-icons">hotel</i>
                <br></br>
                Accommodation
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="placesOfInterest-tab"
              data-toggle="tab"
              href="#placesOfInterest"
              role="tab"
              aria-controls="placesOfInterest"
              aria-selected="false"
            >
              <div class="icon-container">
                <i class="material-icons">beenhere</i>
                <br></br>
                <span></span>Places Of Interest
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="transport-tab"
              data-toggle="tab"
              href="#transport"
              role="tab"
              aria-controls="transport"
              aria-selected="false"
            >
              <div>
                <i class="material-icons">directions_bus</i>
                <br></br>
                Transport
              </div>
            </a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="collaborators"
            role="tabpanel"
            aria-labelledby="collaborators-tab"
          >
            <Collaborators />
          </div>
          <div
            class="tab-pane fade"
            id="accommodation"
            role="tabpanel"
            aria-labelledby="accommodation-tab"
          >
            <Accommodation
              ideaCards={this.state.ideaCards}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              addComments={this.addComments}
            />
          </div>
          <div
            class="tab-pane fade"
            id="placesOfInterest"
            role="tabpanel"
            aria-labelledby="placesOfInterest-tab"
          >
            Places of interest page test
          </div>
          <div
            class="tab-pane fade"
            id="transport"
            role="tabpanel"
            aria-labelledby="transport-tab"
          >
            Transport PAGE TEST
          </div>
        </div>
      </div>
    );
  }
}
