// Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-200 flex flex-col items-center justify-center px-6 py-12">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-white mb-4 text-center drop-shadow-md">
        Online Complaint & <br /> Grievance Portal
      </h1>

      <p className="text-lg text-white mb-8 text-center max-w-2xl leading-relaxed">
        This platform allows users to submit complaints anonymously or publicly, track status updates, 
        and helps administrators resolve them efficiently with comprehensive reporting and analytics.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-16">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 transition"
        >
          Login / Signup
        </button>
        <button
          onClick={() => navigate("/anonymous")}
          className="px-6 py-3 bg-blue-100 text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-200 transition"
        >
          Submit Anonymously
        </button>
      </div>

      {/* Key Features */}
      <h2 className="text-2xl font-bold text-white mb-8 text-center drop-shadow-md">
        Key Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="text-blue-600 text-4xl mb-3">🛡️</div>
          <h3 className="font-bold text-lg mb-2">Anonymous or Verified Submission</h3>
          <p className="text-gray-600 text-sm">Submit complaints with or without creating an account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="text-blue-600 text-4xl mb-3">🔔</div>
          <h3 className="font-bold text-lg mb-2">Status Tracking & Escalation</h3>
          <p className="text-gray-600 text-sm">Real-time updates and automatic escalation system</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="text-blue-600 text-4xl mb-3">🧭</div>
          <h3 className="font-bold text-lg mb-2">Admin Resolution Dashboard</h3>
          <p className="text-gray-600 text-sm">Efficient complaint management and resolution tools</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="text-blue-600 text-4xl mb-3">📈</div>
          <h3 className="font-bold text-lg mb-2">Reports & Analytics</h3>
          <p className="text-gray-600 text-sm">Comprehensive insights and data visualization</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
