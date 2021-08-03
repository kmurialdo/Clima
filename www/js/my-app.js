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
          { path: '/index/', url: 'index.html', },
          { path: '/pgclima/', url: 'pgclima.html', },
      ]
      // ... other parameters
  });

  var mainView = app.views.create('.view-main');


  //VARIABLES GLOBALES
  var Localidad = "";
 
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

      var url = "https://ws.smn.gob.ar/map_items/forecast/1"; 
      app.request.json(url, function(datos) {
          for (var i = 0; i < datos.length; i++) {
              //console.log("hola");
              //console.log(datos[i].name)
              $$("#selLoc").append('<option value="' + datos[i].name + '">' + datos[i].name + '</option>')
          }


      })
      $$("#IraClima").on('click', fnmostrar)
  })

  $$(document).on('page:init', '.page[data-name="pgclima"]', function(e) {
      console.log("ID=  " + Localidad);
      //DIA 1
      var url = "https://ws.smn.gob.ar/map_items/forecast/1";
      app.request.json(url, function(datos) {

          for (var i = 0; i < datos.length; i++) {
              if (datos[i].name == Localidad) {
                  $$("#localidad").html(datos[i].name);
                  $$("#provincia").html(datos[i].province);
                  //
                  $$("#dia1temp_m").html(datos[i].weather.morning_temp + " °C");
                  $$("#dia1temp_t").html(datos[i].weather.afternoon_temp + " °C");
                  $$("#dia1img_m").attr('src', 'https://www.smn.gob.ar/sites/all/themes/smn/img/weather-icons/25.png');
                  $$("#dia1img_t").attr('src', 'https://www.smn.gob.ar/sites/all/themes/smn/img/weather-icons/26.png');
                  $$("#dia1desc_m").html(datos[i].weather.morning_desc);
                  $$("#dia1desc_t").html(datos[i].weather.afternoon_desc);


              }
          }


      });

      //DIA 2
      var url = "https://ws.smn.gob.ar/map_items/forecast/2";
      app.request.json(url, function(datos2) {

          for (var i = 0; i < datos2.length; i++) {
              if (datos2[i].name == Localidad) {
                  $$("#dia2temp_m").html(datos2[i].weather.morning_temp + " °C");
                  $$("#dia2temp_t").html(datos2[i].weather.afternoon_temp + " °C");
                  $$("#dia2img_m").attr('src', 'https://www.smn.gob.ar/sites/all/themes/smn/img/weather-icons/25.png');
                  $$("#dia2img_t").attr('src', 'https://www.smn.gob.ar/sites/all/themes/smn/img/weather-icons/26.png');
                  $$("#dia2desc_m").html(datos2[i].weather.morning_desc);
                  $$("#dia2desc_t").html(datos2[i].weather.afternoon_desc);


              }
          }


      });
  })



  //FUNCIONES
  function fnmostrar() {
      Localidad = $$("#selLoc").val();
      if (Localidad == "todas") {
           toastFaltaElegir = app.toast.create({
               text: 'Por favor, selecciona una localidad',
               position: 'center',
               closeTimeout: 2000,
           });
           toastFaltaElegir.open();

       } else {
         mainView.router.navigate('/pgclima/');
           
       }
     

  }