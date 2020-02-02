import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pomodoro from './pomodoro/Pomodoro'
import Signature from './signature/Signature'
function App() {
  return (
    <div className="App">
      <Pomodoro />
      <Signature />
    </div>
  );
}

export default App;
