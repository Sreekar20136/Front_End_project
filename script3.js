var scope=document.querySelector('body')
var contextmenu=document.querySelector('#contextMenu')
var options=document.querySelectorAll(".el")
var submitCaptionbtn=document.querySelector("submitCaption")
var container=document.getElementById("container")
var test;
var curr;
scope.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
    // let events=Array.from(e.target.src)
    const{clientX:mouseX,clientY:mouseY}=e;
    contextmenu.style.top=`${mouseY}px`
    contextmenu.style.left=`${mouseX}px`
    contextmenu.classList.add("visible")
    curr=e},false);
    


contextmenu.addEventListener('click',(event)=>{
    if (event.target.id=="e1"){
        var newWindow = window.open();
            var img=newWindow.document.createElement('IMG')
            img.src=curr.target.src
            newWindow.document.body.appendChild(img);
            newWindow.focus();
    }
    if (event.target.id==="e2"){
        var newImage=rgbToGrayscale(curr.target)
        // console.log(newImage)
        curr.target.src=newImage.src;
    }
    if (event.target.id=="e6"){
        test=curr
            var duplicateImage=document.createElement('IMG')
            var div=document.createElement("div")
            duplicateImage.src=curr.target.src
            div.append(duplicateImage)
            console.log(curr.target.src)
            container.appendChild(div)
    }
    if(event.target.id=="e5"){
        curr.target.style.borderRadius="50%";
            curr.target.style.width='150px';
            curr.target.style.height='150px';
            curr.target.style.display="flex";
            curr.target.style.alignItems='center';
    }
    if(event.target.id=="e3"){
        var newImage = increaseBrightness(curr.target, 1.5);
        curr.target.src = newImage.src;
 }
 if (event.target.id === "e4") {
    reduceResolution(curr.target, function(reducedImage) {
      curr.target.src = reducedImage.src;
    });
  }
    if (event.target.id==="e7"){
          
    }

   })
scope.addEventListener("click",(e)=>{
    if(e.target.offsetParent!=contextmenu){
        contextmenu.classList.remove("visible")
    }
},false);
function increaseBrightness(target, factor) {
  // create a canvas element
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  
  // set the canvas dimensions to the size of the image
  canvas.width = target.naturalWidth;
  canvas.height = target.naturalHeight;
  
  // draw the image onto the canvas
  ctx.drawImage(target, 0, 0);
  
  // get the image data from the canvas
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  
  // loop through each pixel and increase the brightness
  for (var i = 0; i < data.length; i += 4) {
    var red = data[i];
    var green = data[i + 1];
    var blue = data[i + 2];
  
    // increase the brightness of each color channel
    red = Math.min(Math.floor(red * factor), 255);
    green = Math.min(Math.floor(green * factor), 255);
    blue = Math.min(Math.floor(blue * factor), 255);
  
    // set the pixel values to the new brightness
    data[i] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }
  
  // put the modified image data back onto the canvas
  ctx.putImageData(imageData, 0, 0);
  
  // create a new image object with the modified image data
  var newImage = new Image();
  newImage.src = canvas.toDataURL();
  
  // return the new image object
  return newImage;
}


  
function rgbToGrayscale(target) {
    // create a canvas element
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
  
    // set the canvas dimensions to the size of the image
    canvas.width = target.naturalWidth;
    canvas.height = target.naturalHeight;
  
    // draw the image onto the canvas
    ctx.drawImage(target, 0, 0);
  
    // get the image data from the canvas
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
  
    // loop through each pixel and convert it to grayscale
    for (var i = 0; i < data.length; i += 4) {
      var red = data[i];
      var green = data[i + 1];
      var blue = data[i + 2];
  
      // calculate the grayscale value using the luminosity method
      var gray = 0.21 * red + 0.72 * green + 0.07 * blue;
  
      // set the pixel values to the grayscale value
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
  
    // put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
  
    // create a new image object with the modified image data
    var newImage = new Image();
    newImage.src = canvas.toDataURL();
  
    // return the new image object
    return newImage;
  }
  
  function reduceResolution(target, callback) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
  
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      var width = img.width / 2;
      var height = img.height / 2;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      var reducedImage = new Image();
  
      // Set the reduced image dimensions to match the original image
      reducedImage.width = target.width;
      reducedImage.height = target.height;
  
      var tempCanvas = document.createElement('canvas');
      var tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = target.width;
      tempCanvas.height = target.height;
  
      // Draw the reduced image on a temporary canvas to preserve the aspect ratio
      tempCtx.drawImage(canvas, 0, 0, width, height, 0, 0, target.width, target.height);
      reducedImage.src = tempCanvas.toDataURL();
      callback(reducedImage);
    };
    img.src = target.src;
  }
