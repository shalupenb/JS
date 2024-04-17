import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid"><a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link class="nav-link" to="/">Home</Link>
              <Link class="nav-link" to="/admin">Admin</Link>
              <Link class="nav-link" to="/category">Category</Link>
            </div>
          </div>
        </div>
      </nav>
      <div class="container">
        <Outlet />
      </div>
      <footer class="bg-light">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item"><Link class="nav-link" to="/">Home</Link></li>
          <li class="nav-item"><Link class="nav-link" to="/admin">Admin</Link></li>
          <li class="nav-item"><Link class="nav-link" to="/category">Category</Link></li>
        </ul>
        <p class="text-center text-muted">&copy; 2024 IT STEP University</p>
      </footer>
    </>
  )
};

export default Layout;