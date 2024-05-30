import { filterData, filterData2, sortData, computeStats} from '../src/lib/dataFunctions.js';
import { data as fakeData } from './data.js';

describe ('Filtrar la data por Raza',()=>{
  it("La aplicación debe filtrar la data por Raza", () =>{
    const resultadoDeFiltros = [
      {
        "id": "frodo_bolson",
        "name": "Frodo Bolsón",
        "shortDescription": "Portador del Anillo Único",
        "description": "Frodo Bolsón, un hobbit de la Comarca, es elegido para llevar el Anillo Único a Mordor y destruirlo en el Monte del Destino. A pesar de su modesta estatura, muestra una valentía extraordinaria y una determinación inquebrantable en su peligroso viaje. Su carga lo lleva al borde de la desesperación, pero su amistad con Sam y el apoyo de sus compañeros lo guían en su difícil tarea, enfrentando peligros inimaginables para salvar a la Tierra Media de la oscuridad que amenaza con consumirla. ",
        "imageUrl": "data/img/Frodo.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 33,
          "height": "1.5m",
          "yearOfBirth": 2968
        }
      },
      {
        "id": "sam_gamyi",
        "name": "Sam Gamyi",
        "shortDescription": "Fiel compañero de Frodo",
        "description": "Sam Gamyi, leal compañero de Frodo, demuestra una valentía y lealtad inquebrantables en su viaje para destruir el Anillo Único. Como jardinero de la Comarca, inicialmente se une a Frodo como su cocinero, pero su papel se vuelve crucial cuando se convierte en el soporte emocional y físico de Frodo en los momentos más oscuros. Su coraje y sacrificio son ejemplares, y su amor por su hogar y sus amigos lo impulsan a superar desafíos aparentemente insuperables en su búsqueda para salvar a la Tierra Media.",
        "imageUrl": "data/img/sam.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 38,
          "height": "1.4m",
          "yearOfBirth": 2980
        }
      },  
    ];
    expect(filterData(fakeData, "race", "Hobbit")).toEqual(resultadoDeFiltros);
  });
});


describe ('Filtrar la data por Edad',()=>{
  it("La aplicación debe filtrar la data por Edad", () =>{
    const resultadoDeEdad = [
      {
        "id": "gandalf",
        "name": "Gandalf",
        "shortDescription": "El mago gris",
        "description": "Gandalf, conocido como el Mago Gris, es una figura venerada y poderosa en la Tierra Media. Su sabiduría y habilidades mágicas lo convierten en un guía esencial para la Comunidad del Anillo en su lucha contra las fuerzas oscuras de Sauron. Aunque puede parecer distante y enigmático, Gandalf tiene un profundo amor por los pueblos libres y está dispuesto a arriesgar todo por su protección. Su papel como mentor y estratega es crucial en la guerra contra la oscuridad, y su sacrificio final en la batalla contra el Balrog es un acto de pura valentía y devoción.",
        "imageUrl": "data/img/gandalf.jpg",
        "facts": {
          "race": "Maia",
          "age": 2019,
          "height": "2.1m",
          "yearOfBirth": 1000
        }
      },
    ];
    expect(filterData2(fakeData, "age", "2000")).toEqual(resultadoDeEdad);
  });

  it('La aplicación debe filtrar la data por rango de edad "30 40"', () => {
    const resultadoDeEdad = [
      {
        "id": "frodo_bolson",
        "name": "Frodo Bolsón",
        "shortDescription": "Portador del Anillo Único",
        "description": "Frodo Bolsón, un hobbit de la Comarca, es elegido para llevar el Anillo Único a Mordor y destruirlo en el Monte del Destino. A pesar de su modesta estatura, muestra una valentía extraordinaria y una determinación inquebrantable en su peligroso viaje. Su carga lo lleva al borde de la desesperación, pero su amistad con Sam y el apoyo de sus compañeros lo guían en su difícil tarea, enfrentando peligros inimaginables para salvar a la Tierra Media de la oscuridad que amenaza con consumirla. ",
        "imageUrl": "data/img/Frodo.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 33,
          "height": "1.5m",
          "yearOfBirth": 2968
        }
      },
      {
        "id": "sam_gamyi",
        "name": "Sam Gamyi",
        "shortDescription": "Fiel compañero de Frodo",
        "description": "Sam Gamyi, leal compañero de Frodo, demuestra una valentía y lealtad inquebrantables en su viaje para destruir el Anillo Único. Como jardinero de la Comarca, inicialmente se une a Frodo como su cocinero, pero su papel se vuelve crucial cuando se convierte en el soporte emocional y físico de Frodo en los momentos más oscuros. Su coraje y sacrificio son ejemplares, y su amor por su hogar y sus amigos lo impulsan a superar desafíos aparentemente insuperables en su búsqueda para salvar a la Tierra Media.",
        "imageUrl": "data/img/sam.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 38,
          "height": "1.4m",
          "yearOfBirth": 2980
        }
      }
    ];
    expect(filterData2(fakeData, "age", "30 40")).toEqual(resultadoDeEdad);
  });
  
  it('La aplicación debe filtrar la data por edad "100"', () => {
    const resultadoDeEdad = [
      {
        "id": "frodo_bolson",
        "name": "Frodo Bolsón",
        "shortDescription": "Portador del Anillo Único",
        "description": "Frodo Bolsón, un hobbit de la Comarca, es elegido para llevar el Anillo Único a Mordor y destruirlo en el Monte del Destino. A pesar de su modesta estatura, muestra una valentía extraordinaria y una determinación inquebrantable en su peligroso viaje. Su carga lo lleva al borde de la desesperación, pero su amistad con Sam y el apoyo de sus compañeros lo guían en su difícil tarea, enfrentando peligros inimaginables para salvar a la Tierra Media de la oscuridad que amenaza con consumirla. ",
        "imageUrl": "data/img/Frodo.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 33,
          "height": "1.5m",
          "yearOfBirth": 2968
        }
      },
      {
        "id": "sam_gamyi",
        "name": "Sam Gamyi",
        "shortDescription": "Fiel compañero de Frodo",
        "description": "Sam Gamyi, leal compañero de Frodo, demuestra una valentía y lealtad inquebrantables en su viaje para destruir el Anillo Único. Como jardinero de la Comarca, inicialmente se une a Frodo como su cocinero, pero su papel se vuelve crucial cuando se convierte en el soporte emocional y físico de Frodo en los momentos más oscuros. Su coraje y sacrificio son ejemplares, y su amor por su hogar y sus amigos lo impulsan a superar desafíos aparentemente insuperables en su búsqueda para salvar a la Tierra Media.",
        "imageUrl": "data/img/sam.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 38,
          "height": "1.4m",
          "yearOfBirth": 2980
        }
      }
    ];
    expect(filterData2(fakeData, "age", "100")).toEqual(resultadoDeEdad);
  });

});



