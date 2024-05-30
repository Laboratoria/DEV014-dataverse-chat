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
      if (a[sortBy] < b[sortBy]) { 
        return -1; 
      }
      if (a[sortBy] > b[sortBy]) { 
        return 1; 
      }
      return 0; 
    });
  }
  
  // Si es orden descendente (Z - A)
  
  
  if (sortOrder === 'desc') {
    return data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) { 
        return 1; 
      }
      if (a[sortBy] > b[sortBy]) { 
        return -1; 
      }
      return 0; 
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