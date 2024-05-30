// Lógica para la función "Filtrar"
export const filterData = (data, filterBy, value) => {
  let  resultadoFiltro = []
  resultadoFiltro = data.filter((element)=>{
    return element.facts[filterBy] === value
  })
  
  return resultadoFiltro
}
  
export const filterData2 = (data, filterBy, value) => {
  let  resultadoFiltro2 = []
  resultadoFiltro2 = data.filter((element)=>{
  
    if(value.split(' ').length === 2){
      const edad = value.split(' ');
      return  element.facts[filterBy] >= edad[0] && element.facts[filterBy] <= edad[1] 
    }if(value === '100'){
      return element.facts[filterBy] <= value 
    }if(value === '2000'){
      return element.facts[filterBy] >= value && element.facts[filterBy] <= 4000
    }if(value === 'Desconocida'){
      return element.facts[filterBy] === value 
    }
  })
  
  return resultadoFiltro2
}
  
//Lógica para la función "Ordenar"
export const sortData = (data, sortBy, sortOrder) => {
    
  // Verificar el tipo de orden especificado
  if (sortOrder === 'asc') {
      
    // Ordenar los datos de acuerdo a la propiedad especificada
    return data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) { // Compara las propiedades de los objetos 'a' y 'b'
        return -1; // Retorna -1 si 'a' debe estar antes que 'b'
      }
      if (a[sortBy] > b[sortBy]) { // Compara las propiedades de los objetos 'a' y 'b'
        return 1; // Retorna 1 si 'a' debe estar después que 'b'
      }
      return 0; // Retorna 0 si los elementos son iguales
    });
  }
    
  // Si es orden descendente (Z - A)
    
  // Ordenar los datos de acuerdo a la propiedad especificada y luego revertir el orden
  if (sortOrder === 'desc') {
    return data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) { // Compara las propiedades de los objetos 'a' y 'b'
        return 1; // Retorna 1 si 'a' debe estar antes que 'b' (inverso para orden descendente)
      }
      if (a[sortBy] > b[sortBy]) { // Compara las propiedades de los objetos 'a' y 'b'
        return -1; // Retorna -1 si 'a' debe estar después que 'b' (inverso para orden descendente)
      }
      return 0; // Retorna 0 si los elementos son iguales
    });
  }
}
  
//Lógica para la función calcular
export const computeStats = (data) => {
  
  const personasConEdadConocida = data.filter(persona => typeof persona.facts.age === 'number');
  
  if (personasConEdadConocida.length === 0) return 0;
  
  const edades = personasConEdadConocida.map(persona => persona.facts.age);
  
  const totalEdad = edades.reduce((acumulador, edad) => {
    return acumulador + edad;
  }, 0);
  
  return Math.floor(totalEdad / personasConEdadConocida.length);
}