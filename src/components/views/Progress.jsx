import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth.jsx";
import "./Progress.scss";
import { API_BASE_URL } from "../../config.js";

function Progress() {
  const { loggedInUser, authLoading } = useAuth();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loggedInUser) return;

    const fetchSummary = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/progress/summary`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load progress");
          return;
        }

        setSummary(data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load progress");
      }
    };

    fetchSummary();
  }, [loggedInUser]);

  if (authLoading) return <p>Loading</p>;
  if (!loggedInUser) return <p>Please log in first.</p>;

  return (
    <div className="progressPage">
      <h1>Progress</h1>

      {error && <p>{error}</p>}

      {!summary ? (
        <p>Loading summary...</p>
      ) : (
        <div className="progressGrid">
          <div className="progressCard">
            <h2>Total Reviews</h2>
            <p>{summary.total_reviews}</p>
          </div>

          <div className="progressCard">
            <h2>Total Lapses</h2>
            <p>{summary.total_lapses}</p>
          </div>

          <div className="progressCard">
            <h2>Due Items</h2>
            <p>{summary.due_items}</p>
          </div>

          <div className="progressCard">
            <h2>Collections</h2>
            <p>{summary.total_collections}</p>
          </div>

          <div className="progressCard">
            <h2>Study Items</h2>
            <p>{summary.total_study_items}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Progress;
