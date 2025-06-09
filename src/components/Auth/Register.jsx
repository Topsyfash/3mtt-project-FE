import React, { useState } from 'react';
import API from '../../services/api.js';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const [form, setForm] = useState({ userName: '', email: '', password: '' });
    const navigate = useNavigate()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', form);
            toast.success('Registration successful. You can now login.');
navigate("/login")
        } catch (err) {
            toast.error('Registration failed: ' + err?.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 min-h-[60vh] sm:min-h-[80vh]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 sm:p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

                <input
                    name="userName"
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold"
                >
                    Register
                </button>
                <p>Already Registered? <Link
          to={`/login`}
          className='text-blue-500 hover:text-blue-700'
        >Login Here</Link></p>
            </form>
        </div>
    );
};

export default Register;
