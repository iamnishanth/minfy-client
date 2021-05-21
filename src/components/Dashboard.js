import { useState, useEffect } from "react";
import { fetchLinks, getCount } from "../utils/networkHandler";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [count, setCount] = useState({
    thirtyDaysRecord: [],
    oneDayRecord: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetchLinks();
      setLinks(res);
      let date = await getCount();
      setCount(date);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="text-center">
      {!loading && (
        <div className="form-signin">
          <div>
            <h4 className="mb-2">
              URL shortened today - {count.oneDayRecord.length}
            </h4>
            <h4 className="mb-2">
              URL shortened this month - {count.thirtyDaysRecord.length}
            </h4>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Short URL</th>
                <th>Long URL</th>
                <th>Total Hits</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => {
                return (
                  <tr key={link._id}>
                    <td>{link.shortURL}</td>
                    <td>{link.longURL}</td>
                    <td>{link.hitCount}</td>
                    <td>{new Date(link.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {loading && <h3>Loading....</h3>}
    </div>
  );
};

export default Dashboard;
