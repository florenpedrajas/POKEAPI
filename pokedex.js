const pokedex$$ = document.querySelector("#pokedex");
const searchInput$$ = document.querySelector(".search-container input");
const ALL_POKEMONS_INFO = []; // Cuando una variable se declara en scope global para ser usada por otros, se hace en mayúsculas.

const getAllPokemons = () =>
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((error) =>
      console.log("Error obteniendo todos los pokemons", error)
    );

function getOnePokemon(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) =>
      console.log("Error obteniendo pokemon individual", error)
    );
}

function renderPokemons(pokemons) {
  pokedex$$.innerHTML = "";

  pokemons.forEach(function (poke) {
    const li$$ = document.createElement("li");
    li$$.classList.add("card");

    const img$$ = document.createElement("img");
    img$$.src = poke.sprites.other.dream_world.front_default;
    img$$.alt = poke.name;
    img$$.classList.add("image-card");

    const div3$$ = document.createElement("div");
    div3$$.classList.add("divImg");
    div3$$.appendChild(img$$);

    const p$$ = document.createElement("p");
    p$$.classList.add("card-title");
    p$$.textContent = poke.name;

    const div$$ = document.createElement("div");
    div$$.classList.add("card-subtitle");
    div$$.textContent = "Tipo: " + poke.types[0].type.name;

    const div4$$ = document.createElement("div");
    div4$$.classList.add("id");
    div4$$.textContent = "Id: " + poke.id;

    const div1$$ = document.createElement("div");
    div1$$.classList.add("card-heigth");
    div1$$.textContent = "Altura: " + poke.height / 10 + " m";

    const div2$$ = document.createElement("div");
    div2$$.classList.add("card-Weight");
    div2$$.textContent = "Peso: " + poke.weight / 10 + " kg";

    const div5$$ = document.createElement("div");
    div5$$.classList.add("base_experience");
    div5$$.textContent = "Experiencia " + poke.base_experience;

    const div6$$ = document.createElement("div");
    div6$$.classList.add("stats");
    div6$$.textContent = "Fortaleza : " + poke.stats[0].base_stat;

    const div7$$ = document.createElement("div");
    div7$$.classList.add("abilities");
    div7$$.textContent = "Habilidades :" + poke.abilities[0].ability.name;

    li$$.appendChild(div3$$);
    li$$.appendChild(p$$);
    li$$.appendChild(div4$$);
    li$$.appendChild(div$$);
    li$$.appendChild(div1$$);
    li$$.appendChild(div2$$);
    li$$.appendChild(div5$$);
    li$$.appendChild(div6$$);
    li$$.appendChild(div7$$);

    pokedex$$.appendChild(li$$);
  });

}
  const search = (event) => {
    const value = event.target.value;
    console.log(value);

    const filtered = ALL_POKEMONS_INFO.filter (pokemon => {
      const matchName = pokemon.name.includes(value);
      const matchId = pokemon.id ==value;
      const matchType = pokemon.types.includes(value);
     

      return matchName || matchId || matchType;


  });
  renderPokemons(filtered);
};
const addEventsListeners = () => {
  const searchInput = document.querySelector(".search-container input");
  searchInput.addEventListener("input", search);
};

// Director de orquesta: irá llamando a otras funciones.
async function arrancar() {
  console.log("Ejecuntando peticiones pokedex...");
  addEventsListeners();

  const allPokemons = await getAllPokemons(); // array de objetos con name y url por cada pokemon
  // console.log('allPokemons:', allPokemons)

  // Itero por el array de pokemons, llamo a getOnePokemon una vez
  // por cada pokemon, pasándole la url de cada pokemon.
  for (const pokemon of allPokemons) {
    // Pido a la api la información de cada pokemon individual y la guardo en una variable
    const pokemonIndividualInfo = await getOnePokemon(pokemon.url);
    ALL_POKEMONS_INFO.push(pokemonIndividualInfo);
  }

  console.log("ALL_POKEMONS_INFO", ALL_POKEMONS_INFO);
  renderPokemons(ALL_POKEMONS_INFO);
}

window.onload = arrancar;
