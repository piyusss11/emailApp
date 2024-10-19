import { useDispatch, useSelector } from "react-redux";
import EmailBody from "./components/EmailBody";
import ListOfEmails from "./components/ListOfEmails";
import { RootState } from "./utils/store";
import { addAllEmails, Email } from "./utils/emailsSlice";
import { getAllEmails } from "./apis/getAllEmails";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const emails = useSelector((state: RootState) => state.emails.emails);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>(emails); // Local state for filtered emails
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const fetchedEmails = await getAllEmails();
        const emailsWithDefaults = fetchedEmails.list.map((email: Email) => ({
          ...email,
          isFavorite: false, // default value for isFavorite
          isRead: false,     // default value for isRead
        }));

        dispatch(addAllEmails(emailsWithDefaults));
        setFilteredEmails(emailsWithDefaults); // Set the initial email list
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [dispatch]);

  const handleFilter = (filter: string) => {
    let filtered:Email[] = [];
    if (filter === "unread") {
      filtered = emails.filter((email) => email.isRead === false);
    } else if (filter === "read") {
      filtered = emails.filter((email) => email.isRead === true);
    } else if (filter === "favorites") {
      filtered = emails.filter((email) => email.isFavorite === true);
    }
    setFilteredEmails(filtered); // Set the filtered emails in local state
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="w-full p-10 h-screen">
        {/* filters */}
        <div className="w-[28%] bg-green-300 flex justify-between items-center">
          <h1>Filter By:</h1>
          <div className="flex gap-8 mr-8">
            <button
              onClick={() => handleFilter("unread")}
              className="bg-gray-300 rounded-2xl py-1 px-2"
            >
              Unread
            </button>
            <button
              onClick={() => handleFilter("read")}
              className="bg-gray-300 rounded-2xl py-1 px-2"
            >
              Read
            </button>
            <button
              onClick={() => handleFilter("favorites")}
              className="bg-gray-300 rounded-2xl py-1 px-2"
            >
              Favorites
            </button>
          </div>
        </div>
        <div className="flex gap-6 h-full">
          {/* email list */}
          <ListOfEmails emails={filteredEmails} /> {/* Pass filtered emails */}
          {/* email body */}
          <Routes>
              <Route
                path="/"
                
              />
              <Route path="/email/:id" element={<EmailBody />} />
            </Routes>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
