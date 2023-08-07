import nlp from 'compromise';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import htmlDocx from 'html-docx-js/dist/html-docx';
import PptxGenJS from 'pptxgenjs';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

let targetElement;
if (window.location.href.includes("bing.com")) {
 targetElement = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.outside-left-container");
} else if (window.location.href.includes("bard.google.com")) {
targetElement = document.querySelector("body > chat-app > side-navigation > mat-sidenav-container > mat-sidenav-content > main > chat-window ");


} else if (window.location.href.includes("chat.openai.com")) {
targetElement =  document.querySelector("#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2 > form")
} else{
  targetElement =  document.querySelector("#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2 > form")


}
if (targetElement) {
 // do something with targetElement
 console.log(targetElement);
}
// Create a file input element
// Create a file input element
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';

const fourButton = document.createElement('button');
fourButton.style.backgroundColor = '#00A67E';
fourButton.style.color = 'white';
fourButton.style.padding = '5px';
fourButton.style.borderRadius = '5px';
fourButton.style.display = 'flex';
if (window.location.href.includes("bard.google.com")) {
  fourButton.style.position = 'relative';
  fourButton.style.bottom = '-570px'; // 10 pixels from the bottom of the page
  fourButton.style.left = '-1050px';
  }
fourButton.style.marginRight = '5px';
fourButton.setAttribute('title', 'copy the text and then download word, PPT, PDF or html');
fourButton.style.maxWidth = '35px';
fourButton.style.maxHeight = '37px';

const tooltip = document.createElement("span");
// tooltip.textContent = "copy the text and then download word, PPT, PDF or html";
tooltip.style.display = "none";
tooltip.style.position = "absolute";
tooltip.style.backgroundColor = "#00A67E";
tooltip.style.color = "white";
tooltip.style.padding = "5px";
tooltip.style.borderRadius = "5px";
tooltip.style.top = "20px";

// Create two buttons for the tooltip
const tooltipButton1 = document.createElement("button");
tooltipButton1.textContent = "Video";
tooltipButton1.style.backgroundColor = "#4CAF50"; // Set the background color
tooltipButton1.style.color = "white"; // Set the text color
tooltipButton1.style.padding = "12px 20px"; // Add some padding
tooltipButton1.style.border = "none"; // Remove the border
tooltipButton1.style.cursor = "pointer";
tooltipButton1.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
// Change the cursor on hover
tooltip.appendChild(tooltipButton1);

const tooltipButton2 = document.createElement("button");
tooltipButton2.textContent = "Documents";
tooltipButton2.style.backgroundColor = "#008CBA"; // Set the background color
tooltipButton2.style.color = "white"; // Set the text color
tooltipButton2.style.padding = "12px 20px"; // Add some padding
tooltipButton2.style.border = "none"; // Remove the border
tooltipButton2.style.cursor = "pointer"; // Change the cursor on hover
tooltipButton2.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
tooltip.appendChild(tooltipButton2);
const spinner = document.createElement('div');
spinner.style.display = 'none';
spinner.style.position = 'absolute';
spinner.style.width = '40px';
spinner.style.height = '40px';
spinner.style.border = '4px solid #f3f3f3';
spinner.style.borderTop = '4px solid #3498db';
spinner.style.borderRadius = '50%';
spinner.style.animation = 'spin 2s linear infinite';

// Add the spinner to the page
document.body.appendChild(spinner);

// Add a CSS animation for the spinner
const style = document.createElement('style');
style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
document.head.appendChild(style);

// Update the position of the spinner based on the current mouse position
document.addEventListener('mousemove', event => {
    spinner.style.top = event.clientY + 'px';
    spinner.style.left = event.clientX + 'px';
});

