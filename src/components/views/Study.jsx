import { CardContainer, Card } from "../UI/Card.jsx";
import { useEffect, useState } from "react";
import "./Study.scss";
import { useAuth } from "../../auth/useAuth.jsx";
import { API_BASE_URL } from "../../config.js";

function Study() {
  const { loggedInUser, authLoading } = useAuth();

  // state
  const [dueItems, setDueItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loggedInUser) return;

    const fetchDueItems = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/study-items/due`, {
          credentials: "include",
        });

        const data = await res.json();
        setDueItems(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDueItems();
  }, [loggedInUser]);

  const currentItem = dueItems[currentIndex];

  // handlers
  const handleReview = async (rating) => {
    if (!currentItem || submitting) return;

    setSubmitting(true);

    try {
      await fetch(`${API_BASE_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          study_item_id: currentItem.id,
          rating,
        }),
      });

      setShowAnswer(false);
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // view
  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!loggedInUser) {
    return <p>Please log in first</p>;
  }

  return (
    <>
      <h1>Study</h1>

      {!currentItem && <p>Session complete</p>}
      {currentItem && (
        <CardContainer>
          <Card>
            <p>{currentItem.prompt}</p>
            {showAnswer && <p>{currentItem.answer}</p>}
          </Card>

          {!showAnswer ? (
            <button onClick={() => setShowAnswer(true)}>Show Answer</button>
          ) : (
            <div>
              <button
                disabled={submitting}
                onClick={() => handleReview("again")}
              >
                Again
              </button>
              <button
                disabled={submitting}
                onClick={() => handleReview("hard")}
              >
                Hard
              </button>
              <button
                disabled={submitting}
                onClick={() => handleReview("good")}
              >
                Good
              </button>
              <button
                disabled={submitting}
                onClick={() => handleReview("easy")}
              >
                Easy
              </button>
            </div>
          )}
        </CardContainer>
      )}
    </>
  );
}

export default Study;
