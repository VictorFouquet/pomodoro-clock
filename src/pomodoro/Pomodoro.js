import React, { Component } from 'react'
import './pomodoro.css'

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counting: false,
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      mode: "Session"
    };
    this.handleBreakInc = this.handleBreakInc.bind(this);
    this.handleBreakDec = this.handleBreakDec.bind(this);
    this.handleSessionInc = this.handleSessionInc.bind(this);
    this.handleSessionDec = this.handleSessionDec.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleTimeLeft = this.handleTimeLeft.bind(this);
    this.handleTimeDec = this.handleTimeDec.bind(this);
  }

  handleBreakInc() {
    if (this.state.breakLength === 60 || this.state.counting) return;
    this.setState({ breakLength: this.state.breakLength + 1 });
  }

  handleBreakDec() {
    if (this.state.breakLength <= 1 || this.state.counting) return;
    this.setState({ breakLength: this.state.breakLength - 1 });
  }

  handleSessionInc() {
    if (this.state.sessionLength === 60 || this.state.counting) return;
    this.setState({
      timeLeft: this.state.timeLeft + 60,
      sessionLength: this.state.sessionLength + 1
    });
  }

  handleSessionDec() {
    if (this.state.sessionLength <= 1 || this.state.counting) return;
    this.setState({
      timeLeft: this.state.timeLeft - 60,
      sessionLength: this.state.sessionLength - 1
    });
  }

  handleReset() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.setState({
      counting: false,
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      mode: "Session"
    });
  }

  handleStart() {
    this.setState({ counting: true });
  }
  handleStop() {
    this.setState({ counting: false });
  }

  handleTimeLeft() {
    let min = Math.floor(this.state.timeLeft / 60);
    if (min < 10) min = "0" + min;
    let sec = this.state.timeLeft % 60;
    if (sec < 10) sec = "0" + sec;
    return min + ":" + sec;
  }

  handleTimeDec() {
    setTimeout(() => {
      if (this.state.counting) {
        if (this.state.timeLeft === 0 && this.state.mode === "Session") {
          this.setState({
            mode: "Break",
            timeLeft: this.state.breakLength * 60
          });
        } else if (this.state.timeLeft === 0 && this.state.mode === "Break") {
          this.setState({
            mode: "Session",
            timeLeft: this.state.sessionLength * 60
          });
        } else {
          this.setState({ timeLeft: this.state.timeLeft - 1 });
          if (this.state.timeLeft === 0) this.audio.play();
        }
      }
    }, 1000);
  }

  render() {
    if (this.state.counting) this.handleTimeDec();
    let time = this.handleTimeLeft();
    return (
      <div id="pomodoro">
        <div id="pomodoro-title">
          <div id="pomodoro-title-texture">
            <h1 id="pomodoro-title-text">PomodoroClock.</h1>
          </div>
        </div>

        <h2 id="timer-label">{this.state.mode}</h2>

        <h3 id="break-label">Break Length</h3>
        <div id="break-input-control">
          <div className="custom-input-border">
            <div
              className="custom-button"
              id="break-decrement"
              onClick={this.handleBreakDec}
            >
              <div className="minus" />
            </div>
          </div>
          <div className="custom-digit-border" id="break-display">
            <div className="length-display" id="break-length">
              {this.state.breakLength < 10
                ? "0" + this.state.breakLength
                : this.state.breakLength}{" "}
            </div>
          </div>
          <div className="custom-input-border">
            <div
              className="custom-button"
              id="break-increment"
              onClick={this.handleBreakInc}
            >
              <div className="plus" />
            </div>
          </div>
        </div>

        <h3 id="session-label">Session Length</h3>
        <div id="session-input-control">
          <div className="custom-input-border">
            <div
              className="custom-button"
              id="session-decrement"
              onClick={this.handleSessionDec}
            >
              <div className="minus" />
            </div>
          </div>
          <div className="custom-digit-border">
            <div id="session-length" className="length-display">
              {this.state.sessionLength < 10
                ? "0" + this.state.sessionLength
                : this.state.sessionLength}
            </div>
          </div>
          <div className="custom-input-border">
            <div
              className="custom-button"
              id="session-increment"
              onClick={this.handleSessionInc}
            >
              <div className="plus" />
            </div>
          </div>
        </div>

        <div id="time-left">{time}</div>

        <div id="time-control">
          <div className="custom-input-border">
            <div
              className="custom-button"
              id="start_stop"
              onClick={this.handleStart}
            >
              <i class="fas fa-play"></i>
            </div>
          </div>
          <div className="custom-input-border">
            <div
              className="custom-button"
              id="start_stop"
              onClick={this.handleStop}
            >
              <i class="fas fa-pause"></i>
            </div>
          </div>
          <div className="custom-input-border">
            <div
              className="custom-button"
              id="reset"
              onClick={this.handleReset}
            >
              <div>
                <i className="fas fa-redo-alt"></i>
              </div>
            </div>
          </div>
        </div>
        <audio
          id="beep"
          ref={ref => (this.audio = ref)}
          src="https://www.philharmonia.co.uk/assets/audio/samples/saxophone/saxophone_A3_15_fortissimo_normal.mp3"
        />
      </div>
    );
  }
}

export default Pomodoro