import React from "react";
import { Email, toggleRead } from "../utils/emailsSlice";
import { useNavigate } from "react-router";
import { setContent } from "../utils/singleEmailSlice";
import { useDispatch } from "react-redux";
interface Props {
  email: Email;
}
const SingleEmail: React.FC<Props> = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickEmail = (id: string, data: Email) => {
    dispatch(setContent(data));
    dispatch(toggleRead(id));
    navigate(`/email/${id}`);
    console.log(data);
  };
  return (
    <li
      onClick={() => clickEmail(email.id, email)}
      key={email.id}
      className={` py-4 px-4 rounded-md flex items-start space-x-4 border-2 ${email.isRead ? "bg-gray-400": "bg-white"}`}
    >
      {/* Sender's Profile Picture */}
      <div className="w-12 h-12 rounded-full bg-[#E54065] text-white flex items-center justify-center font-bold">
        {email.from.name[0]}
      </div>
      {/* Email Details */}
      <div className="flex-1">
        <div className="text-sm text-gray-500">
          From:{" "}
          <span className="text-gray-500 font-semibold">
            {email.from.name} &lt;{email.from.email}
          </span>
          &gt;
        </div>
        <div className="text-sm text-gray-500 ">
          Subject:{" "}
          <span className="text-gray-500 font-semibold">{email.subject}</span>
        </div>
        <div className="text-gray-500 my-2 h-7 w-full overflow-hidden  ">
          {email.short_description}
        </div>
        <div className="flex items-center gap-8">

        <div className="text-xs text-gray-400 ">
          {new Date(email.date).toLocaleDateString()}{" "}
          {new Date(email.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </div>
        {email.isFavorite && (
            <span className="text-[#E54065] font-semibold block">Favorite</span>
        )}
        </div>
      </div>
    </li>
  );
};

export default SingleEmail;
