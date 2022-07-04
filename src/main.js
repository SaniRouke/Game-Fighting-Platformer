const app = document.querySelector("#app");

app.innerHTML = /*html*/ `
  <div class="interface">
    <div><div id="player-health"></div></div>
    <div id="timer">60</div>
    <div><div id="enemy-health"></div></div>
  </div>
  <div id="result-title"></div>
  <canvas id="canvas"></canvas>
`;
