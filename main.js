function preload(){

}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet",modelLoaded)
}

function draw(){
  image(video, 0, 0, 300, 300)
  classifier.classify(video, gotResult)
}

function modelLoaded(){
  console.log("Modelo Carregado")
}
function gotResult(error, results){
  if(error){
    console.log(error)
  }
  else{
    if((results[0].confidence>0.5)&&(previsao!=results[0].label)){
      console.log(results)
      previsao = results[0].label
      sent = window.speechSynthesis
      frase = "O objeto detectado e"+previsao
      falar = new SpeechSynthesisUtterance(frase)
      sent.speak(falar)
      document.getElementById("resultadoObjeto").innerHTML = precisao
      document.getElementById("resultadoPrecisao").innerHTML = results[0].confidence
    }
  }
}
