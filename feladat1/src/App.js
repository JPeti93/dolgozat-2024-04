import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');
  const [students, setStudents] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePointsChange = (event) => {
    setPoints(event.target.value);
  };

  const handleAddStudent = () => {
    if (name.length < 3) {
      alert('A név nem lehet 3 karakternél rövidebb!');
      return;
    }

    const pointsNumber = parseInt(points);

    if (isNaN(pointsNumber) || pointsNumber < 0 || pointsNumber > 100) {
      alert('A pont 0 és 100 közötti szám lehet!');
      return;
    }

    const newStudent = {
      name: name,
      points: pointsNumber
    };

    setStudents([...students, newStudent]);

    setName('');
    setPoints('');
  };

  return (
    <div>
      <div>
        <input type="text" value={name} onChange={handleNameChange} placeholder="Név" />
        <input type="number" value={points} onChange={handlePointsChange} placeholder="Pontszám" />
        <button onClick={handleAddStudent}>Hozzáadás</button>
      </div>
      <ul>
        {students.map((student, index) => (
          <li key={index} className={student.points < 51 ? 'red' : ''}>
            {student.name} - {student.points} pont
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
