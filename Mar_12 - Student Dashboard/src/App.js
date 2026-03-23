import React, { useState } from "react";

function App(){

const [subjects,setSubjects] = useState([
{ name:"Mathematics",progress:82,status:"On Track"},
{ name:"Computer Science",progress:91,status:"Excellent"},
{ name:"Physics",progress:74,status:"Improving"}
]);

const [name,setName] = useState("");
const [progress,setProgress] = useState("");

function addSubject(){

if(name==="" || progress==="") return;

const newSubject={
name:name,
progress:Number(progress),
status: progress>85 ? "Excellent" : progress>70 ? "On Track" : "Needs Work"
};

setSubjects([...subjects,newSubject]);

setName("");
setProgress("");
}

function deleteSubject(index){

const updated = subjects.filter((_,i)=> i!==index);
setSubjects(updated);

}

const totalCourses = subjects.length;

const avgProgress =
subjects.reduce((sum,s)=>sum+s.progress,0)/subjects.length;

return(

<div className="page">

<div className="dashboard">

<h1>Student Dashboard</h1>

<p className="subtitle">
Interactive React Dashboard
</p>

<div className="summary">

<div className="card">
<h3>Total Courses</h3>
<p>{totalCourses}</p>
</div>

<div className="card">
<h3>Average Progress</h3>
<p>{avgProgress.toFixed(1)}%</p>
</div>

</div>

<h2>Add Course</h2>

<div className="form">

<input
placeholder="Subject Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="number"
placeholder="Progress %"
value={progress}
onChange={(e)=>setProgress(e.target.value)}
/>

<button onClick={addSubject}>
Add
</button>

</div>

<h2>Course Progress</h2>

{subjects.map((subject,index)=>(

<div className="course" key={index}>

<div className="courseinfo">

<h3>{subject.name}</h3>

<p>Status: {subject.status}</p>

</div>

<div className="progressbar">

<div
className="progress"
style={{width:subject.progress+"%"}}
/>

</div>

<span>{subject.progress}%</span>

<button
className="delete"
onClick={()=>deleteSubject(index)}
>
✕
</button>

</div>

))}

</div>

</div>

);

}

export default App;