// Add event listeners to the buttons in the tooltip
tooltipButton1.addEventListener("click", () => {
  // alert("Tooltip button 1 clicked!");

  if (!document.hasFocus()) {
    console.log('document.hasFocus() before 1:>> ', document.hasFocus());
    // If not, bring focus to the document
    window.focus();
    console.log('document.hasFocus()  after 1:>> ', document.hasFocus());
    // popup.focus();
    // console.log('popup.focus() after:>> ', popup.focus());
    // console.log('document.hasFocus()  after 1:>> ', document.hasFocus());

  }
  // Add your code here
  
  const popup = window.open("", "", "width=700,height=500");
  // alert('Video will be displayed');
  window.focus();
  popup.focus();
//   console.log('popup.focus() 3:>> ', popup.focus());
  if (!document.hasFocus()) {
    console.log('document.hasFocus() before 2:>> ', document.hasFocus());
    // If not, bring focus to the document
    window.focus();
    console.log('document.hasFocus()  after 2:>> ', document.hasFocus());
    popup.focus();
    console.log('popup.focus() after:>> ', popup.focus());
  }
 
  // Add a style element to apply CSS to the popup
  const style = document.createElement("style");
  style.textContent = `
    body {
      font-family: sans-serif;
    }
    .container {
      position: relative;
    }
    .gif {
      width: 100%;
    }
    .text {
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      background-color: rgba(255,255,255,0.8);
      padding:10px;
      text-align:center;
    }
  `;
  
  popup.document.head.appendChild(style);
  
  // Add a container element to hold the GIF and text
  const container = document.createElement("div");
  container.classList.add("container");
  popup.document.body.appendChild(container);
  
  // Add an img element to display the GIF
  const gif = document.createElement("img");
  gif.classList.add("gif");
  gif.crossOrigin = "anonymous";
  container.appendChild(gif);
  
  // Add a div element to display the text
  const textElement = document.createElement("div");
  textElement.classList.add("text");
  popup.focus();
  // Get the clipboard text
  navigator.clipboard.readText().then((text) => {
    // Split the text into sentences
    const sentences = text.split(/[.!?]+/);

    // Speak each sentence using speech synthesis and display it in the text element
    let sentenceIndex = 0;
    function speakSentence() {
      if (sentenceIndex < sentences.length) {
        const sentence = sentences[sentenceIndex];
        console.log('sentence :>> ', sentence);
        // Use NLP to extract keywords from the current sentence
        let nouns = [];
        let words = nlp(sentence)
          .nouns()
          .out('array')
          .map(word => word.replace(/[^a-zA-Z\s]/g, ''))
          .filter(word => word.trim().length > 0);
        
        if (words.length > 1) {
          nouns.push(words[0]);
          nouns.push(words[1]);
        } else if (words.length === 1) {
          nouns.push(words[0]); 
        }
        let result = words[0] + ' ' + words[1];
        console.log('words[0] :>> ', words[0]);         
        console.log('words[1] :>> ', words[1]);        

        console.log('result :>> ', result);
        console.log('nouns.join :>> ', nouns.join(''));
        // Fetch a relevant GIF from the Giphy API and display it in the img element
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=B3605Y95fDsAEosLrcNQmahCQpL8SwF8&q=${encodeURIComponent(result)}&limit=1`)
          .then(response => response.json())
          .then(data => {
            if (data.data.length > 0) {
              gif.src = data.data[0].images.original.url;
              console.log('gif.src :>> ', gif.src);
            }
          });
        
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.onstart = () => {
          textElement.textContent = sentence;
          isSpeaking = true;
        };
        utterance.onend = () => {
          sentenceIndex++;
          speakSentence();
          isSpeaking = false;
        };
        window.speechSynthesis.speak(utterance);
      }
    }

    speakSentence();
    
    container.appendChild(textElement);
    
    const replayButton = document.createElement("button");
    replayButton.textContent = "Replay";
    replayButton.style.backgroundColor = '#00A67E';
    replayButton.style.color = 'white';
    replayButton.style.padding = '5px';
    replayButton.style.borderRadius = '5px';
    replayButton.style.marginRight = '5px';
    replayButton.addEventListener("click", () => {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      // Reset the GIF
      gif.src = "";
      
      // Reset the sentence index
      sentenceIndex = 0;
      
      // Speak the first sentence again
      speakSentence();
    });
    
    const recordButton = document.createElement("button");
    recordButton.textContent = "Record";
    recordButton.style.backgroundColor = '#00A67E';
    recordButton.style.color = 'white';
    recordButton.style.padding = '5px';
    recordButton.style.borderRadius = '5px';
    recordButton.style.marginRight = '5px';
    recordButton.style.display = 'none'; // <-- hide the pause button

    
    // Add an event listener to the download button
    recordButton.addEventListener("click", () => {
      console.log('record button clicked');
     
  // Create a new window with the popup.html file
    let popupWindow = popup.window.open('https://verdant-dramatic-raisin.glitch.me/', '', 'width=700,height=500');

    console.log('popupWindow :>> ', popupWindow);
  popupWindow.onload = function() {
  // Access the startRecording function in the popup window and call it
  console.log('loaded yeahhhh')
  

   // Automatically click the "Start Recording" button after 500ms
setTimeout(() => {
  const startRecordingButton = popupWindow.document.querySelector("#app-container > section > section.content > button")
  console.log('startRecordingButton :>> ', startRecordingButton);
  startRecordingButton.click();
  console.log('clikededededed')
  }, 1000);
  // Automatically click the "Start Recording" button after 500ms
  }
    });
    
    // Add the download button to the popup window
    popup.document.body.appendChild(recordButton);
    
    let mediaRecorder;

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "  Download";
    downloadButton.style.backgroundColor = '#00A67E';
    downloadButton.style.color = 'white';
    downloadButton.style.padding = '5px';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.marginRight = '5px';
 
    const pauseButton = document.createElement("button");
    const escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", { createHTML: (to_escape) => to_escape });

    pauseButton.innerHTML = escapeHTMLPolicy.createHTML("&#x23EF;"); // Unicode character for a double vertical bar
    pauseButton.style.backgroundColor = '#00A67E';
    pauseButton.style.color = 'white';
    pauseButton.style.padding = '5px';
    pauseButton.style.borderRadius = '5px';
    pauseButton.style.marginRight = '5px';
    pauseButton.style.display = 'none'; // <-- hide the pause button

    
    const stopButton = document.createElement("button");
    stopButton.innerHTML =  escapeHTMLPolicy.createHTML("&#x23F9;"); // Unicode character for a square
    stopButton.style.backgroundColor = '#00A67E';
    stopButton.style.color = 'white';
    stopButton.style.padding = '5px';
    stopButton.style.borderRadius = '5px';
    stopButton.style.marginRight = '5px';
    stopButton.style.display = 'none'; // <-- hide the pause button

    
    const playButton = document.createElement("button");


    playButton.innerHTML =  escapeHTMLPolicy.createHTML("&#x25B6;"); // Unicode character for a right-pointing triangle
    playButton.style.backgroundColor = '#00A67E';
    playButton.style.color = 'white';
    playButton.style.padding = '5px';
    playButton.style.borderRadius = '5px';
    playButton.style.marginRight = '5px';
    playButton.style.display = 'none'; // <-- hide the pause button


    const serverUrl2 = 'https://tejas56789ce.pythonanywhere.com';

downloadButton.addEventListener('click', async () => {
  // get the stream of the page's content

  pauseButton.style.display = 'inline-block';
  playButton.style.display = 'inline-block';
  stopButton.style.display = 'inline-block';

  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true
  });
    // spinner.style.display = 'block';

  // Execute your code here
window.speechSynthesis.cancel();

// Reset the GIF
gif.src = "";

// Reset the sentence index
sentenceIndex = 0;

// Speak the first sentence again
speakSentence();
  console.log('stream :>> ', stream);
  // create a new MediaRecorder instance
  mediaRecorder = new MediaRecorder(stream);

  // create an array to store the recorded data
  const chunks = [];

  // listen for dataavailable events and push the data to the chunks array
  mediaRecorder.addEventListener('dataavailable', event => {
    chunks.push(event.data);
    // console.log('chunks :>> ', chunks);
    // console.log('event.data :>> ', event.data);
  });

  // listen for the stop event and create a new Blob from the recorded data
  mediaRecorder.addEventListener('stop', async () => {

    spinner.style.display = 'block';

    const blob = new Blob(chunks, { type: 'video/webm' });
    // console.log('Original video blob in stop:', blob);
    const reader = new FileReader();

  // listen for the load event and log the resulting data URL to the console
  reader.addEventListener('load', () => {
    // console.log('Original video data URL:', reader.result);
  });

  // read the contents of the blob as a data URL
  reader.readAsDataURL(blob);
    // console.log('blob :>> ', blob);
    const formData = new FormData();
    formData.append('file', blob);
    // create a new object URL from the Blob
    const url = URL.createObjectURL(blob);
    // console.log('url :>> ', url);

    // send the FormData object to the server using a POST request
    const response = await fetch(`${serverUrl2}/crop`, {
      method: 'POST',
      body: formData
    });
    console.log('response :>> ', response);
    // get the cropped video blob from the response
    const croppedBlob = await response.blob();
    console.log('croppedBlob :>> ', croppedBlob);

    // create a new anchor element and set its href attribute to a URL created from the cropped video blob
    const b = document.createElement('a');
    b.href = URL.createObjectURL(croppedBlob);
    b.download = 'cropped_video.mp4';
    spinner.style.display = 'none';

    const response1 = await fetch('/delete', {
      method: 'POST',
      body: formData
    });
    
    // get the response text
    const text = await response1.text();
    
    // log the response text to the console
    console.log(text);

    // append the anchor element to the document body and click it to start the download
    document.body.appendChild(b);
    b.click();

    // remove the anchor element from the document
    document.body.removeChild(b);
  });

  // start recording
  mediaRecorder.start();
});
    pauseButton.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
      }
    });
    
    stopButton.addEventListener('click', () => {
      if (mediaRecorder && (mediaRecorder.state === 'recording' || mediaRecorder.state === 'paused')) {
        mediaRecorder.stop();
      }
    });
    
    playButton.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
      }
    });
    popup.document.body.appendChild(downloadButton);
    popup.document.body.appendChild(pauseButton);
    popup.document.body.appendChild(stopButton);
    popup.document.body.appendChild(playButton);
    // Add the download button to the popup window
    // Add the download button to the popup window
    const exitButton = document.createElement("button");
    exitButton.textContent = "Exit";
    exitButton.textContent = "Exit";
exitButton.style.backgroundColor = '#00A67E';
exitButton.style.color = 'white';
exitButton.style.padding = '5px';
exitButton.style.borderRadius = '5px';
exitButton.style.marginRight = '5px';
exitButton.style.display = "none";

    // Add an event listener to the exit button
    exitButton.addEventListener("click", () => {
      // Stop speech synthesis
      window.speechSynthesis.cancel();
      
      // Close the popup window
      popup.close();
    });
    const shareButton = document.createElement("button");
    shareButton.textContent = "Share";
shareButton.style.backgroundColor = '#00A67E';
shareButton.style.color = 'white';
shareButton.style.padding = '5px';
shareButton.style.borderRadius = '5px';
shareButton.style.marginRight = '5px';
    
    // Add an event listener to the exit button
    shareButton.addEventListener("click", () => {
     
      let modal = popup.document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modal.style.zIndex = '9999';
      modal.addEventListener('click', () => {
        modal.remove();
      });
    
      let iframe = popup.document.createElement('iframe');
      iframe.src = 'https://atom-tungsten-leaf.glitch.me/';
      iframe.width = '600';
      iframe.height = '100';
      iframe.style.position = 'absolute';
      iframe.style.top = '50%';
      iframe.style.left = '50%';
      iframe.style.transform = 'translate(-50%, -50%)';
      iframe.style.borderRadius = '10px';
      iframe.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
    
      let timeoutId;
      iframe.addEventListener('mouseenter', () => {
        timeoutId = setTimeout(() => {
          modal.remove();
        }, 7000);
      });
      iframe.addEventListener('mouseleave', () => {
        clearTimeout(timeoutId);
      });
    
      modal.appendChild(iframe);
      popup.document.body.appendChild(modal);

    });
    // Add the exit button to the popup window
    popup.document.body.appendChild(exitButton);

    // Add the replay button to the popup window
    popup.document.body.appendChild(replayButton);
    popup.document.body.appendChild(shareButton);

    popup.addEventListener("beforeunload", () => {
      // Stop speech synthesis
      console.log('speech stopped/start ')
      window.speechSynthesis.cancel();
      console.log('window.speechSynthesis.cancel(); :>> ', window.speechSynthesis.cancel());
    });
  });

});
tooltipButton2.addEventListener("click", async () => {
  // alert("Tooltip button 2 clicked!");
// Get the copied text
let text = "";
try {
  const clipboardItems = await navigator.clipboard.read();
  for (const clipboardItem of clipboardItems) {
    for (const type of clipboardItem.types) {
      if (type === "text/plain") {
        text = await clipboardItem.getType(type);
        text = await new Response(text).text();
      }
    }
  }
} catch (err) {
  console.error(err);
}

// Split the text into sentences
const sentences = text.split(/[.!?]+/);
console.log('sentences :>> ', sentences);

// Display the extracted text in a popup
const popup = window.open("", "", "width=700,height=500");
console.log('popup :>> ', popup);

  // Add a style element to apply CSS to the popup
  const style = document.createElement("style");
  console.log('style :>> ', style);
  style.textContent = `
    body {
      font-family: sans-serif;
    }
    .container {
      position: relative;
    }
    .gif {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      background-color: rgba(255,255,255,0.8);
      padding:10px;
      text-align:center;
    }
  `;

  popup.document.head.appendChild(style);

  // Loop through all the sentences
  for (const sentence of sentences) {
    // Add a container element to hold the image and text
    const container = document.createElement("div");
    console.log('container :>> ', container);
    container.classList.add("container");
    popup.document.body.appendChild(container);

    // Add an img element to display the image
    const image = document.createElement("img");
    console.log('image :>> ', image);
    image.classList.add("gif");
    container.appendChild(image);

    // Add a div element to display the text
    const textElement = document.createElement("div");
    console.log('textElement :>> ', textElement);
    textElement.classList.add("text");
    container.appendChild(textElement);

    // Display the sentence in the text element
    textElement.textContent = sentence;
    console.log('sentence :>> ', sentence);

    // Extract the nouns from the sentence using nlp
    let nouns = [];
    let words = nlp(sentence).nouns().out('array');
    console.log('words in image :>> ', words);
    if (words.length > 1) {
      nouns.push(words[0]);
      console.log('  nouns.push(words[0]) :>> ',   nouns.push(words[0]));
      nouns.push(words[1]);
      console.log('  nouns.push(words[1]) :>> ',   nouns.push(words[1]));

    } else if (words.length === 1) {
      nouns.push(words[0]); 
    }
    console.log('words[0] :>> ', words[0]);
    console.log('words[1] :>> ', words[1]);
    console.log('nouns.length :>> ', nouns.length);
    // Fetch a random image from Unsplash based on the extracted nouns and display it in the img element
if (nouns.length > 0) {
image.src = `https://source.unsplash.com/400x400/?${encodeURIComponent(nouns.join(' '))}`;
} else {
image.src = `https://source.unsplash.com/400x400/?money`;
}
  }
  
const formats = ['Word', 'PowerPoint', 'HTML', 'PDF', 'Excel'];
const buttonsContainer = document.createElement('div');
for (const format of formats) {
const button = document.createElement('button');
button.textContent = `${format}`;
button.style.backgroundColor = '#00A67E';
button.style.color = 'blue';
button.style.padding = '5px';
button.style.borderRadius = '5px';
button.style.marginRight = '5px';
button.addEventListener('click', async () => {
if (format === 'Word') {
        // Find all img elements in the HTML content
        const images = popup.document.querySelectorAll('img');
        console.log('images :>> ', images);
        // Loop through all img elements and add the crossOrigin attribute with the value 'anonymous'
        // for (const img of images) {
        //     img.setAttribute('crossOrigin', 'anonymous');
        // }
        console.log('popup.document.documentElement.outerHTML.length :>> ', popup.document.documentElement.outerHTML.length);
        // Generate HTML file content
        const content = `<!DOCTYPE html>\n${popup.document.documentElement.outerHTML}`;
        console.log('content.length :>> ', content.length);

        // Convert the HTML content to a Blob object representing a Word document
        const docx = htmlDocx.asBlob(content);
        console.log('docx :>> ', docx);

        // Trigger the download of the Word document using the saveAs function from the FileSaver.js library
        saveAs(docx, 'output.docx');
        let modal = popup.document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.zIndex = '9999';
        modal.addEventListener('click', () => {
          modal.remove();
        });
        let textDiv = popup.document.createElement('div');
        textDiv.textContent = '🎉 Thanks for downloading! 🎉\nPlease share it with others 😊';
        textDiv.style.position = 'absolute';
        textDiv.style.top = 'calc(50% - 100px)';
        textDiv.style.left = '50%';
        textDiv.style.transform = 'translate(-50%, -50%)';
        textDiv.style.color = 'white';
        textDiv.style.fontSize = '24px';
        textDiv.style.textAlign = 'center';
        textDiv.style.padding = '20px';
        textDiv.style.borderRadius = '10px';
        textDiv.style.backgroundColor = 'rgba(0, 166, 126, 0.6)';
        modal.appendChild(textDiv);
        let iframe = popup.document.createElement('iframe');
        iframe.src = 'https://atom-tungsten-leaf.glitch.me/';
        iframe.width = '600';
        iframe.height = '100';
        iframe.style.position = 'absolute';
        iframe.style.top = '50%';
        iframe.style.left = '50%';
        iframe.style.transform = 'translate(-50%, -50%)';
        iframe.style.borderRadius = '10px';
        iframe.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
      
        let timeoutId;
        iframe.addEventListener('mouseenter', () => {
          timeoutId = setTimeout(() => {
            modal.remove();
          }, 7000);
        });
        iframe.addEventListener('mouseleave', () => {
          clearTimeout(timeoutId);
        });
      
        modal.appendChild(iframe);
        popup.document.body.appendChild(modal);
    
}
if (format === 'HTML') {
    // Generate HTML file content
    const content = `<!DOCTYPE html>\n${popup.document.documentElement.outerHTML}`;
    console.log('content :>> ', content.length);

    // Create a Blob object from the content
    const blob = new Blob([content], { type: 'text/html' });

    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create an anchor element and set its href attribute to the URL
    const a = document.createElement('a');
    a.href = url;
    a.download = 'popup.html';

    // Append the anchor element to the document body and click it to trigger the download
    document.body.appendChild(a);
    a.click();

    // Remove the anchor element from the document body
    document.body.removeChild(a);
    let modal = popup.document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '9999';
    modal.addEventListener('click', () => {
      modal.remove();
    });
    let textDiv = popup.document.createElement('div');
    textDiv.textContent = '🎉 Thanks for downloading! 🎉\nPlease share it with others 😊';
    textDiv.style.position = 'absolute';
    textDiv.style.top = 'calc(50% - 100px)';
    textDiv.style.left = '50%';
    textDiv.style.transform = 'translate(-50%, -50%)';
    textDiv.style.color = 'white';
    textDiv.style.fontSize = '24px';
    textDiv.style.textAlign = 'center';
    textDiv.style.padding = '20px';
    textDiv.style.borderRadius = '10px';
    textDiv.style.backgroundColor = 'rgba(0, 166, 126, 0.6)';
    modal.appendChild(textDiv);
    let iframe = popup.document.createElement('iframe');
    iframe.src = 'https://atom-tungsten-leaf.glitch.me/';
    iframe.width = '600';
    iframe.height = '100';
    iframe.style.position = 'absolute';
    iframe.style.top = '50%';
    iframe.style.left = '50%';
    iframe.style.transform = 'translate(-50%, -50%)';
    iframe.style.borderRadius = '10px';
    iframe.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
  
    let timeoutId;
    iframe.addEventListener('mouseenter', () => {
      timeoutId = setTimeout(() => {
        modal.remove();
      }, 7000);
    });
    iframe.addEventListener('mouseleave', () => {
      clearTimeout(timeoutId);
    });
  
    modal.appendChild(iframe);
    popup.document.body.appendChild(modal);

}
if (format === 'PDF') {
  console.log('button click PDF')
    var doc = new jsPDF('l', 'pt');
    var containers = popup.document.querySelectorAll('.container');

    for (var i = 0; i < containers.length; i++) {
        // Convert the container element to a PNG data URL
        var imageData = await domtoimage.toPng(containers[i]);

        // Add the image to the PDF
        doc.addImage(imageData, 'PNG', 5, 5, 500, 200 * 2, undefined, 'FAST');

        // Add a new page if this is not the last container
        if (i < containers.length - 1) {
            doc.addPage();
        }
    }

    // Save the PDF
    doc.save('Document.pdf');

    let modal = popup.document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.zIndex = '9999';
        modal.addEventListener('click', () => {
          modal.remove();
        });
        let textDiv = popup.document.createElement('div');
        textDiv.textContent = '🎉 Thanks for downloading! 🎉\nPlease share it with others 😊';
        textDiv.style.position = 'absolute';
        textDiv.style.top = 'calc(50% - 100px)';
        textDiv.style.left = '50%';
        textDiv.style.transform = 'translate(-50%, -50%)';
        textDiv.style.color = 'white';
        textDiv.style.fontSize = '24px';
        textDiv.style.textAlign = 'center';
        textDiv.style.padding = '20px';
        textDiv.style.borderRadius = '10px';
        textDiv.style.backgroundColor = 'rgba(0, 166, 126, 0.6)';
        modal.appendChild(textDiv);
        let iframe = popup.document.createElement('iframe');
        iframe.src = 'https://atom-tungsten-leaf.glitch.me/';
        iframe.width = '600';
        iframe.height = '100';
        iframe.style.position = 'absolute';
        iframe.style.top = '50%';
        iframe.style.left = '50%';
        iframe.style.transform = 'translate(-50%, -50%)';
        iframe.style.borderRadius = '10px';
        iframe.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
      
        let timeoutId;
        iframe.addEventListener('mouseenter', () => {
          timeoutId = setTimeout(() => {
            modal.remove();
          }, 7000);
        });
        iframe.addEventListener('mouseleave', () => {
          clearTimeout(timeoutId);
        });
      
        modal.appendChild(iframe);
        popup.document.body.appendChild(modal);

}
if (format === 'PowerPoint') {
  // Create a new instance of the PptxGenJS library
  let pptx = new PptxGenJS();

  // Find all container elements in the HTML content
  const containers = popup.document.querySelectorAll('.container');
  console.log('containers :>> ', containers);

  // Loop through all container elements
  for (const container of containers) {
      // Create a new slide
      let slide = pptx.addSlide();

      // Find the img element within the container element
      const img = container.querySelector('img');

      // Add the image to the slide
      slide.addImage({
          path: img.src,
          x: 0,
          y: 0,
          w: '100%',
          h: '100%'
      });

      // Find the text element within the container element
      const textElement = container.querySelector('.text');

      // Add the text to the slide
      slide.addText(textElement.textContent, {
          x: 1.5,
          y: 1.5,
          w: '90%',
          h: '10%',
          color: 'FFFFFF',
          fontSize: 18
      });
  }

  // Save the PowerPoint presentation
  pptx.writeFile('example.pptx');
  let modal = popup.document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.zIndex = '9999';
        modal.addEventListener('click', () => {
          modal.remove();
        });
        let textDiv = popup.document.createElement('div');
        textDiv.textContent = '🎉 Thanks for downloading! 🎉\nPlease share it with others 😊';
        textDiv.style.position = 'absolute';
        textDiv.style.top = 'calc(50% - 100px)';
        textDiv.style.left = '50%';
        textDiv.style.transform = 'translate(-50%, -50%)';
        textDiv.style.color = 'white';
        textDiv.style.fontSize = '24px';
        textDiv.style.textAlign = 'center';
        textDiv.style.padding = '20px';
        textDiv.style.borderRadius = '10px';
        textDiv.style.backgroundColor = 'rgba(0, 166, 126, 0.6)';
        modal.appendChild(textDiv);
        let iframe = popup.document.createElement('iframe');
        iframe.src = 'https://atom-tungsten-leaf.glitch.me/';
        iframe.width = '600';
        iframe.height = '100';
        iframe.style.position = 'absolute';
        iframe.style.top = '50%';
        iframe.style.left = '50%';
        iframe.style.transform = 'translate(-50%, -50%)';
        iframe.style.borderRadius = '10px';
        iframe.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
      
        let timeoutId;
        iframe.addEventListener('mouseenter', () => {
          timeoutId = setTimeout(() => {
            modal.remove();
          }, 7000);
        });
        iframe.addEventListener('mouseleave', () => {
          clearTimeout(timeoutId);
        });
      
        modal.appendChild(iframe);
        popup.document.body.appendChild(modal);
}
if (format === 'Excel') {

  alert("Make sure you copied the table for properly excel file");
  console.log('excel button clicked');
  

  console.log('navigator :>> ', navigator);
  console.log('navigator.clipboard :>> ', navigator.clipboard);
  console.log('navigator.clipboard.readText() :>> ', navigator.clipboard.readText());
  navigator.clipboard.readText().then(clipboardData => {
    console.log('navigator clipboard')
    // Check the format of the text data
    let isTabSeparated = clipboardData.includes('\t');
    console.log('isTabSeperated :>> ', isTabSeparated);
    let isColumnSeparated = clipboardData.includes(':');
    console.log(isColumnSeparated);
    let isJSON = clipboardData[0] === '{' || clipboardData[0] === '[';
  console.log(isJSON);
    // Convert the string variable into a data table
    let rows = clipboardData.split('\n');
    let dataTable = [];
    if (isTabSeparated) {
      // Handle tab-separated data
      let headers = rows[0].split('\t');
      console.log(headers);
      for (let i = 1; i < rows.length; i++) {
        let values = rows[i].split('\t');
        let rowObject = {};
        for (let j = 0; j < values.length; j++) {
          rowObject[headers[j]] = values[j];
        }
        dataTable.push(rowObject);
      }
    } else if (isColumnSeparated) {
      // Handle column-separated data
      let rowObject = {};
      for (let i = 0; i < rows.length; i++) {
        let values = rows[i].split(':');
        if (values.length == 2) {
          rowObject[values[0].trim()] = values[1].trim();
        } else {
          if (Object.keys(rowObject).length > 0) {
            dataTable.push(rowObject);
            rowObject = {};
          }
          // Add remaining text to a new column
          rowObject['Remaining Text'] = rows[i];
        }
      }
      if (Object.keys(rowObject).length > 0) {
        dataTable.push(rowObject);
      }
    } else if (isJSON) {
      // Handle JSON data
      try {
        dataTable = JSON.parse(clipboardData);
      } catch (e) {
        // Handle invalid JSON data
        if (e instanceof SyntaxError) {
          try {
            dataTable = JSON.parse('[' + clipboardData + ']');
          } catch (e) {}
        }
      }
    }
  
    // Write the data table to an Excel file
    // This part uses the SheetJS library to create an Excel file from the data table
    let wb = XLSX.utils.book_new();
    console.log('wb :>> ', wb);
    let ws = XLSX.utils.json_to_sheet(dataTable, {header: ['Remaining Text'], skipHeader: true});
    console.log('ws :>> ', ws);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
    let modal = popup.document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '9999';
    modal.addEventListener('click', () => {
      modal.remove();
    });
    let textDiv = popup.document.createElement('div');
    textDiv.textContent = '🎉 Thanks for downloading! 🎉\nPlease share it with others 😊';
    textDiv.style.position = 'absolute';
    textDiv.style.top = 'calc(50% - 100px)';
    textDiv.style.left = '50%';
    textDiv.style.transform = 'translate(-50%, -50%)';
    textDiv.style.color = 'white';
    textDiv.style.fontSize = '24px';
    textDiv.style.textAlign = 'center';
    textDiv.style.padding = '20px';
    textDiv.style.borderRadius = '10px';
    textDiv.style.backgroundColor = 'rgba(0, 166, 126, 0.6)';
    modal.appendChild(textDiv);
    let iframe = popup.document.createElement('iframe');
    iframe.src = 'https://atom-tungsten-leaf.glitch.me/';
    iframe.width = '600';
    iframe.height = '100';
    iframe.style.position = 'absolute';
    iframe.style.top = '50%';
    iframe.style.left = '50%';
    iframe.style.transform = 'translate(-50%, -50%)';
    iframe.style.borderRadius = '10px';
    iframe.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
  
    let timeoutId;
    iframe.addEventListener('mouseenter', () => {
      timeoutId = setTimeout(() => {
        modal.remove();
      }, 7000);
    });
    iframe.addEventListener('mouseleave', () => {
      clearTimeout(timeoutId);
    });
  
    modal.appendChild(iframe);
    popup.document.body.appendChild(modal);

  });
}

// Function to convert an image to a data URL
function getDataUrl(img) {
// Create canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// Set width and height
canvas.width = img.width;
canvas.height = img.height;
// Draw the image
ctx.drawImage(img, 0, 0);
return canvas.toDataURL('image/jpeg');
}

// Find all images in the HTML content
const images = popup.document.querySelectorAll('img');
console.log('images :>> ', images);

// Loop through all images and replace their src attribute with a data URL
for (const img of images) {
// Create a new Image object
const image = new Image();
// Set the crossOrigin attribute of the new Image object to 'anonymous'
image.crossOrigin = 'anonymous';
// Set the src attribute of the new Image object to the src attribute of the original image
// Use a proxy server to fetch the image and add the proper CORS headers
image.src = img.src;
// When the new Image object has finished loading
image.onload = function() {
  // Convert the new Image object to a data URL
  const dataUrl = getDataUrl(image);
  // Replace the src attribute of the original image with the data URL
  img.src = dataUrl;
}
}
});

buttonsContainer.appendChild(button);
}
popup.document.body.appendChild(buttonsContainer);

});

fourButton.appendChild(tooltip);

// fourButton.addEventListener("mouseover", () => {
//   tooltip.style.display = "block";
// });

// fourButton.addEventListener("mouseout", () => {
//   tooltip.style.display = "none";
// });

targetElement.style.display ="flex";

const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
icon.setAttribute('width', '24');
icon.setAttribute('height', '24');
icon.setAttribute('viewBox', '0 0 24 24');

const escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", { createHTML: (to_escape) => to_escape });
icon.innerHTML = escapeHTMLPolicy.createHTML('<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>');

fourButton.appendChild(icon);

// Append the file input and button elements to the target element
targetElement.appendChild(fileInput);
targetElement.appendChild(fourButton);

window.addEventListener('click', (event) => {
  const clickedElement = event.target;

  // Check if the clicked element is the fourButton or its tooltip
  if (
    clickedElement === fourButton ||
    clickedElement === tooltip ||
    tooltip.contains(clickedElement)
  ) {
    // Clicked inside the fourButton or its tooltip, do nothing
    return;
  }

  // Clicked outside the fourButton or its tooltip, hide the tooltip after a delay
  setTimeout(() => {
    tooltip.style.display = 'none';
   
  }, 8000); // Delay of 3 seconds (3000 milliseconds)
});
fourButton.addEventListener('click', () => {
  // Display the tooltip
  tooltip.style.display = "block";
});
