import React, { Component } from "react";
import "./signature.css";

class Signature extends React.Component {
  render() {
    return (
      <div id="signature">
        <p id="sign-text">Coded and designed by Victor Fouquet - 2020</p>
        <div id="logos">
          <a href="https://github.com/VictorFouquet/calculator" target="blank">
            <i class="fab fa-github-square"></i>
          </a>
          <a href="https://www.linkedin.com/in/v-fouquet/" target="blank">
            <i class="fab fa-linkedin"></i>
          </a>
          <a
            href="https://www.instagram.com/victor.fouquet.artist/"
            target="blank"
          >
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default Signature;
