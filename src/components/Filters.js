import { data } from "../data/dataset.js";
import { renderItems } from "../view.js";
import { filterData, filterData2, sortData, computeStats } from "../lib/dataFunctions.js";

export const filters = () => {
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `
  <h4>Explora el universo épico de El Señor de los Anillos</h4>
  <h5>Encuentra a tus personajes y descubre curiosidades sobre ellos.</h5>
  <div class="barraBuscar">
      <input id="search-bar" type="search" placeholder="Buscar">
  </div>
  <div class="filtros">
    <label for="select-race"></label>
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
    <button id="limpiar" data-testid="button-clear">Limpiar filtros</button>
  </div>
  <div class="contenedor-botones">
    <button id="mostrar" class="mostrar">Mostrar promedio de edades</button>
  </div>
  <div class="conten-estadisticas hidden"></div>
  <ul id="root"></ul>
  `;

  let filteredData = [...data];

  function applyFilters() {
    const raceValue = document.querySelector('#select-race').value;
    const ageValue = document.querySelector('#select-age').value;
    const sortValue = document.querySelector('#select-sort').value;
    const searchTerm = document.querySelector('#search-bar').value;

    filteredData = [...data];

    // Apply race filter
    if (raceValue !== 'raza') {
      filteredData = filterData(filteredData, 'race', raceValue);
    }

    // Apply age filter
    if (ageValue !== 'Edad') {
      filteredData = filterData2(filteredData, 'age', ageValue);
    }

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sort
    if (sortValue !== 'orden') {
      filteredData = sortData(filteredData, 'name', sortValue);
    }

    renderFilteredItems();
  }

  function renderFilteredItems() {
    container.innerHTML = '';
    if (filteredData.length === 0) {
      return mostrarEmptyState();
    }
    const itemsList = renderItems(filteredData);
    container.appendChild(itemsList);
  }

  const container = viewEl.querySelector('#root');
  if (container) {
    container.innerHTML = renderItems(data).innerHTML;
  }

  const searchBar = viewEl.querySelector('#search-bar');
  searchBar.addEventListener('input', () => {
    applyFilters();
  });

  const selector = viewEl.querySelector("#select-race");
  const selector2 = viewEl.querySelector("#select-age");
  const selectSort = viewEl.querySelector("#select-sort");

  selector.addEventListener("change", () => {
    applyFilters();
  });
  selector2.addEventListener("change", () => {
    applyFilters();
  });
  selectSort.addEventListener("change", () => {
    applyFilters();
  });

  viewEl.querySelector('[data-testid="button-clear"]').addEventListener('click', function() {
    selector.value = 'raza';
    selector2.value = 'Edad';
    selectSort.value = 'orden';
    searchBar.value = '';
    filteredData = [...data];
    renderFilteredItems();
    const statsContainer = viewEl.querySelector('.conten-estadisticas');
    statsContainer.innerHTML = '';
    statsContainer.classList.remove('visible');
  });

  renderFilteredItems();

  viewEl.querySelector('#mostrar').addEventListener('click', function() {
    const statsContainer = viewEl.querySelector('.conten-estadisticas');
    const promedioEdad = computeStats(filteredData);
    statsContainer.innerHTML = `
        <div><span class="frase-edad">La edad promedio de los personajes es</span></div>
        <div><span class="edad-promedio">${promedioEdad}</span></div>
        <div><span class="años">años</span></div>
    `;
    statsContainer.classList.add('visible');
  });

  function mostrarEmptyState() {
    container.innerHTML = '';
    const mensajeError = document.createElement('p');
    mensajeError.innerHTML = `No se encontraron personajes que coincidan con tus criterios. <br>
    Prueba con otros términos de búsqueda o ajusta los filtros para encontrar a tus personajes favoritos.
    `;
    mensajeError.classList.add('empty-state');
    container.appendChild(mensajeError);
  }

  return viewEl;
};
