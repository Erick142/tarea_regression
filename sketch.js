// Variables globales para la serpiente, resolución de la cuadrícula, comida, y dimensiones de la cuadrícula.
let rez = 20; // Factor de resolución para escalar todo el juego.
let w; // Ancho del campo de juego en "unidades" de juego, no en píxeles.
let h; // Altura del campo de juego en "unidades" de juego, no en píxeles.

let mobilenet;
let label = '.....';

let trainButton;
let modelIsready = false;
// let upButton;
// let downButton;
// let leftButton;
// let rightButton;
let predictor;
let slider;
let botonAñadir;
let botonSave;

let botonCargarModelo;


let camera;
//canvas camara

function setup(){
  createCanvas(400,400);
  
  camera = createCapture(VIDEO);
  camera.size(400,400)
  camera.hide();

  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  predictor = mobilenet.regression(camera, cameraReady);
  
  slider = createSlider(0, 1, 0.5, 0.01);

  botonAñadir = createButton('add');
  botonAñadir.mousePressed(function(){
    console.log(slider.value());
    predictor.addImage(slider.value());
  })
  
  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    predictor.train(whileTraining);
  });

  botonSave = createButton('save');
  botonSave.mousePressed(()=>{
    predictor.save();
  })

  botonCargarModelo = createButton("load model");
  botonCargarModelo.mousePressed(function(){
    predictor.load("model.json", customModelReady);
  })
}
function draw(){
  background(100);
  image(ml5.flipImage(camera), 0, 0, width, height);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}

function customModelReady(){
  predictor.predict(gotResults);
}


// Función de configuración inicial para p5.js, se llama una vez al inicio.


function modelReady() {
  console.log('Model is ready!!!');
}

function cameraReady() {
  console.log('camera is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    predictor.predict(gotResults);
    modelIsready = true;
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
    label = result.value;
    predictor.predict(gotResults);
  }
}


// Función de dibujo que p5.js llama en bucle para animar el jue
