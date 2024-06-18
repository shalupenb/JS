import {useState, useEffect, useCallback, useReducer} from 'react';
import {Link} from "react-router-dom";
import { UserContext } from "./App";
import { useContext } from "react";

const url = "https://localhost:7022";
const apiPath = url + "/api/category";
const photoPath = url + "/img/content/";

function reducer(state, action) {
  switch (action.type) {
    case 'loadCategories': {
      return {
        ...state,
        categories: action.payload
      };
    }
    case 'deleteCategory': {
        let newState = {...state};
        newState.categories.find(c => c.id === action.payload).deleteDt = new Date().toDateString();
        return newState;
    }
    case 'restoreCategory': {
      let newState = {...state};
      newState.categories.find(c => c.id === action.payload).deleteDt = null;
      return newState;
  }
  }
}

function Home() {
  //let [ctg, setCtg] = useState([]);
  let [state, dispatch] = useReducer(reducer, { categories: [] });

  const {user, token} = useContext(UserContext);

  useEffect(()=>{
    console.log(state);
    if(state.categories.length === 0){
      loadCategories();
    }
  });
  const loadCategories = useCallback(() => {
    fetch(apiPath, {
      headers: (token ? {'Authorization' : `Bearer ${token.id}`} : {})
    })
      .then(r=>r.json())
      .then(j=>dispatch({ type: 'loadCategories', payload: j }));
  });
  const editCardClick = useCallback((category) => {
    console.log(category);
  });
  return (
    <div className="Home">
      <h1>Home</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {state.categories.map(c => <CategoryCard category={c} key={c.id} dispatch={dispatch} editCardClick={editCardClick}/>)}
      </div>
      {user != null && user.role === "Admin" && <AdminCategoryForm reloadCategories={loadCategories} />}
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
        if (r.status === 201) {
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
  const {user, token} = useContext(UserContext);
  const delClick = useCallback(() => {
    if (window.confirm("Ви підтверджуєте видалення категорії?")) {
      fetch(`${apiPath}/${props.category.id}`, { 
        method: 'DELETE',
        headers: (token ? {'Authorization' : `Bearer ${token.id}`} : {}) 
      }).then(r => {
          if (r.status < 400) {
              props.dispatch({type: 'deleteCategory', payload: props.category.id});
          }
          else {
              alert("Виникла помилка видлаення");
          }
      })
  }
  });
  const restoreClick = useCallback(() => {
    if (window.confirm("Ви підтверджуєте відновлення категорії?")) {
      fetch(`${apiPath}?id=${props.category.id}`, { 
        method: 'RESTORE',
        headers: (token ? {'Authorization' : `Bearer ${token.id}`} : {}) 
      }).then(r => {
          if (r.status < 400) {
              props.dispatch({type: 'restoreCategory', payload: props.category.id});
          }
          else {
              alert("Виникла помилка відновлення");
          }
      })
  }
  });
  const editClick = useCallback(() => {
    props.editCardClick(props.category);
  });
  const deleteDtStr = props.category.deleteDt;
  const deleteDt = new Date(deleteDtStr);

  const readableDeleteDt = deleteDt.toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return (<div className="col">
    <div className={"card  h-100 " + (props.category.deleteDt ? "card-deleted" : "")}>
        <Link to={"category/" + props.category.slug}>
            <img src={photoPath + (props.category.photoUrl ?? "no-image.jpg")} className="card-img-top" alt="category" />
            <div className="card-body">
              { !!props.category.deleteDt &&
                <i>Видалено {readableDeleteDt}</i>
              }
                <h5 className="card-title">{props.category.name}</h5>
                <p className="card-text">{props.category.description}</p>
            </div>
        </Link>
        {user != null && user.role === "Admin" &&
          <div className="cord-footer">
            { !!props.category.deleteDt &&
              <button className="btn btn-outline-success"
                onClick={restoreClick}>
                Restore
              </button>
            }
            { !props.category.deleteDt &&
              <button className="btn btn-outline-danger"
                  onClick={delClick}>
                Del
              </button>
            }
            <button className="btn btn-outline-warning"
                onClick={editClick}
            >Edit</button>
          </div>
        }
    </div>
  </div>);
}


export default Home;