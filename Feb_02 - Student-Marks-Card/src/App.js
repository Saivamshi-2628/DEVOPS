import React from "react";
import "./App.css";
import StudentCard from "./components/StudentCard";

// Parent component (App)
// - Stores ALL student data (name, roll number, marks array)
// - Passes data down to the child component using props
// - Demonstrates clear parent → child communication
function App() {
  // Student details are stored ONLY in this parent component
  const students = [
    {
      name: "Akshay",
      roll: "2303A52209",
      marks: [90, 85, 88],
    },
    {
      name: "Rohith",
      roll: "2303A52198",
      marks: [78, 82, 80],
    },
    {
      name: "Ricky",
      roll: "2303A52330",
      marks: [92, 91, 89],
    },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <p className="app-subtitle">React Props Demonstration</p>
        <h1 className="app-title">Student Marks Card</h1>
        <p className="app-description">
          Parent component stores the data. Child component receives it via props,
          calculates total marks and grade, and displays everything clearly.
        </p>
      </header>

      {/* Reusing the same StudentCard child component for multiple students */}
      <main className="card-grid">
        {students.map((student) => (
          // PROPS: Passing data from parent (App) to child (StudentCard)
          <StudentCard
            key={student.roll}
            name={student.name}
            roll={student.roll}
            marks={student.marks}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
