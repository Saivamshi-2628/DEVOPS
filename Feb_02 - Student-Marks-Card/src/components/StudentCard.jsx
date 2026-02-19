import React from "react";
import "./StudentCard.css";

// Child component (StudentCard)
// - Receives data from the parent using props
// - Calculates total marks and grade INSIDE the child
// - Displays all student information in a clear card layout
const StudentCard = ({ name, roll, marks }) => {
  // Calculate total marks from the marks array received via props
  const total = marks.reduce((sum, mark) => sum + mark, 0);

  // Simple grading logic based on total marks
  let grade = "Fail";
  if (total >= 270) grade = "A";
  else if (total >= 240) grade = "B";
  else if (total >= 210) grade = "C";

  return (
    <article className="student-card">
      <header className="student-card-header">
        <div>
          <h2 className="student-name">{name}</h2>
          <p className="student-roll">Roll No: {roll}</p>
        </div>
        <div className={`grade-pill grade-${grade.toLowerCase()}`}>
          <span className="grade-label">Grade</span>
          <span className="grade-value">{grade}</span>
        </div>
      </header>

      <section className="marks-section">
        <h3 className="section-title">Subject-wise Marks</h3>
        <div className="marks-list">
          {marks.map((mark, index) => (
            <div key={index} className="mark-item">
              <span className="subject-label">Subject {index + 1}</span>
              <span className="subject-mark">{mark}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="result">
        <div className="total-row">
          <span className="total-label">Total Marks</span>
          <span className="total-value">{total}</span>
        </div>
      </footer>
    </article>
  );
};

export default StudentCard;
