export const notFound = () => {
  const notFoundElement = document.createElement("div");
  notFoundElement.classList.add("not-found");
  notFoundElement.innerHTML = `
    <div class="overlay">
      <p>Te has desviado del sendero, viajero. <br>
      Regresa a la <a href="/">Comarca</a> y continúa tu aventura.</p>
      <button id="button-goHome">Regresar</button>
    </div>
    <img class="error-image" src="data/img/error-image.png">
  `;

  const buttonGoHome = notFoundElement.querySelector("#button-goHome");
  buttonGoHome.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  return notFoundElement;
};
