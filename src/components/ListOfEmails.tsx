import React, { useState, useEffect } from "react";
import { getAllEmails } from "../apis/getAllEmails";
import { addAllEmails, Email, EmailsState } from "../utils/emailsSlice";
import { useDispatch } from "react-redux";
import {  useLocation } from "react-router-dom";
import SingleEmail from "./SingleEmail";

const ListOfEmails: React.FC<EmailsState> = ({ emails }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const fetchedEmails = await getAllEmails();
        const emailsWithDefaults = fetchedEmails.list.map((email: Email) => ({
          ...email,
          isFavorite: false, // default value for isFavorite
          isRead: false, // default value for isRead
        }));
        // console.log(emailsWithDefaults);

        dispatch(addAllEmails(emailsWithDefaults));
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
const emailWidthFull = location.pathname === "/" ? "w-full" : "w-1/3"
  return (
    <div className={emailWidthFull}>
      <ul className="flex flex-col gap-4">
        {emails.map((email) => (
          
            <SingleEmail email={email} key={email.id}/>
         
        ))}
      </ul>
    </div>
  );
};

export default ListOfEmails;
