import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { UserContext } from "./App";
import { useContext } from "react";

const url = "https://localhost:7022";
const apiPath = url + "/api/category/";
const photoPath = url + "/img/content/";
function Home() {
  let [ctg, setCtg] = useState([]);
  
  const {user, setUser} = useContext(UserContext);

  useEffect(()=>{
    if(ctg.length === 0){
      fetch(apiPath)
      .then(r=>r.json())
      .then(j=>setCtg(j));
    }
  });
  const btnClick = () => setUser({name: 'User'});
  return (
    <div className="Home">
      <h1>Home</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {ctg.map(c => <CategoryCard category={c} key={c.id} />)}
      </div>
    </div>
  );
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