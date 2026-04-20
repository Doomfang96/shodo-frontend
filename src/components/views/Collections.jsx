import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth.jsx";
import "./Collections.scss";
import { API_BASE_URL } from "../../config.js";

function Collections() {
  const { loggedInUser, authLoading } = useAuth();

  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [items, setItems] = useState([]);

  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!loggedInUser) return;

    const fetchCollections = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/collections`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load collections");
          return;
        }

        setCollections(data.data || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load collections");
      }
    };

    fetchCollections();
  }, [loggedInUser]);

  useEffect(() => {
    if (!selectedCollectionId) return;

    const fetchItems = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/study-items/${selectedCollectionId}`,
          {
            credentials: "include",
          },
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load study items");
          return;
        }

        setItems(data.data || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load study items");
      }
    };

    fetchItems();
  }, [selectedCollectionId]);

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/collections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create collection");
        return;
      }

      setCollections((prev) => [...prev, data.data]);
      setTitle("");
    } catch (error) {
      console.error(error);
      setError("Failed to create collection");
    }
  };

  const handleCreateStudyItem = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedCollectionId) {
      setError("Select a collection first");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/study-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          collection_id: selectedCollectionId,
          prompt,
          answer,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create study item");
        return;
      }

      setItems((prev) => [...prev, data.data]);
      setPrompt("");
      setAnswer("");
    } catch (error) {
      console.error(error);
      setError("Failed to create study item");
    }
  };

  if (authLoading) return <p>Loading</p>;
  if (!loggedInUser) return <p>Please log in first</p>;

  return (
    <div className="collectionsPage">
      <h1>Collections</h1>

      {/* Create Collection */}
      <div className="collectionsSection">
        <form className="formRow" onSubmit={handleCreateCollection}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Collection title"
          />
          <button type="submit">Create</button>
        </form>

        {error && <p className="message">{error}</p>}

        {collections.length === 0 ? (
          <p className="message">No collections found</p>
        ) : (
          <ul className="collectionsList">
            {collections.map((collection) => (
              <li
                key={collection.id}
                onClick={() => {
                  setSelectedCollectionId(collection.id);
                  setItems([]);
                }}
              >
                {collection.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Study Items */}
      {selectedCollectionId && (
        <div className="itemsSection">
          <h2>Study Items</h2>

          <form className="formRow" onSubmit={handleCreateStudyItem}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Prompt"
            />
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer"
            />
            <button type="submit">Add</button>
          </form>

          {items.length === 0 ? (
            <p className="message">No study items found</p>
          ) : (
            <ul className="itemsList">
              {items.map((item) => (
                <li key={item.id}>
                  {item.prompt} - {item.answer}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Collections;