describe ('Filtrar la data por Orden',()=>{
  it("La aplicación debe filtrar la data por Orden Ascendente", () =>{
    const resultadoOrden = [
      {
        "id": "frodo_bolson",
        "name": "Frodo Bolsón",
        "shortDescription": "Portador del Anillo Único",
        "description": "Frodo Bolsón, un hobbit de la Comarca, es elegido para llevar el Anillo Único a Mordor y destruirlo en el Monte del Destino. A pesar de su modesta estatura, muestra una valentía extraordinaria y una determinación inquebrantable en su peligroso viaje. Su carga lo lleva al borde de la desesperación, pero su amistad con Sam y el apoyo de sus compañeros lo guían en su difícil tarea, enfrentando peligros inimaginables para salvar a la Tierra Media de la oscuridad que amenaza con consumirla. ",
        "imageUrl": "data/img/Frodo.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 33,
          "height": "1.5m",
          "yearOfBirth": 2968
        }
      },
    
      {
        "id": "sam_gamyi",
        "name": "Sam Gamyi",
        "shortDescription": "Fiel compañero de Frodo",
        "description": "Sam Gamyi, leal compañero de Frodo, demuestra una valentía y lealtad inquebrantables en su viaje para destruir el Anillo Único. Como jardinero de la Comarca, inicialmente se une a Frodo como su cocinero, pero su papel se vuelve crucial cuando se convierte en el soporte emocional y físico de Frodo en los momentos más oscuros. Su coraje y sacrificio son ejemplares, y su amor por su hogar y sus amigos lo impulsan a superar desafíos aparentemente insuperables en su búsqueda para salvar a la Tierra Media.",
        "imageUrl": "data/img/sam.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 38,
          "height": "1.4m",
          "yearOfBirth": 2980
        }
      },
    
      {
        "id": "gandalf",
        "name": "Gandalf",
        "shortDescription": "El mago gris",
        "description": "Gandalf, conocido como el Mago Gris, es una figura venerada y poderosa en la Tierra Media. Su sabiduría y habilidades mágicas lo convierten en un guía esencial para la Comunidad del Anillo en su lucha contra las fuerzas oscuras de Sauron. Aunque puede parecer distante y enigmático, Gandalf tiene un profundo amor por los pueblos libres y está dispuesto a arriesgar todo por su protección. Su papel como mentor y estratega es crucial en la guerra contra la oscuridad, y su sacrificio final en la batalla contra el Balrog es un acto de pura valentía y devoción.",
        "imageUrl": "data/img/gandalf.jpg",
        "facts": {
          "race": "Maia",
          "age": 2019,
          "height": "2.1m",
          "yearOfBirth": 1000
        }
      },
    ];
    expect(sortData(fakeData, "orden", "asc")).toEqual(resultadoOrden);
  });

  it("La aplicación debe filtrar la data por Orden Descendente", () =>{
    const resultadoOrdenDescendente = [
      {
        "id": "frodo_bolson",
        "name": "Frodo Bolsón",
        "shortDescription": "Portador del Anillo Único",
        "description": "Frodo Bolsón, un hobbit de la Comarca, es elegido para llevar el Anillo Único a Mordor y destruirlo en el Monte del Destino. A pesar de su modesta estatura, muestra una valentía extraordinaria y una determinación inquebrantable en su peligroso viaje. Su carga lo lleva al borde de la desesperación, pero su amistad con Sam y el apoyo de sus compañeros lo guían en su difícil tarea, enfrentando peligros inimaginables para salvar a la Tierra Media de la oscuridad que amenaza con consumirla. ",
        "imageUrl": "data/img/Frodo.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 33,
          "height": "1.5m",
          "yearOfBirth": 2968
        }
      },
    
      {
        "id": "sam_gamyi",
        "name": "Sam Gamyi",
        "shortDescription": "Fiel compañero de Frodo",
        "description": "Sam Gamyi, leal compañero de Frodo, demuestra una valentía y lealtad inquebrantables en su viaje para destruir el Anillo Único. Como jardinero de la Comarca, inicialmente se une a Frodo como su cocinero, pero su papel se vuelve crucial cuando se convierte en el soporte emocional y físico de Frodo en los momentos más oscuros. Su coraje y sacrificio son ejemplares, y su amor por su hogar y sus amigos lo impulsan a superar desafíos aparentemente insuperables en su búsqueda para salvar a la Tierra Media.",
        "imageUrl": "data/img/sam.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 38,
          "height": "1.4m",
          "yearOfBirth": 2980
        }
      },
    
      {
        "id": "gandalf",
        "name": "Gandalf",
        "shortDescription": "El mago gris",
        "description": "Gandalf, conocido como el Mago Gris, es una figura venerada y poderosa en la Tierra Media. Su sabiduría y habilidades mágicas lo convierten en un guía esencial para la Comunidad del Anillo en su lucha contra las fuerzas oscuras de Sauron. Aunque puede parecer distante y enigmático, Gandalf tiene un profundo amor por los pueblos libres y está dispuesto a arriesgar todo por su protección. Su papel como mentor y estratega es crucial en la guerra contra la oscuridad, y su sacrificio final en la batalla contra el Balrog es un acto de pura valentía y devoción.",
        "imageUrl": "data/img/gandalf.jpg",
        "facts": {
          "race": "Maia",
          "age": 2019,
          "height": "2.1m",
          "yearOfBirth": 1000
        }
      },
    ];
    expect(sortData(fakeData, "orden", "desc")).toEqual(resultadoOrdenDescendente);
  });
});
  

