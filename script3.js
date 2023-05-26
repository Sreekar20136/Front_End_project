var scope = document.querySelector('body');
var contextmenu = document.querySelector('#contextMenu');
var options = document.querySelectorAll(".el");
var submitCaptionbtn = document.querySelector("#submitCaption");
var container = document.getElementById("container");
var curr;
var test;

scope.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  const { clientX: mouseX, clientY: mouseY } = e;
  contextmenu.style.top = `${mouseY}px`;
  contextmenu.style.left = `${mouseX}px`;
  contextmenu.classList.add("visible");
  curr = e;
}, false);

contextmenu.addEventListener('click', (event) => {
  if (event.target.id == "e1") {
    var newWindow = window.open();
    var img = newWindow.document.createElement('IMG');
    img.src = curr.target.src;
    newWindow.document.body.appendChild(img);
    newWindow.focus();
  }
  if (event.target.id === "e2") {
    var newImage = rgbToGrayscale(curr.target);
    curr.target.src = newImage.src;
  }
  if (event.target.id === "e6") {
    var duplicateImage = document.createElement('img');
    duplicateImage.src = curr.target.src;
    
    var div = document.createElement("div");
    div.appendChild(duplicateImage);
    container.appendChild(div);
  }
  
  if (event.target.id == "e5") {
    curr.target.style.borderRadius = "50%";
    curr.target.style.width = '150px';
    curr.target.style.height = '150px';
    curr.target.style.display = "flex";
    curr.target.style.alignItems = 'center';
  }
  if (event.target.id === "e7") {
    const imageElement = curr.target;
    generateQRCodeFromImage(imageElement)
      .then(qrCodeImage => {
        // Do something with the generated QR code image
        console.log(qrCodeImage);
  
        // Here, you can display the QR code image or perform any other desired actions.
        // For example, you can append the generated QR code image to the document body:
        document.body.appendChild(qrCodeImage);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }
  if (event.target.id == "e3") {
    var newImage = increaseBrightness(curr.target, 1.5);
    curr.target.src = newImage.src;
  }
  if (event.target.id === "e4") {
    reduceResolution(curr.target, function (reducedImage) {
      curr.target.src = reducedImage.src;
    });
  }
  if (event.target.id === "e8") {
    const tone = prompt("Enter tone (reddish, blueish, greenish):");
    if (tone === "reddish" || tone === "blueish" || tone === "greenish") {
      const toneImage = convertToTone(curr.target, tone);
      curr.target.src = toneImage.src;
      console.log(toneImage); // The converted tone image
    } else {
      console.log("Invalid tone entered.");
    }
  }
});

scope.addEventListener("click", (e) => {
  if (e.target.offsetParent != contextmenu) {
    contextmenu.classList.remove("visible");
  }
}, false);

function increaseBrightness(target, factor) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = target.naturalWidth;
  canvas.height = target.naturalHeight;
  ctx.drawImage(target, 0, 0);
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var red = data[i];
    var green = data[i + 1];
    var blue = data[i + 2];
    red = Math.min(Math.floor(red * factor), 255);
    green = Math.min(Math.floor(green * factor), 255);
    blue = Math.min(Math.floor(blue * factor), 255);
    data[i] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }
  ctx.putImageData(imageData, 0, 0);
  var newImage = new Image();
  newImage.src = canvas.toDataURL();
  return newImage;
}

function rgbToGrayscale(target) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = target.naturalWidth;
  canvas.height = target.naturalHeight;
  ctx.drawImage(target, 0, 0);
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var red = data[i];
    var green = data[i + 1];
    var blue = data[i + 2];
    var gray = 0.21 * red + 0.72 * green + 0.07 * blue;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }
  ctx.putImageData(imageData, 0, 0);
  var newImage = new Image();
  newImage.src = canvas.toDataURL();
  return newImage;
}

function reduceResolution(target, callback) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    var width = img.width / 2;
    var height = img.height / 2;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    var reducedImage = new Image();
    reducedImage.width = target.width;
    reducedImage.height = target.height;
    var tempCanvas = document.createElement('canvas');
    var tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = target.width;
    tempCanvas.height = target.height;
    tempCtx.drawImage(canvas, 0, 0, width, height, 0, 0, target.width, target.height);
    reducedImage.src = tempCanvas.toDataURL();
    callback(reducedImage);
  };
  img.src = target.src;
}

function generateQRCodeFromImage(target) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = target.naturalWidth;
    canvas.height = target.naturalHeight;

    ctx.drawImage(target, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');

    const url = 'https://zxing.org/w/chart?cht=qr&chs=300x300&chld=L|0&chl=' + encodeURIComponent(dataUrl);

    const qrCodeImage = new Image();
    qrCodeImage.onload = function () {
      resolve(qrCodeImage);
    };
    qrCodeImage.onerror = function () {
      reject(new Error('Failed to generate QR code.'));
    };
    qrCodeImage.src = url;
  });
}

function convertToTone(target, tone) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = target.naturalWidth;
  canvas.height = target.naturalHeight;

  ctx.drawImage(target, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let red = data[i];
    let green = data[i + 1];
    let blue = data[i + 2];

    if (tone === 'reddish') {
      if (red <= green + blue) {
        red = Math.min(green + blue, 255);
      }
    } else if (tone === 'blueish') {
      if (blue <= red + green) {
        blue = Math.min(red + green, 255);
      }
    } else if (tone === 'greenish') {
      if (green <= red + blue) {
        green = Math.min(red + blue, 255);
      }
    }

    data[i] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
  }

  ctx.putImageData(imageData, 0, 0);

  const newImage = new Image();
  newImage.src = canvas.toDataURL();

  return newImage;
}

