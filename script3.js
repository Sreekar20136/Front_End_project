var scope=document.querySelector('body')
var contextmenu=document.querySelector('#contextMenu')
var options=document.querySelectorAll(".el")
var submitCaptionbtn=document.querySelector("submitCaption")
var container=document.getElementById("container")
var test;
var curr
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
    if (event.target.id==="e4"){
        var newImage=reduceResolution(curr.target)
        // console.log(newImage)
        curr.target.src=newImage
    }
    if (event.target.id==="e7"){
        var newImage= generateQRCodeFromImage(curr.target)
        // console.log(newImage)
        curr.target.src=newImage     
    }

   })
scope.addEventListener("click",(e)=>{
    if(e.target.offsetParent!=contextmenu){
        contextmenu.classList.remove("visible")
    }
},false);
function generateQRCodeFromImage(target) {
    // Create a new image element
    const image = new Image();
  
    // Set the image source to the given URL
    image.src = target;
  
    // Wait for the image to load
    image.onload = function() {
      // Create a new canvas element
      const canvas = document.createElement('canvas');
      
      // Set the canvas width and height to the image width and height
      canvas.width = image.width;
      canvas.height = image.height;
      
      // Draw the image onto the canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, image.width, image.height);
      
      // Get the data URL of the canvas as a PNG image
      const dataURL = canvas.toDataURL('image/png');
      
      // Generate the QR code from the data URL using qrcode.js
      const qr = new QRCode(document.createElement('div'));
      qr.makeCode(dataURL);
      
      // Append the QR code to the body
      document.body.appendChild(qr._el);
    };
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
  

function increaseBrightness(target, factor) {
    // create a canvas element
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
  
    // set the canvas dimensions to the size of the image
    canvas.width = target.naturalWidth;
    canvas.height = target.naturalHeight;
  
    // draw the image onto the canvas
    ctx.drawImage(target, 0, 0);
  
    // get the image data from the canvas
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
  
    // loop through each pixel and increase its brightness
    for (var i = 0; i < data.length; i += 4) {
      data[i] *= factor; // red
      data[i + 1] *= factor; // green
      data[i + 2] *= factor; // blue
    }
  
    // put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
  
    // create a new image object with the modified image data
    var newImage = new Image();
    newImage.src = canvas.toDataURL();
  
    // return the new image object
    return newImage;
  }
  
  

function reduceResolution(target, callback){
    // create a new image object
var img = new Image();

// set the image source
img.src=target.src
img.crossOrigin="anonynomous"
// wait for the image to load
  // create a canvas element
var canvas = document.createElement('canvas');
var reducedImageData;
  // set the canvas dimensions to the desired resolution
  resImage=img.onload = function() {
      canvas.width = img.width/3;
      canvas.height = img.height/3;

      var ctx = canvas.getContext('2d');

      ctx.drawImage(img,0,0, canvas.width, canvas.height);
      
        // get the reduced resolution image data from the canvas
        reducedImageData = canvas.toDataURL();
        // do something with the reduced resolution image data
        // console.log(reducedImageData);
        return reducedImageData
    }();
    // console
    return resImage
    
}