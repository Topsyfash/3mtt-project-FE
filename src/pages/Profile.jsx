import React, { useEffect, useState } from "react";
import API from "../services/api";

const Profile = () => {
  const [user, setUser] = useState({ userName: "", email: "" });
  const [form, setForm] = useState({ userName: "", email: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // 'success', 'error', 'info'

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/user/profile");
        setUser(data.user || data);
        setForm({
          userName: data.user?.userName || "",
          email: data.user?.email || "",
        });
      } catch {
        setMessage("Failed to load profile");
        setMessageType("error");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    if (form.email !== user.email) payload.email = form.email;
    if (form.userName !== user.userName) payload.userName = form.userName;

    if (Object.keys(payload).length === 0) {
      setMessage("No changes made");
      setMessageType("info");
      return;
    }

    try {
      await API.patch("/user/profile", payload);
      setMessage("Profile updated successfully!");
      setMessageType("success");
      setUser((prev) => ({ ...prev, ...payload }));
    } catch {
      setMessage("Failed to update profile");
      setMessageType("error");
    }
  };

  const getMessageColor = () => {
    switch (messageType) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update Profile
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm font-medium ${getMessageColor()}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
