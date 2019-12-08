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
        comments: [],
        contact: 123456,
      //   category: "",
      // trip: { type: Schema.Types.ObjectId, ref:"TripCards" },
      ideaCards: [],
      displayAdd: false,
    };
    this.displayAddFunction;
  }

  displayAddFunction = () => {
      this.setState({
          displayAdd: !this.state.displayAdd
      })
  }

  updateIdeaCard = (ideaCard, index) => {
    fetch("ideaCard/" + ideaCard._id, {
      body: JSON.stringify(ideaCard),
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(updatedIdeaCard => updatedIdeaCard.json())
      .then(jsonedIdeaCard => {
        fetch("/ideaCards")
          .then(response => response.json())
          .then(ideaCards => {
            this.setState({ ideaCards: ideaCards });
          });
      });
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
        // category: this.state.category
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
            comments: [],
            contact: 123456,
          //   category: "",
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
              id="accomodation-tab"
              data-toggle="tab"
              href="#accomodation"
              role="tab"
              aria-controls="accomodation"
              aria-selected="true"
            >
              <div>
                <i class="material-icons">hotel</i>
                <br></br>
                Accomodation
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
            id="accomodation"
            role="tabpanel"
            aria-labelledby="accomodation-tab"
          >
            Accomodation PAGE TEST
            <Accomodation
              ideaCards={this.state.ideaCards}
              displayAdd = {this.state.displayAdd}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              componentDidMount={this.componentDidMount}
              displayAddFunction ={this.displayAddFunction}
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

class Accomodation extends React.Component {
  componentDidMount() {
    this.props.ideaca
  }
  render() {
    return (
      <div>
        <button className="btn" onClick={()=>this.props.displayAddFunction()}>
        +</button>
        {this.props.displayAdd ? <AddCard
          ideaCards={this.props.ideaCards}
          handleSubmit={this.props.handleSubmit}
          handleChange={this.props.handleChange}
        /> : ""}

        {console.log(this.props.ideaCards)}
        {console.log(this.props.ideaCards[0])}

        {/* <p>{this.props.ideaCards[0]}</p>  */}
      </div>
    );
  }
}

class AddCard extends React.Component {
  render() {
    return (
      <div>
        <h2>Add New Card</h2>
        <form onSubmit={this.props.handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={this.props.title}
            onChange={this.props.handleChange}
            id="title"
          />
          <input
            type="text"
            placeholder="Description"
            value={this.props.description}
            onChange={this.props.handleChange}
            id="description"
          />
          <input
            type="text"
            placeholder="Location"
            value={this.props.location}
            onChange={this.props.handleChange}
            id="location"
          />
          <input
            type="text"
            placeholder="Image"
            value={this.props.image}
            onChange={this.props.handleChange}
            id="image"
          />
          <input
            type="text"
            placeholder="Website"
            value={this.props.url}
            onChange={this.props.handleChange}
            id="url"
          />
          <input
            type="text"
            placeholder="Contact"
            value={this.props.contact}
            onChange={this.props.handleChange}
            id="contact"
          />
          <input
            type="text"
            placeholder="Comments"
            value={this.props.comments}
            onChange={this.props.handleChange}
            id="comments"
          />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

//qns: how to display the cards?
