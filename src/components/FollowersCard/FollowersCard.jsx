import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";
import { Link, useParams } from "react-router-dom";
const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const params = useParams();
  const profileUserId = params.id;

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="FollowerCard">
      <h3>People you may know</h3>
      {!profileUserId
        ? persons.map((person, id) => {
            if (person._id !== currentUser.user._id) {
              return <User person={person} key={id} userOneId={person._id} />;
            }
          })
        : persons.map((person, id) => {
            if (
              person._id !== profileUserId &&
              person._id !== currentUser.user._id
            ) {
              return <User person={person} key={id} userOneId={person._id} />;
            }
          })}
    </div>
  );
};

export default FollowersCard;
