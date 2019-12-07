//TABS ref from bootstrap: https://getbootstrap.com/docs/4.4/components/navs/
//ICONS ref https://material.io/resources/icons/?style=baseline
class Trip extends React.Component {
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
                  <i class="material-icons">hotel</i><br></br>
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
                        <i class="material-icons">beenhere</i><br></br>
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
                        <i class="material-icons">directions_bus</i><br></br>
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

