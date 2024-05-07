import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from './App';

const url = "https://localhost:7022"
const apiPath = url + "/api/room/all/";
const photoPath = url + "/img/content/";

export default function Room() {
  const { slug } = useParams();
  const { user } = useContext(UserContext);
  return <>
    <h1>Room: {slug}</h1>
    { user != null && user.role == "Admin" && <AdminRoom /> }
  </>;
}

function AdminRoom() {
  return <>
    <h3>Управління кімнатою</h3>
  </>
}