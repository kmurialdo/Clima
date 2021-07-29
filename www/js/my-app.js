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
      routes: [{
          path: '/about/',
          url: 'about.html',
      }, ]
      // ... other parameters
  });

  var mainView = app.views.create('.view-main');


  //VARIABLES GLOBALES
  var DatosenJson = [];
  var IdLocalidad = "";
  var localidad = "";


  // Handle Cordova Device Ready Event
  $$(document).on('deviceready', function() {
      console.log("Device is ready!");
  });


  // Option 1. Using one 'page:init' handler for all pages
  $$(document).on('page:init', function(e) {
      // Do something here when page loaded and initialized
      //console.log(e);
  })

  // Option 2. Using live 'page:init' event handlers for each page
  $$(document).on('page:init', '.page[data-name="index"]', function(e) {

      fetch("city.list.min.json")
          .then(response => response.json())
          .then(function(json) {
              for (var i = 0; i < json.length; i++) {
                  //console.log(json[i].country);
                  if (json[i].country == "AR") {
                      $$("#selLoc").append('<option value="' + json[i].id + '">' + json[i].name + '</option>')
                  }
              }
          });


      /*var url="https://ws.smn.gob.ar/map_items/forecast/1";
      app.request.json(url, function(datos){
          for (var i=0; i<datos.length; i++) {
              //console.log("hola");
              console.log(datos[i].name)
              $$("#selLoc").append('<option value="'+datos[i].name+'">'+datos[i].name+'</option>')
          }

        
      })*/
      $$("#inicio").on('click', fnmostrar)
  })

  $$(document).on('page:init', '.page[data-name="about"]', function(e) {
      $$("#volver").on('click', fnvolver);
      console.log("ID=  " + IdLocalidad);
      var url = "https://api.openweathermap.org/data/2.5/weather?id=" + IdLocalidad + "&appid=e6ebf83d68b3c2697fe3f937664d95a6&lang=es";
      app.request.json(url, function(datos) {

          /*for (var i=0; i<datos.length; i++) {
              if(datos[i].name == localidad) {*/
          $$("#localidad").html(datos.name);
          //$$("#provincia").html(datos[i].province);
          minima = parseInt(datos.main.temp_min - 273.15)
          maxima = parseInt(datos.main.temp_max - 273.15)
          $$("#temp_m").html(minima + " °C");
          $$("#temp_t").html(maxima + " °C");
          $$("#img_m").attr('src', 'http://openweathermap.org/img/wn/01d@2x.png');
          $$("#img_t").attr('src', 'http://openweathermap.org/img/wn/' + datos.weather[0].icon + 'd@2x.png');
          $$("#desc_m").html(datos.weather[0].description);
          //$$("#desc_t").html(datos[i].weather.afternoon_desc);


          /*    }
          }*/


      })
  })



  //FUNCIONES
  function fnmostrar() {
      IdLocalidad = $$("#selLoc").val();
      if (IdLocalidad == "todas") {
          toastFaltaElegir = app.toast.create({
              text: 'Por favor, selecciona una localidad',
              position: 'center',
              closeTimeout: 2000,
          });
          toastFaltaElegir.open();

      } else {

          mainView.router.navigate('/about/');
      }
  }

  function fnvolver() {
      mainView.router.navigate('/index/');
  }