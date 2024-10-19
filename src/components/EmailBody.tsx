import  { useEffect, useState } from "react";
import { getEmailById } from "../apis/getAllEmails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toggleFavorite } from "../utils/emailsSlice";
import { RootState } from "../utils/store";

const EmailBody = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const emailInfo = useSelector((state: RootState) => state.singleEmail);
  const dispatch = useDispatch();
  const [emailData, setEmailData] = useState("");
  const markFavorite = (id: string) => {
    console.log("making favorite");

    dispatch(toggleFavorite(id));
  };
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        if (id) {
          const fetchedEmail = await getEmailById(id);
          // console.log(fetchedEmail);

          setEmailData(fetchedEmail.body);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmail();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6 bg-white rounded-lg border-2 w-2/3 h-screen">
      {/* Email Header */}
      <div className="flex justify-between items-start pb-4 mb-4">
        <div className="flex items-center">
          <div className="bg-[#E54065] text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
            {emailInfo.from.name[0]}
            {/* Assuming this is the sender's initial */}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{emailInfo.subject}</h2>
            <p className="text-sm text-gray-500">
              {new Date(emailInfo.date).toLocaleDateString()}{" "}
              {new Date(emailInfo.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {/* {emailData.senderEmail} */}
            </p>
            <p className="text-sm text-gray-500">{/* {emailData.date} */}</p>
          </div>
        </div>
        <button
          onClick={() => markFavorite(id)}
          className="text-white mr-4 px-4 py-1 rounded-2xl bg-[#E54065] text-sm"
        >
          Mark as favorite
        </button>
      </div>

      {/* Email Body */}
      <div className="px-16 mt-4">
        <p
          dangerouslySetInnerHTML={{ __html: emailData }}
          className="text-sm text-gray-700 leading-relaxed whitespace-pre-line"
        ></p>
      </div>
    </div>
  );
};

export default EmailBody;
