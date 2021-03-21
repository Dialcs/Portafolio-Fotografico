const grid = new Muuri('.grid',{ /*Inicializamos la libreria MUURI*/
    layout: {
        rounding: false
      }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout(); /*Para que refreste los elemntos del grid y se muestren correctamente*/
    document.getElementById('grid').classList.add('imagenes-cargadas');/*cuando las imagenes estan cargadas llama al estilo css para cambiar su opacida*/ 

    // Agregamos los listener de los enlaces para filtrar por categoria.
    const enlaces = document.querySelectorAll('#categorias a'); /*De esta forma quiero acceder a todos los enlaces que se encuentren dentro del id de categorias */
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace)=> enlace.classList.remove('activo'));
            evento.target.classList.add('activo');
            
            const categoria = evento.target.innerHTML.toLowerCase(); /* para saber la categoria del menu donde estas*/
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`); /* esto sirve para mostrar el filtrado de las fotos segun precionemos en el menú, hasta antes de los dos puntos es un condicional if de una sola linea que dice que si se selecciona la categoria "todos", se mostrará todas las imagenes y di no (que esta despues de los dos puntos) se mostrará la categoria correspondiente*/            
        });
    });

    // Agregamos los listener para la barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda)); //accedemos a cada elemento que tenemos del data set "data-categoria, data etiquetas, data-descipcion"

    });

    // Agregamos un listener para las imagenes para cuando clickeemos en cualquier imagen
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) =>{        
        elemento.addEventListener('click',() => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
        
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });


    // Eventlistener del boton de cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    // Eventlistener del overlay
    overlay.addEventListener('click', (evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
});