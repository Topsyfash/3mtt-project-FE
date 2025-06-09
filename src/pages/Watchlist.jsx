import React, { useEffect, useState } from "react";
import API from '../services/api';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    API.get('/watchlist')
      .then(({ data }) => setWatchlist(data || []))
      .catch(() => alert('Failed to fetch watchlist'));
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/watchlist/${id}`);
      setWatchlist((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert('Failed to delete from watchlist');
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-600">No movies in your watchlist yet.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="w-44 bg-white rounded shadow hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={`/movie/${item.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
                    alt={item.title}
                    className="w-full rounded-t"
                  />
                  <h4 className="text-lg font-medium p-2">{item.title}</h4>
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-b focus:outline-none"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Watchlist;
