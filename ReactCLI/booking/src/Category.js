import {useEffect} from 'react';
import { useParams } from 'react-router';
const url = "https://localhost:7022"
const apiPath = url + "/api/location/";
const photoPath = url + "/img/content/";
function Category() {
  const { slug } = useParams();

useEffect(()=>{
  console.log(apiPath + slug);
}, [slug]);

  return (
    <div className="Category">
      <h1>Category {slug}</h1>
    </div>
  );
}

export default Category;