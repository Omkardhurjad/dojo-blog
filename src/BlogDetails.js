import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isLoading,
  } = useFetch(" http://localhost:8000/blogs/" + id);

  const handleDelete = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="blog-details">
      {isLoading && <div>Loading...</div>}
      {error && <div> {error}</div>}
      {blog && (
        <article>
          <h2 style={{ textAlign: "center" }}>{blog.title}</h2>
          <p style={{ color: "#ff9a3c", textAlign: "right" }}>
            Written by {blog.author}
          </p>
          <div style={{ textAlign: "justify" }}>{blog.body}</div>
          <button id="uniqueButton" onClick={() => handleDelete(blog.id)}>
            {" "}
            Delete Blog
          </button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