describe ('Filtrar la data por Estadísticas',()=>{
  it("La aplicación debe filtrar la data por cálculo estadístico ", () =>{
    const resultadoCalculo = [
      {
        "id": "frodo_bolson",
        "name": "Frodo Bolsón",
        "shortDescription": "Portador del Anillo Único",
        "description": "Frodo Bolsón, un hobbit de la Comarca, es elegido para llevar el Anillo Único a Mordor y destruirlo en el Monte del Destino. A pesar de su modesta estatura, muestra una valentía extraordinaria y una determinación inquebrantable en su peligroso viaje. Su carga lo lleva al borde de la desesperación, pero su amistad con Sam y el apoyo de sus compañeros lo guían en su difícil tarea, enfrentando peligros inimaginables para salvar a la Tierra Media de la oscuridad que amenaza con consumirla. ",
        "imageUrl": "data/img/Frodo.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 33,
          "height": "1.5m",
          "yearOfBirth": 2968
        }
      },
    
      {
        "id": "sam_gamyi",
        "name": "Sam Gamyi",
        "shortDescription": "Fiel compañero de Frodo",
        "description": "Sam Gamyi, leal compañero de Frodo, demuestra una valentía y lealtad inquebrantables en su viaje para destruir el Anillo Único. Como jardinero de la Comarca, inicialmente se une a Frodo como su cocinero, pero su papel se vuelve crucial cuando se convierte en el soporte emocional y físico de Frodo en los momentos más oscuros. Su coraje y sacrificio son ejemplares, y su amor por su hogar y sus amigos lo impulsan a superar desafíos aparentemente insuperables en su búsqueda para salvar a la Tierra Media.",
        "imageUrl": "data/img/sam.jpg",
        "facts": {
          "race": "Hobbit",
          "age": 38,
          "height": "1.4m",
          "yearOfBirth": 2980
        }
      },
    
      {
        "id": "gandalf",
        "name": "Gandalf",
        "shortDescription": "El mago gris",
        "description": "Gandalf, conocido como el Mago Gris, es una figura venerada y poderosa en la Tierra Media. Su sabiduría y habilidades mágicas lo convierten en un guía esencial para la Comunidad del Anillo en su lucha contra las fuerzas oscuras de Sauron. Aunque puede parecer distante y enigmático, Gandalf tiene un profundo amor por los pueblos libres y está dispuesto a arriesgar todo por su protección. Su papel como mentor y estratega es crucial en la guerra contra la oscuridad, y su sacrificio final en la batalla contra el Balrog es un acto de pura valentía y devoción.",
        "imageUrl": "data/img/gandalf.jpg",
        "facts": {
          "race": "Maia",
          "age": 2019,
          "height": "2.1m",
          "yearOfBirth": 1000
        }
      },
    ];
    expect(computeStats(resultadoCalculo)).toEqual(696);
  });
});