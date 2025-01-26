import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

function EventPage() {
  const [events, setEvents] = useState([]); // Initially no events
  const [newEvent, setNewEvent] = useState(""); // Input for new event
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [savedData, setSavedData] = useState({}); 

  const categories = {
    Catering: ["NAME", "DURATION OF ACTIVITY", "STAFF ASSIGNED", "MENU"],
    Photography: ["NAME", "DURATION", "STAFF NAME"],
    Decoration: ["TEAM NAME", "DURATION", "START OF DECORATING"],
  };

  const handleAddEvent = async () => {
    if (newEvent.trim() === "") {
      alert("PLEASE ENTER A VALID EVENT NAME.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventName: newEvent }),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      const result = await response.json();
      console.log(result);
      setEvents((prev) => [...prev, newEvent.toUpperCase()]);
      setNewEvent("");
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Could not add event. Please try again.");
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFormData(savedData[selectedEvent]?.[category] || {});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async () => {
    console.log("FORM DATA SUBMITTED:", formData);

    // Check if the selected category is Catering
    if (selectedCategory === "Catering") {
      try {
        const response = await fetch("http://localhost:3001/add-catering", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData["NAME"],
            duration: formData["DURATION OF ACTIVITY"],
            staffAssigned: formData["STAFF ASSIGNED"],
            menu: formData["MENU"],
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save catering details");
        }

        const result = await response.json();
        console.log(result);
        alert("Catering details saved successfully!");
      } catch (error) {
        console.error("Error saving catering details:", error);
        alert("Could not save catering details. Please try again.");
      }
    }

    // Check if the selected category is Photography
    if (selectedCategory === "Photography") {
      try {
        const response = await fetch("http://localhost:3001/add-photography", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData["NAME"],
            duration: formData["DURATION"],
            staffNames: formData["STAFF NAME"],
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save photography details");
        }

        const result = await response.json();
        console.log(result);
        alert("Photography details saved successfully!");
      } catch (error) {
        console.error("Error saving photography details:", error);
        alert("Could not save photography details. Please try again.");
      }
    }

    // Check if the selected category is Decoration
    if (selectedCategory === "Decoration") {
      try {
        const response = await fetch("http://localhost:3001/add-decoration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamName: formData["TEAM NAME"],
            duration: formData["DURATION"],
            startOfDecorating: formData["START OF DECORATING"],
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save decoration details");
        }

        const result = await response.json();
        console.log(result);
        alert("Decoration details saved successfully!");
      } catch (error) {
        console.error("Error saving decoration details:", error);
        alert("Could not save decoration details. Please try again.");
      }
    }

    // Clear the form and reset state
    setSavedData((prev) => ({
      ...prev,
      [selectedEvent]: {
        ...prev[selectedEvent],
        [selectedCategory]: formData,
      },
    }));
    
    setSelectedCategory(null);
  };

  return (
    <div className="event-page">
      <GlobalStyle />

      {/* Full-width Welcome Message */}
      <div className="welcome-message">WELCOME To ManageMate</div>

      {/* Main Content */}
      <div className="main-content">
        {/* Section 1: Event List */}
        <div className="event-list">
          <h2>YOUR EVENTS</h2>

          {/* Input to Add New Event */}
          <div className="add-event">
            <input
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="ENTER EVENT NAME"
              className="event-input"
            />
            <button onClick={handleAddEvent} className="add-event-button">
              ADD EVENT
            </button>
          </div>

          {/* List of Events */}
          {events.map((event, index) => (
            <div
              key={index}
              className={`event-item ${selectedEvent === event ? "active" : ""}`}
              onClick={() => handleEventClick(event)}
            >
              {event}
            </div>
          ))}
        </div>

        {/* Section 2: Categories */}
        <div className="category-section">
          {selectedEvent && !selectedCategory && (
            <>
              <h2>{selectedEvent} CATEGORIES</h2>
              <div className="category-list">
                {Object.keys(categories).map((category, index) => (
                  <div
                    key={index}
                    className="category-item"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.toUpperCase()}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Section 3: Form for Category Details */}
          {selectedCategory && (
            <>
              <h2>{selectedCategory} DETAILS</h2>
              <div className="form-container">
                {categories[selectedCategory].map((field, index) => (
                  <div key={index} className="form-field">
                    <label>{field}</label>
                    <input
                      type="text"
                      value={formData[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      placeholder={`ENTER ${field}`}
                    />
                  </div>
                ))}
                <button className="submit-button" onClick={handleFormSubmit}>
                  SAVE DETAILS
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .welcome-message {
    font-size: 36px;
    font-weight: bold;
    color: #5E239D;
    text-align: center;
    width: 100%;
    padding: 20px;
    background-color: #7F3D9D;
    color: white;
  }

  .main-content {
    display: flex;
    flex-direction: row;
    height: calc(100vh - 80px);
  }

  .event-list {
    flex: 1;
    background-color: #FFFFFF;
    padding: 20px;
    border-right: 1px solid #DDD;
  }

  .add-event {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .event-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #DDD;
    border-radius: 8px;
    margin-right: 10px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .add-event-button {
    background-color: #7F3D9D;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    font-size: 16px;
    font-weight: bold;
  }

  .add-event-button:hover {
    background-color: #9B60B8;
  }

  .event-item {
    background-color: #EFEFEF;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-transform: uppercase;
    font-weight: bold;
  }

  .event-item.active {
    background-color: #D1A6D1;
    color: white;
  }

  .category-section {
    flex: 2;
    padding: 20px;
    background-color: #FFFFFF;
  }

  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .category-item {
    background-color: #EFEFEF;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-transform: uppercase;
    font-weight: bold;
  }

  .form-container {
    margin-top: 20px;
  }

  .form-field {
    margin-bottom: 15px;
  }

  .form-field label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  .form-field input {
    width: 100%;
    padding: 10px;
    border: 1px solid #DDD;
    border-radius: 8px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .submit-button {
    background-color: #7F3D9D;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    font-size: 16px;
    font-weight: bold;
  }

  .submit-button:hover {
    background-color: #9B60B8;
  }
`;

export default EventPage;
