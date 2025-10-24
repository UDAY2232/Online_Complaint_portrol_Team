import React, { useState } from "react";

function AnonymousForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    priority: "",
    file: null,
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object for file + text data
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("priority", formData.priority);
      if (formData.file) {
        data.append("file", formData.file);
      }

      // Send request to backend
      const response = await fetch("http://localhost:5000/api/anonymous", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Complaint submitted successfully!");
        console.log("Submitted Data:", formData);

        // Clear form
        setFormData({
          name: "",
          category: "",
          description: "",
          priority: "",
          file: null,
        });
      } else {
        alert("❌ Failed to submit complaint: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("⚠️ Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="text-blue-600 text-5xl mb-3">📄</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Submit Anonymous Complaint
          </h1>
          <p className="text-gray-500 text-sm">
            Your identity will remain confidential
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name (Optional)
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Leave blank for complete anonymity"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Complaint Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Select a category</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="academic">Academic</option>
              <option value="administration">Administration</option>
              <option value="harassment">Harassment</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please describe your complaint in detail..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            ></textarea>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Priority Level *
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Attach Evidence (Optional)
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full text-gray-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default AnonymousForm;
