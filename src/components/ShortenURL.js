import { useState } from "react";
import { Link } from "react-router-dom";
import { shortenURL } from "../utils/networkHandler";

const ShortenURL = ({ isLogged }) => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage("Loading.....");
    if (/(http(s?)):\/\//i.test(longURL)) {
      let res = await shortenURL(longURL);
      setMessage("");
      setShortURL(res.shortURL);
    } else {
      let newURL = "https://" + longURL;
      setLongURL(newURL);
      let res = await shortenURL(newURL);
      setMessage("");
      setShortURL(res.shortURL);
    }
  };

  return (
    <div className="text-center">
      {isLogged && (
        <div className="form-signin">
          <h1 className="h3 mt-2 mb-3 fw-normal">URL Shortner</h1>
          <div className="form-floating">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter long URL"
                value={longURL}
                onChange={(e) => setLongURL(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSubmit}>
                Shorten
              </button>
            </div>
          </div>
          {shortURL.length > 0 && (
            <div className="form-floating">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Short URL"
                  value={shortURL}
                  readOnly
                />
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(shortURL);
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          )}
          <p style={{ color: "red" }}>{message}</p>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      )}
      {!isLogged && (
        <>
          <h3>You have to be logged in to access this page</h3>{" "}
          <Link to="/">Login</Link>{" "}
        </>
      )}
    </div>
  );
};

export default ShortenURL;
