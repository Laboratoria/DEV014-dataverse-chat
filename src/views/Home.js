import { header } from "../components/Header.js";
import { hero } from "../components/Hero.js";
import { filters } from "../components/Filters.js";
import { footer } from "../components/Footer.js";


export const home = () => {
  const homeView = document.createElement("div");
    
  const headerElement = header();
  homeView.appendChild(headerElement);

  const heroElement = hero();
  homeView.appendChild(heroElement);

  const filtersElement = filters();
  homeView.appendChild(filtersElement);

  const footerElement = footer();
  homeView.appendChild(footerElement);

  
  return homeView;
};


