import { useEffect } from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';

const url = "https://localhost:7022"
const apiPath = url + "/api/room/all/";
const photoPath = url + "/img/content/";

export default function Room() {
  const { slug } = useParams();
  return <>
    <h1>Room: {slug}</h1>
  </>;
}