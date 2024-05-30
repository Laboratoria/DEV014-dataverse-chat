import { filterData, filterData2, sortData, computeStats } from "../lib/dataFunctions.js";
import { data } from '../data/dataset.js';
import { renderItems } from "../components/functions.js";
import { navigateTo } from "../router.js";

export function Home() {
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `
    <main>
      <h2>¡Embárcate en la búsqueda del Anillo y descubre la Tierra Media!</h2>
      <h3>Explora el universo épico de <strong>El Señor de los Anillos</strong></h3>
      <nav class="filtros">
        <label for="select-race">Filtra tu búsqueda</label>
        <select id="select-race" name="select-race" data-testid="select-filter">
          <option value="raza">Raza</option>
          <option value="Hobbit">Hobbit</option>
          <option value="Maia">Maia</option>
          <option value="Hombre">Hombre</option>
          <option value="Elfo">Elfo</option>
          <option value="Enano">Enano</option>
          <option value="Ent">Ent</option>
          <option value="Caballo">Caballo</option>
          <option value="Criatura">Criatura</option>
        </select>
        <label for="select-age"></label>
        <select id="select-age" name="select-age" data-testid="select-filter2">
          <option value="Edad">Edad</option>
          <option value="100">Menos de 100 años</option>
          <option value="100 999">Entre 100 y 999 años</option>
          <option value="2000">2000 años o más</option>
          <option value="Desconocida">Desconocido</option>
        </select>
        <label for="select-sort"></label>
        <select id="select-sort" name="name" itemprop="name" data-testid="select-sort">
          <option value="orden">Orden</option>
          <option value="asc" name="asc">Ascendente</option>
          <option value="desc" name="desc">Descendente</option>
        </select>
        <button id="limpiar" data-testid="button-clear">Borrar filtros</button>
        <button id="ChatGrupalBtn" class="ChatGrupalBtn">Chat grupal</button>
        <button id="ApiKeyBtn" class="ChatGrupalBtn">Api Key</button>
      </nav>
      <nav class="contenedor-botones">
        <button id="mostrar" class="mostrar">Mostrar Promedio de las Edades</button>
      </nav>
      <nav class="conten-estadisticas"></nav>
      <ul id="items-container"></ul>
      
    </main>
  `;

  const container = viewEl.querySelector("#items-container");
  container.innerHTML = renderItems(data).innerHTML;

  // Event listeners and other logic inside the Home function
  const selector = viewEl.querySelector("#select-race");
  const selector2 = viewEl.querySelector("#select-age");
  const selectSort = viewEl.querySelector("#select-sort");

  let filteredData = [...data];

  selector.addEventListener("change", applyFilters);
  selector2.addEventListener("change", applyFilters);
  selectSort.addEventListener("change", applyFilters);

  viewEl.querySelector('[data-testid="button-clear"]').addEventListener("click", clearFilters);
  viewEl.querySelector("#mostrar").addEventListener("click", showAverageAge);

  const goToChatGrupalBtn = viewEl.querySelector("#ChatGrupalBtn");
  goToChatGrupalBtn.addEventListener("click", () => {
    navigateTo("/ChatGroup");
  });

  const goToApiKeyBtn = viewEl.querySelector("#ApiKeyBtn");
  goToApiKeyBtn.addEventListener("click", () => {
    navigateTo("/apikey");
  });

  renderFilteredItems();

  function applyFilters(e) {
    const id = e.target.id;
    const value = e.target.value;
  
    switch (id) {
      case "select-race":
        filteredData = filterByRace([...data], value);
        break;
      case "select-age":
        filteredData = filterByAge(filteredData, value);
        break;
      case "select-sort":
        filteredData = sortBy(filteredData, value);
        break;
      default:
        break;
    }
  
    renderFilteredItems();
  }
  
  // Funciones de filtrado
  function filterByRace(data, race) {
    if (race === "raza") return data;
    return filterData(data, "race", race);
  }
  
  function filterByAge(data, ageRange) {
    if (ageRange === "Edad") return data;
    return filterData2(data, "age", ageRange);
  }
  
  // Función de ordenamiento
  function sortBy(data, sortType) {
    if (sortType === "orden") return data;
    return sortData(data, "name", sortType);
  }
  function renderFilteredItems() {
    container.innerHTML = '';
    if (filteredData.length === 0) {
      mostrarEmptyState();
      return;
    }
    const itemsList = renderItems(filteredData);
    container.appendChild(itemsList);
  }

  function mostrarEmptyState() {
    container.innerHTML = '';
    const mensajeError = document.createElement('p');
    mensajeError.textContent = 'La Tierra Media aguarda, ningún personaje encontrado. Inténtalo nuevamente.';
    mensajeError.classList.add('empty-state');
    container.appendChild(mensajeError);
  }

  function clearFilters() {
    selector.value = 'raza';
    selector2.value = 'Edad';
    selectSort.value = 'orden';
    filteredData = [...data];
    renderFilteredItems();
    viewEl.querySelector('.conten-estadisticas').innerHTML = '';
  }

  function showAverageAge() {
    viewEl.querySelector('.conten-estadisticas').innerHTML = 'La edad promedio es: ' + computeStats(filteredData) + ' años';
  }

  return viewEl;
}
