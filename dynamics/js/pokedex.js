window.addEventListener("load", () => {
    const btnAgregar = document.getElementById("btn-agregar");
    const divAgregar = document.getElementById("contenedor-agregar");
    const select = document.getElementById("select-tipos");
    const formAgregar = document.getElementById("form-nuevo");
    const btnEnviar = document.getElementById("btn-enviar");
    const buscador = document.getElementById("buscador");
    const resultados = document.getElementById("contenedor-resultados");
    const mostrar = document.getElementById("contenedor-mostrar");
  
    fetch("./dynamics/php/consultar.php")
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((datosJSON) => {
        console.log(datosJSON);
        for (let tipo of datosJSON) {
          select.innerHTML += `<option value="${tipo.type_id}">${tipo.type_name}</option>`;
        }
      });
  
    btnAgregar.addEventListener("click", () => {
      divAgregar.style.display = "block";
    });
  
    btnEnviar.addEventListener("click", (e) => {
      e.preventDefault();
      divAgregar.style.display = "none";
      const datosForm = new FormData(formAgregar);
      fetch("./dynamics/php/insertar.php", {
        method: "POST",
        body: datosForm,
      })
        .then((respuesta) => {
          return respuesta.json();
        })
        .then((datosJSON) => {
          alert(datosJSON.mensaje);
        });
    });
  
    buscador.addEventListener("keyup", () => {
      const termino = buscador.value;
      resultados.innerHTML = "";
      if (termino.length >= 3) {
        fetch("./dynamics/php/buscador.php?termino=" + termino)
          .then((respuesta) => {
            return respuesta.json();
          })
          .then((datosJSON) => {
            for (let resultado of datosJSON) {
              resultados.innerHTML += `<div class="coincidencia" data-id="${resultado.pok_id}">${resultado.pok_name}</div>`;
            }
          });
      }
    });
  
    resultados.addEventListener("click", (e) => {
      if (e.target.classList.contains("coincidencia")) {
        const id_pokemon = e.target.dataset.id;
        resultados.innerHTML = "";
        mostrar.innerHTML = "";
        mostrar.style.display = "flex";
        divAgregar.style.display = "none";
        fetch("./dynamics/php/pokemon.php?id=" + id_pokemon)
          .then((respuesta) => {
            console.log(respuesta);
            return respuesta.json();
          })
          .then((datosJSON) => {
            const titulo = ["Nombre", "Altura", "Peso", "Tipo", "Experiencia"];
            const datos = [
              datosJSON.pok_name,
              datosJSON.pok_height,
              datosJSON.pok_weight,
              datosJSON.type_name,
              datosJSON.pok_base_experience,
            ];
  
            mostrar.innerHTML += `
              <div class="dato">
                  <h1>${titulo[0]}</h1>
                  <h2>${datos[0]}</h2>
              </div>
              <div class="dato">
                  <h1>${titulo[1]}</h1>
                  <h2>${datos[1]}</h2>
              </div>
              <div class="dato">
                  <h1>${titulo[2]}</h1>
                  <h2>${datos[2]}</h2>
              </div>
              <div class="dato">
                  <h1>${titulo[3]}</h1>
                  <h2>${datos[3]}</h2>
              </div>
              <div class="dato">
                  <h1>${titulo[4]}</h1>
                  <h2>${datos[4]}</h2>
              </div>
              `;
  
            mostrar.innerHTML += `
              <div class="dato" id="btn-modificar">
                  <h1>Modificar</h1>
              </div>
              `;
  
            const btnEliminar = document.createElement("div");
            btnEliminar.className = "dato";
            btnEliminar.id = "btn-eliminar";
            btnEliminar.innerHTML = `<h1>Eliminar</h1>`;
            mostrar.appendChild(btnEliminar);
  
            btnEliminar.addEventListener("click", () => {
              fetch("./dynamics/php/eliminar.php?id=" + id_pokemon)
                .then((respuesta) => {

                  alert(id_pokemon)
                  alert("Pokémon eliminado");
                  window.location.reload();
                })
                .catch((error) => {
                  console.error("Error al eliminar el Pokémon:", error);
                });
            });
            const btnModificar = document.getElementById("btn-modificar");
            btnModificar.addEventListener("click", () => {
            divAgregar.style.display = "block";
            formAgregar.setAttribute("data-id", id_pokemon);
            btnEnviar.innerText = "Modificar";
          });
        });
      }
    });

    btnEnviar.addEventListener("click", (e) => {
        e.preventDefault();
        divAgregar.style.display = "none";
        const datosForm = new FormData(formAgregar);
        const id_pokemon = formAgregar.getAttribute("data-id");
        let url = "./dynamics/php/insertar.php";
        let mensaje = "Pokemon creado";
    
        if (id_pokemon) {
          url = "./dynamics/php/modificar.php?id=" + id_pokemon;
          mensaje = "Pokemon modificado";
        }
    
        fetch(url, {
          method: "POST",
          body: datosForm,
        })
          .then((respuesta) => {
            return respuesta.json();
          })
          .then((datosJSON) => {
            alert("OK");
          });
      });
    

});
  