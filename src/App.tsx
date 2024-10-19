import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./utils/store";
import { addAllEmails, Email } from "./utils/emailsSlice";
import { getAllEmails } from "./apis/getAllEmails";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmailBody from "./components/EmailBody";
import ListOfEmails from "./components/ListOfEmails";

function App() {
  const emails = useSelector((state: RootState) => state.emails.emails);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>(emails);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const fetchedEmails = await getAllEmails();
        const emailsWithDefaults = fetchedEmails.list.map((email: Email) => ({
          ...email,
          isFavorite: false, // default value for isFavorite
          isRead: false, // default value for isRead
        }));

        dispatch(addAllEmails(emailsWithDefaults));
        setFilteredEmails(emailsWithDefaults);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [dispatch]);

  const handleFilter = (filter: string) => {
    let filtered: Email[] = [];

    if (selectedFilter === filter) {
      setSelectedFilter("");
      setFilteredEmails(emails);
      return;
    } else {
      setSelectedFilter(filter);
    }

    if (filter === "unread") {
      filtered = emails.filter((email) => email.isRead === false);
    } else if (filter === "read") {
      filtered = emails.filter((email) => email.isRead === true);
    } else if (filter === "favorites") {
      filtered = emails.filter((email) => email.isFavorite === true);
    }

    setFilteredEmails(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="w-full p-10 h-screen bg-[#f4f5f9]">
        <div className="w-[28%] mb-4 flex justify-between items-center">
          <h1>Filter By:</h1>
          <div className="flex gap-8 mr-8 ">
            <button
              onClick={() => handleFilter("unread")}
              className={`py-1 px-2 ${
                selectedFilter === "unread"
                  ? "bg-[#e1e4e4] rounded-2xl text-[#636363]"
                  : "bg-none"
              } `}
            >
              Unread
            </button>
            <button
              onClick={() => handleFilter("read")}
              className={`py-1 px-3 ${
                selectedFilter === "read"
                  ? "bg-[#e1e4e4] rounded-2xl text-[#636363]"
                  : "bg-none"
              } `}
            >
              Read
            </button>
            <button
              onClick={() => handleFilter("favorites")}
              className={`py-1 px-2 ${
                selectedFilter === "favorites"
                  ? "bg-[#e1e4e4] rounded-2xl text-[#636363]"
                  : "bg-none"
              } `}
            >
              Favorites
            </button>
          </div>
        </div>
        <div className="flex gap-6 h-full">
          <ListOfEmails emails={filteredEmails} />
          <Routes>
            <Route path="/" />
            <Route path="/email/:id" element={<EmailBody />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
