import { useState } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `Please fill in the ${key} field`;
      }
    });

    if (formData.email && !formData.email.includes("@")) {
      newErrors.email = "Invalid email. Please check your email address.";
    }

    if (formData.phone) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Invalid phone number. Please enter a 10-digit phone number.";
      }
    }

    if (formData.dob) {
      const inputDate = new Date(formData.dob);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (inputDate > today) {
        newErrors.dob = "Invalid date of birth. Date cannot be in the future.";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.email === "Invalid email. Please check your email address.") {
        alert("Invalid email. Please check your email address.");
      }
      if (validationErrors.phone === "Invalid phone number. Please enter a 10-digit phone number.") {
        alert("Invalid phone number. Please enter a 10-digit phone number.");
      }
      if (validationErrors.dob === "Invalid date of birth. Date cannot be in the future.") {
        alert("Invalid date of birth. Date cannot be in the future.");
      }
    } else {
      // Form is valid
      alert("Form submitted successfully!");
      handleCloseModal();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({
      email: "",
      phone: "",
      username: "",
      dob: "",
    });
    setErrors({});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    if (e.target.className === "modal") {
      handleCloseModal();
    }
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button type="button" className="btnn" onClick={handleOpenModal}>
        Open Form
      </button>

      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <h1>Fill Details</h1>
            <form onSubmit={handleSubmit}>
              <div className="formindiv">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <div className="error">{errors.username}</div>
                )}
              </div>

              <div className="formindiv">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="formindiv">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength="10"
                />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>

              <div className="formindiv">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <div className="error">{errors.dob}</div>}
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;