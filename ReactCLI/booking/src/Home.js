import {useState, useEffect, useCallback, useReducer} from 'react';
import {Link} from "react-router-dom";
import { UserContext } from "./App";
import { useContext } from "react";

const url = "https://localhost:7022";
const apiPath = url + "/api/category/";
const photoPath = url + "/img/content/";

function reducer(state, action) {
  switch (action.type) {
    case 'loadCategories': {
      return {
        ...state,
        categories: action.payload
      };
    }
  }
}

function Home() {
  //let [ctg, setCtg] = useState([]);
  let [state, dispatch] = useReducer(reducer, { categories: [] });

  const {user, setUser} = useContext(UserContext);

  useEffect(()=>{
    console.log(state);
    if(state.categories.length === 0){
      loadCategories();
    }
  });
  const loadCategories = useCallback(() => {
    fetch(apiPath)
      .then(r=>r.json())
      .then(j=>dispatch({ type: 'loadCategories', payload: j }));
  });
  return (
    <div className="Home">
      <h1>Home</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {state.categories.map(c => <CategoryCard category={c} key={c.id} />)}
      </div>
      {user != null && user.role == "Admin" && <AdminCategoryForm reloadCategories={loadCategories} />}
    </div>
  );
}

function AdminCategoryForm(props) {
  /* useCallback - хук, що дозволяє не створювати функцію повторно з кожним перезапуском AdminCategoryForm() */
  const formSubmit = useCallback(e => {
    const form = e.target;
    e.preventDefault();
    let formData = new FormData(form);
    // console.log(formData);
    fetch(apiPath, {
        method: 'POST',
        body: formData
    }).then(r => {
        console.log(r);
        if (r.status == 201) {
            props.reloadCategories();
        }
        else {
            r.text().then(alert);
        }
    });
  });
  return <>
    <hr />
    <form id="category-form" method="post" encType="multipart/form-data" onSubmit={formSubmit}>
      <div className="row">
        <div className="col">
          <div className="input-group mb-3">
            <span className="input-group-text" id="category-name"><i className="bi bi-person-vcard"></i></span>
            <input type="text" className="form-control"
                placeholder="Назва" name="category-name"
                aria-label="Category Name" aria-describedby="category-name" />
            <div className="invalid-feedback">Ім'я не може бути порожнім</div>
          </div>
        </div>
        <div className="col">
          <div className="input-group mb-3">
            <span className="input-group-text" id="category-description"><i className="bi bi-file-text"></i></span>
            <input type="text" className="form-control"
                name="category-description" placeholder="Опис"
                aria-label="Description" aria-describedby="category-description" />
            <div className="invalid-feedback">Опис не може бути порожнім</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="input-group mb-3">
            <span className="input-group-text" id="category-slug"><i className="bi bi-link"></i></span>
            <input type="text" className="form-control" placeholder="Slug"
                name="category-slug"
                aria-label="Category Slug" aria-describedby="category-slug" />
          </div>
        </div>
        <div className="col">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="category-photo"><i className="bi bi-image"></i></label>
            <input type="file" className="form-control" name="category-photo" id="category-photo" />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <button type="submit" className="btn btn-secondary"
              name="category-button" value="true">
            Зберегти
          </button>
        </div>
      </div>
      <input type="hidden" name="category-id" value="" />
    </form>
    <hr />
  </>
}

function CategoryCard(props) {
  return (<div className="col">
  <div className="card  h-100">
      <Link to={"category/" + props.category.slug}>
          <img src={photoPath + (props.category.photoUrl ?? "no-image.jpg")} className="card-img-top" alt="category" />
          <div className="card-body">
              <h5 className="card-title">{props.category.name}</h5>
              <p className="card-text">{props.category.description}</p>
          </div>
      </Link>
  </div>
</div>);
}


export default Home;