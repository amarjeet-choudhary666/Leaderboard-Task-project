import React, { useEffect, useState } from 'react';
import { PlusIcon, UserCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function UserSelector({ selectedUser, setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUsers = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('http://localhost:3000/users');
      const data = await res.json();
      if (data.data) setUsers(data.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const addUser = async () => {
    if (!newUserName.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName.trim(), totalPoints: 0 }),
      });
      const data = await res.json();
      if (data.data) {
        setUsers((prev) => [...prev, data.data]);
        setNewUserName('');
        setSelectedUser(data.data._id); // Auto-select the new user
      }
    } catch (error) {
      console.error('Failed to add user', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <UserCircleIcon className="h-5 w-5 mr-2 text-indigo-500" />
          User Selection
        </h2>
        <button
          onClick={fetchUsers}
          disabled={isRefreshing}
          className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
          title="Refresh users"
        >
          <ArrowPathIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
        <div className="relative">
          <select
            className="w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Select a user --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.totalPoints} pts)
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Add New User</label>
        <div className="flex rounded-md shadow-sm">
          <input
            type="text"
            placeholder="Enter user name"
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addUser()}
            disabled={loading}
          />
          <button
            onClick={addUser}
            disabled={loading || !newUserName.trim()}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors
              ${(loading || !newUserName.trim()) ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <PlusIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
            )}
            Add
          </button>
        </div>
      </div>

      {selectedUser && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg flex items-center">
          <UserCircleIcon className="h-5 w-5 mr-2 text-indigo-500" />
          <span className="text-sm text-indigo-700">
            Selected: <span className="font-medium">{users.find(u => u._id === selectedUser)?.name}</span>
          </span>
        </div>
      )}
    </div>
  );
}