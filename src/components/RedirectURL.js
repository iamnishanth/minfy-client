import { useState, useEffect } from "react";
import { redirectURL } from "../utils/networkHandler";
const BASE_URL = "https://minfy.netlify.app";

const RedirectURL = (props) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLongURL = async () => {
      let res = await redirectURL(BASE_URL + props.location.pathname);
      console.log(res);
      if (res.success) {
        window.location.replace(res.longURL);
      } else {
        setMessage("Invalid URL");
      }
    };
    fetchLongURL();
  }, []);

  return (
    <div>
      <h3>{message}</h3>
    </div>
  );
};

export default RedirectURL;
