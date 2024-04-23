import {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';

const url = "https://localhost:7022"
const apiPath = url + "/api/room/all/";
const photoPath = url + "/img/content/";

export default function Location() {
  const { slug } = useParams();
  let [rooms, setRooms] = useState([]);
  useEffect(() => {
    const _url = apiPath + slug;
    console.log(_url);
    fetch(_url).then(r => r.json()).then(setRooms);
  }, [slug]);

  return <>
    <h1>Location : {slug}</h1>
    <div className="row row-cols-1 row-cols-md-2 g-4">
        {rooms.map(r => <RoomCard room={r} key={r.id} />)}
    </div>
  </>;
}

function RoomCard(props) {
  return <div className="col">
    <div className="card h-100">
      <Link to={"/room/" + (props.room.slug ?? props.room.id)}>
      <img src={photoPath + (props.room.photoUrl ?? "no-image.jpg")} className="card-img-top" alt="room"/>
        <div className="card-body">
          <h5 className="card-title">{props.room.name}</h5>
          <p className="card-text">{props.room.description}</p>
        </div>
      </Link>
    </div>
  </div>;
}