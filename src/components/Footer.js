export const footer = () => {
  const containerFooter = document.createElement ('footer');
  containerFooter.innerHTML = `  
    <div class="footerDetails">
    <footer>
      <div class="details"><strong>Dirección </strong> En algún lugar de la Tierra Media</div>
      <div class="details"><strong>Contacto</strong> 1600 - LA COMARCA</div>
      <div class="details"><strong>Email</strong> lacomarca@elseñordelosanillos.com</div>
      <br>
      <div class="details">© 2024 Laboratoria. All Rights Reserved - Silvia Pineda </div>
    </footer>
    </div>
    `;

  return containerFooter;

};