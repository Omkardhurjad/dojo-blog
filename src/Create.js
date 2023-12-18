import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const Create = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    try {
      await fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });

      console.log("New Blog added");
      setIsPending(false);

      // Use navigate('/') to navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Error adding blog:", error);
      setIsPending(false);
    }
  };

  return (
    <div className="create">
      <h2>Add a Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title : </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body : </label>
        <textarea
          required
          placeholder="required"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">Mario</option>
          <option value="yoshi">Yoshi</option>
        </select>
        {!isPending && (
          <button type="submit" id="uniqueButton">
            Add Blog
          </button>
        )}
        {isPending && (
          <button disabled type="submit" id="uniqueButton">
            Adding Blog
          </button>
        )}
      </form>
    </div>
  );
};

export default Create;
