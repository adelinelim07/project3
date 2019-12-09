const Login = () => {
  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="/public/css/login-style.css"
        />
      </head>

      <div>
        <img
          class="mb-4"
          src="/images/futureprintlogo.jpg"
          alt=""
          width="50%"
          height="50%"
        />
        <h1 class="h3 mb-3 font-weight-normal">Login Page</h1>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <form class="form-signin" action="/sessions" method="POST">
              <label for="inputEmail" class="sr-only">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                class="form-control"
                placeholder="Username"
                required
                autofocus
              />
              <label for="inputPassword" class="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="form-control"
                placeholder="Password"
                required
              />
              <button class="btn btn-lg btn-danger btn-block" type="submit">
                Sign in
              </button>
              <p class="mt-5 mb-3 text-muted">Travel Organiser &copy; 2019</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
