import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid"><Link className="navbar-brand" to="/">REACT</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/admin">Admin</Link>
              <Link className="nav-link" to="/category">Category</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="sub-header">
        <h2>Ваш найкращий вибір</h2>
        <h3>Це ми</h3>
      </div>
      <div className="container">
        <Outlet />
      </div>
      <footer className="bg-light">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item"><Link class="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link class="nav-link" to="/admin">Admin</Link></li>
          <li className="nav-item"><Link class="nav-link" to="/category/hotel">Category Hotel</Link></li>
          <li className="nav-item"><Link class="nav-link" to="/category/apartment">Category Apartment</Link></li>
        </ul>
        <p className="text-center text-muted">&copy; 2024 IT STEP University</p>
      </footer>
    </>
  )
};

export default Layout;