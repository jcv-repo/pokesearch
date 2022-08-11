+ refactorizar apihandlers
+ revisitar pokemon context y hacer que la aplicación espere la respuesta del server
+ crear un contexto que contenga el estado de la app (ready, busy, etc)
¿ crear un componente de alto nivel que pueda superponerse sobre la aplicacion para mostrar estados
/ reescribir todo el indexeo de los resultados que está en searchformresults y moverlo a matchhandlers

¿ guardar en caché pokemon context cuando cargue

+ arreglar para que el actualizador de estado sepa reiniciarse si pasa de "waiting" a "ready" y borrar el mensaje por ej

¿ implementar combobox usando react-select

+ implementar dropdown de 'add' usando react-select
- implementar multi (chips) de react-select
¿ ver que wea los modales
/ chao headlessui

- agregar preview de la cantidad resultados en el boton de 'search'

+ agregar el pokemonList, abilityList etc a la base de datos del navegador

misc:
/ usar pokeapi en raiz (https://pokeapi.co/api/v2) para llegar al resto de los endpoints

8dejulio TODO:

+ revisar finalmente cómo se va a pasar el requestpokemondata al resto de la aplicacion
- escribir el useEffect para ID seleccionado y agregar esa info (pokemon-species) al searchResults
+ hacer que requestpokemondata retorne en realidad un objeto con la respuesta de la solicitud (.ok, .status, .results)
- escribir el comportamiento de searchformresults cuando la respuesta del request sea .ok false

request cancelled, another resource was already fetching this request but it failed

24dejulio TODO:

- en este instante tanto el fetcheo como la interacción a la base de datos se hace
  item por item, no todo de un parawaso, eso hace que todo sea muchísimo más lento
  hay que implementar la lógica en ambos casos (EN ESPECIAL en el caso de la base
  de datos local/dexie) para que se puedan pasar arreglos de datos como argumento

dev note: this implementation should be very straightforward really, just let
getAndFetchData() receive an array, put all queries in one promise.all, then let
dexie functions receive arrays of data and add logic to set everything in one
store, ez. Loading times should improve significanly after this
... also getAndFetchData() and requestPokemonData() should be mixed maybe(?


29dejulio TODO:
- pokemoncontext debería devolver instancias del objeto data en lugar de hacer
  retorno a cualquier de constante declarada dentro de la misma función 


31dejulio TODO:
- no existe verificacion de la query que se hace, cualquier query que se haga
  se pasará directamente a la busqueda, anteriormente se hacía en getDeconstrutedSearch
  pero lo quité de ahí pq no se puede recorrer los criterios disponibles de ahí
  
  
  
  
  6 de ago lessons:
  
 if there is one thing we should always strive to be as minimalistic as possible: its the state
