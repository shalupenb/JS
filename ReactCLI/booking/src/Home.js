import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
const url = "https://localhost:7022"
const apiPath = url + "/api/category/";
const photoPath = url + "/img/content/";
function Home() {
  let [ctg, setCtg] = useState([]);
  
  useEffect(()=>{
    if(ctg.length == 0){
      fetch(apiPath)
      .then(r=>r.json())
      .then(j=>setCtg(j));
    }
  })
  
  return (
    <div className="Home">
      <h1>Home</h1>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        {ctg.map(c => <CategoryCard category={c} key={c.id} />)}
      </div>
    </div>
  );
}
function CategoryCard(props) {
  return (<div class="col">
  <div class="card  h-100">
      <Link to={"category/" + props.category.slug}>
          <img src={photoPath + props.category.photoUrl} class="card-img-top" alt="image" />
          <div class="card-body">
              <h5 class="card-title">{props.category.name}</h5>
              <p class="card-text">{props.category.description}</p>
          </div>
      </Link>
  </div>
</div>);
}

export default Home;