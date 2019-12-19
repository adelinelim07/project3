class MastHead extends React.Component {
  render() {
    return (
      <React.Fragment>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="../../css/dashboard-style.css"
          />
        </head>
        <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
          <header class="masthead mb-auto">
            <div class="inner">
              <h3 class="masthead-brand">TRAVEL LAH!</h3>
              <nav class="nav nav-masthead justify-content-center">
                <a class="nav-link active" href="#">
                  Home
                </a>
                <Link to="/" class="nav-link" onClick={()=>this.props.logout()}>
                  <a>LOG OUT</a>
                </Link>
              </nav>
            </div>
          </header>
        </div>
      </React.Fragment>
    );
  }
}
