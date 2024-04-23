import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
const url = "https://localhost:7022"
const apiPath = url + "/api/location/";
const photoPath = url + "/img/content/";
function Category() {
  const { slug } = useParams();
  let [locations, setLocations] = useState([]);

  useEffect(()=>{
    console.log(apiPath + slug);
    fetch(apiPath + slug)
    .then(r => r.json())
    .then(j => {
      setLocations(j);
    });
  }, [slug]);

  return (
    <div className="Category">
      <h1>Category {slug}</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {locations.map(loc => <LocationCard location={loc} key={loc.id} />)}
      </div>
    </div>
  );
}

function LocationCard(props){
  return <div className="col">
    <div className="card h-100">
      <Link to={"/location/" + props.location.slug}>
        <img src={photoPath + (props.location.photoUrl ?? "no-image.jpg")} className="card-img-top" alt="location"/>
        <div className="card-body">
          <h5 className="card-title">{props.location.name}</h5>
          <p className="card-text">{props.location.description}</p>
        </div>
      </Link>
    </div>
  </div>;
}

export default Category;