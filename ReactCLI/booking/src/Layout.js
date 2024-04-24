import { Outlet, Link } from "react-router-dom";
import { UserContext } from "./App";
import { useContext, useState } from "react";
const url = "https://localhost:7022";

const Layout = () => {
  const {user, setUser} = useContext(UserContext);
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
          {!!user && <b>Avatar</b>}
          {!!user || <b>Sign In</b>}
        </div>
        <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal"
        data-bs-target="#authModal"><i className="bi bi-person-check-fill"></i></button>
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
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/category/hotel">Category Hotel</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/category/apartment">Category Apartment</Link></li>
        </ul>
        <p className="text-center text-muted">&copy; 2024 IT STEP University</p>
      </footer>
      <AuthModal />
    </>
  )
};

function AuthModal() {
  const {user, setUser} = useContext(UserContext);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  const onEmailChange = e => setEmail(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);
  
  const authClick = () => {
    if(email === "") {
      setErrorMessage("Заповніть 'електронну пошту'");
      return;
    }
    if(password === "") {
      setErrorMessage("Заповніть 'пароль'");
      return;
    }
    setErrorMessage("");
    fetch(`${url}/api/auth?e-mail=${email}&password=${password}`)
    .then(r => {
        if (r.status != 200) {
          setErrorMessage("Вхід скасовано, перевірте введені дані");
        }
        else {
          setErrorMessage("");
          setUser({name: "User"});
        }
    });
  };
  return <div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="authModalLabel">Автентифікація (вхід до сайту)</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text" id="auth-email-icon"><i className="bi bi-envelope-at"></i></span>
              <input type="text" className="form-control" placeholder="Email"
                  aria-label="Email" aria-describedby="auth-email-icon" value={email} onChange={onEmailChange}/>
            </div>
          </div>
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text" id="auth-password-icon"><i className="bi bi-lock"></i></span>
              <input type="password" className="form-control" placeholder="Пароль"
                  aria-label="Password" aria-describedby="auth-password-icon" value={password} onChange={onPasswordChange}/>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          {errorMessage.length > 0 && <div className="alert alert-warning" role="alert">{errorMessage}</div>}
          <div className="spacer"></div>
          <button type="button" className="btn btn-primary" onClick={authClick}>Вхiд</button>
        </div>
      </div>
    </div>
  </div>;
}

export default Layout;