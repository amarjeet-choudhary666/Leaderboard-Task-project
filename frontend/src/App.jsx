import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import UserSelector from "./components/UserSelector";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";
import ClaimHistory from "./components/ClaimHistory";

function App() {
  const [selectedUser, setSelectedUser] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refresh = () => {
    setRefreshFlag(prev => !prev);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-3xl mx-auto p-6">
          <Routes>
            <Route path="/" element={
              <>
                <h1 className="text-2xl font-bold text-center mb-6 font-poppins">🎯 Claim & Rank</h1>
                <UserSelector 
                  selectedUser={selectedUser} 
                  setSelectedUser={setSelectedUser} 
                />
                <ClaimButton 
                  selectedUser={selectedUser} 
                  onClaim={refresh} 
                />
              </>
            } />
            <Route path="/leaderboard" element={
              <Leaderboard refreshFlag={refreshFlag} />
            } />
            <Route path="/history" element={
              <ClaimHistory refreshFlag={refreshFlag} />
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;