  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    $$("#volver").on('click', fnvolver);
    console.log("HOLA "+localidad);

    /*var url="https://ws.smn.gob.ar/map_items/forecast/1";
    app.request.json(url, function(datos){
    console.log("HOLA "+localidad);
    })*/

})
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    var url="https://ws.smn.gob.ar/map_items/forecast/1";
    app.request.json(url, function(datos){
        for (var i=0; i<datos.length; i++) {
            //console.log("hola");
            console.log(datos[i].name)
            $$("#selLoc").append('<option value="'+datos[i].name+'">'+datos[i].name+'</option>')
        }

      
    })
    $$("#inicio").on('click',fnmostrar)
})

//FUNCIONES
    localidad="";
    function fnmostrar(){
        localidad=$$("#selLoc").val(this.value);
        mainView.router.navigate('/about/');
    }

    function fnvolver() {
        mainView.router.navigate('/index/');
    }