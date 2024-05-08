import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from './App';

const url = "https://localhost:7022"
const apiPath = url + "/api/room";
const photoPath = url + "/img/content/";

export default function Room() {
  const { slug } = useParams();
  const { user } = useContext(UserContext);
  const [room, setRoom] = useState({});

  useEffect(() => {
    loadRoom();
  }, [slug]);

  const loadRoom = useCallback(() => {
    fetch(`${apiPath}?slug=${slug}`, {method: 'PATCH'}).then(r => r.json()).then(setRoom);
  });

  return <>
  <div className="row">
    <div className="col col-8">
      <h1>Апартамент: {room.name} {room.id}</h1>
      <img src={photoPath + room.photoUrl} alt="room" />
      <p>{room.description}</p>
    </div>
    <div className="col col-4">

    </div>
  </div>
    { user != null && user.role == "Admin" && <AdminRoom /> }
  </>;
}

function AdminRoom() {
  return <>
    <h3>Управління кімнатою</h3>
  </>
}