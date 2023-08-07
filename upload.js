document.addEventListener('DOMContentLoaded', () => {

let targetElement;
    if (window.location.href.includes("bing.com")) {
    targetElement = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.outside-left-container");
   } else if (window.location.href.includes("bard.google.com")) {
   targetElement = document.querySelector("body > chat-app > side-navigation > mat-sidenav-container > mat-sidenav-content > main > chat-window");
   
   } else if (window.location.href.includes("chat.openai.com")) {
   targetElement =  document.querySelector("#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2 > form")
   }  else {
  // Default target element  
  targetElement = document.querySelector("#message-form");
      if(!targetElement) {
    targetElement = document.body; // fallback
  }
}

   if (targetElement) {
    // do something with targetElement
    console.log(targetElement);
   }
   // Create a file input element
   const fileInput = document.createElement('input');
   fileInput.type = 'file';
   fileInput.style.display = 'none';
   const uploadButton = document.createElement('button');
   // uploadButton.textContent = 'Upload';
   uploadButton.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
   // uploadButton.style.backgroundColor = '#00A67E';

   uploadButton.style.color = 'white';
   uploadButton.style.padding = '5px';
   uploadButton.style.borderRadius = '5px';
   uploadButton.style.display = 'flex';
   uploadButton.style.marginRight = '5px';
   uploadButton.setAttribute('title', 'upload audio ,video or any image supports mp3,mp4,etc');
   uploadButton.style.maxWidth = '35px';
   uploadButton.style.maxHeight = '37px';
   const tooltip = document.createElement("span");
   tooltip.textContent = "upload most of the audio ,video or any image and it supports mp3,mp4,etc";
   tooltip.style.display = "none";
   tooltip.style.position = "absolute";
   tooltip.style.backgroundColor = "#00A67E";
   tooltip.style.color = "white";
   tooltip.style.padding = "5px";
   if (window.location.href.includes("bard.google.com")) {
     uploadButton.style.position = 'relative';
     uploadButton.style.bottom = '-570px'; // 10 pixels from the bottom of the page
     uploadButton.style.left = '-1050px';
     }
   tooltip.style.borderRadius = "5px";
   if (window.location.href.includes("chat.openai.com")) {
     tooltip.style.top = "35px";
   } else if (window.location.href.includes("bard.google.com")) {
     tooltip.style.top = "600px";
   } else if (window.location.href.includes("bing.com")) {
     tooltip.style.top = "40px";
   }
   uploadButton.appendChild(tooltip);
   uploadButton.addEventListener("mouseover", () => {
     tooltip.style.display = "block";
   });
   
   uploadButton.addEventListener("mouseout", () => {
     tooltip.style.display = "none";
   });
  
   targetElement.style.display ="flex";
   const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
   icon.setAttribute('width', '24');
   icon.setAttribute('height', '24');
   icon.setAttribute('viewBox', '0 0 24 24');
 const escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", { createHTML: (to_escape) => to_escape });
   icon.innerHTML = escapeHTMLPolicy.createHTML('<path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5s-2.24-5-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>');
  
  uploadButton.appendChild(icon);
   const spinner = document.createElement('div');
   spinner.style.display = 'none';
   spinner.style.position = 'absolute';
   spinner.style.width = '40px';
   spinner.style.height = '40px';
   spinner.style.border = '4px solid #f3f3f3';
   spinner.style.borderTop = '4px solid #3498db';
   spinner.style.borderRadius = '50%';
   spinner.style.animation = 'spin 2s linear infinite';
   if(!targetElement) {
  // Fallback if no other targetElement set
  targetElement = document.body;
}
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
   
   
   
   
   // Append the file input and button elements to the target element
   targetElement.appendChild(fileInput);
   targetElement.appendChild(uploadButton);
   
   
   // Listen for button click
   uploadButton.addEventListener('click', () => {
  document.querySelector("#output").style.display = 'block';
  document.querySelector("body > bh-container").style.display = 'none'; 

       console.log('Button clicked');
       const clipboardData = navigator.clipboard;
       let imageFound = false;
   
       // Read the clipboard data as an image
       clipboardData.read().then(items => {
           // Loop over the items
   
          
   
           for (let i = 0; i < items.length; i++) {
               // Check if the item is an image
               if (items[i].types[0] === 'image/png') {
                   imageFound = true;
                   // Get the image blob
                   items[i].getType('image/png').then(blob => {
                       const reader = new FileReader();
                       reader.readAsDataURL(blob);
   
                       // When the file is loaded
                       reader.onload = event => {
                         spinner.style.display = 'block';
   
                           // Recognize text in the image using Tesseract.js
                           const formData = new FormData();
                           formData.append('image', blob);
   
                           fetch('https://sponsorssss.pythonanywhere.com/upload', {
                               method: 'POST',
                               body: formData
                           })
                               .then(response => response.text())
                               .then(text => {
                                   // Log the recognized text to the console
                                   console.log('text :>> ', text);
                                   text = text.replace(/\s+/g, ' ').trim();
                                //    console.log(text);
                                   let promptTextarea;
                                   console.log("will start promptext area");
                                   if (window.location.href.includes("chat.openai.com")) {
                                       promptTextarea = document.querySelector('#prompt-textarea');
   
                                   } else if (window.location.href.includes("bing.com")) {
                                       promptTextarea = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.main-container.body-2 > div.input-container.as-ghost-placement > cib-text-input").shadowRoot.querySelector("#searchbox")
   
                                   } else if (window.location.href.includes("bard.google.com")) {
                                       promptTextarea = document.querySelector("#mat-input-0");
                                   } else {
                                    console.log("window found");
                                       promptTextarea = document.querySelector("#message-input");
                                       console.log("element found");
                                       console.log('promptTextarea :>> ', promptTextarea);                                   
                                   }
                                   if (promptTextarea) {
                                       promptTextarea.value = text;
                                       spinner.style.display = 'none';
   
                                   }
                               });
                       };
                   })
               }
           }
           if (!imageFound) {
               fileInput.click();
           }
       });
   });
   
   // Listen for file input change
   fileInput.addEventListener('change', async () => {
      document.querySelector("#output").style.display = 'block';
  document.querySelector("body > bh-container").style.display = 'none'; 
     // document.dispatchEvent(new Event('imageProcessed'));

       const file = fileInput.files[0];
       if (file.type.startsWith('image/')) {
         spinner.style.display = 'block';
   
       // Create a FormData object to hold the selected file
       const formData = new FormData();
       formData.append('image', file);
     
       // Send the image to the server
       fetch('https://sponsorssss.pythonanywhere.com/upload', {
         method: 'POST',
         body: formData
       })
         .then(response => response.text())
         .then(text => {
           // Log the extracted text to the console
           console.log('text :>> ', text);
           text = text.replace(/\s+/g, ' ').trim();
           console.log(text);
           let promptTextarea;
           if (window.location.href.includes("chat.openai.com")) {
           promptTextarea = document.querySelector('#prompt-textarea');
         
           }else if (window.location.href.includes("bing.com")){
           promptTextarea = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.main-container.body-2 > div.input-container.as-ghost-placement > cib-text-input").shadowRoot.querySelector("#searchbox")
           
           }else if (window.location.href.includes("bard.google.com")){
           promptTextarea = document.querySelector("#mat-input-0");
           }else {
            console.log("window found");
               promptTextarea = document.querySelector("#message-input");
               console.log("element found");
               console.log('promptTextarea :>> ', promptTextarea);                                   
           }
           $(document).ready(function() {

            var textarea = $('#message-input');
          
            textarea.on('keydown', function(e) {
          
              if(this.scrollHeight > this.clientHeight) {
                $(this).height(function(index, height) {
                  return height + 20;
                });
              }
          
            });
          
          });
          

           if (promptTextarea) {
             promptTextarea.value = text;
             spinner.style.display = 'none';
             const height = promptTextarea.scrollHeight;
             promptTextarea.style.height = height + 'px';
const event = new Event('keydown');
             const textarea = document.querySelector('#message-input');

textarea.dispatchEvent(event);
             console.log("keydowndone");

   
           }
         
         const textarea = document.querySelector('#message-input');

         textarea.on('input', function() {
  if(promptTextarea.value === '') {
   promptTextarea.style.height = '30px'; 
      promptTextarea.refresh(); // refresh element 

  }
           if(promptTextarea.scrollHeight === 0) {
  // reset height
                 promptTextarea.style.height = '30px'; 

}
  else if(promptTextarea.scrollHeight > promptTextarea.clientHeight) {
    promptTextarea.style.height = promptTextarea.scrollHeight + 'px';
  } 
})

         })
         .catch(error => {
           console.error(error);
         });}
         else if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
           // Handle audio and video files
          
           spinner.style.display = 'block';
   
           // Create a FormData object to send the file to the server
           const formData = new FormData();
           formData.append("file", file);
         
           // Start a timer to update the progress circle every 100ms
           let progress = 0;
           const interval = setInterval(() => {
             progress += 0.01;
             if (progress > 1) {
               progress = 0;
             }
             const circumference = 2 * Math.PI * 20;
             const offset = circumference - (circumference * progress);
             // progressCircle.setAttribute("stroke-dashoffset", `${offset}`);
           }, 100);
         
           // Make a request to your Flask app
           const response = await fetch("https://hetmeh.pythonanywhere.com/", {
             method: "POST",
             body: formData,
           });
           const data = await response.json();
         
           // Handle the response from your Flask app
           console.log(data.transcription);
           // svg.style.display = "none";
     
           // const promptarea = document.querySelector("#prompt-textarea")
           // console.log('promptTextArea aduio video:>> ', promptarea);
           // promptArea.value = data.transcription;
     
           let promptarea;
           if (window.location.href.includes("chat.openai.com")) {
           promptarea = document.querySelector('#prompt-textarea');
           console.log('promptarea :>> ', promptarea);
         
           }
           else if (window.location.href.includes("bing.com")){
           promptarea =document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.main-container.body-2 > div.input-container.as-ghost-placement > cib-text-input").shadowRoot.querySelector("#searchbox")
           
           }
           else if (window.location.href.includes("bard.google.com")){
           promptarea = document.querySelector("#mat-input-0");
           }
           else {
                                    console.log("window found");
                                       promptarea = document.querySelector("#message-input");
                                       console.log("element found");
                                       console.log('promptTextarea :>> ', promptarea);                                   
                                   }
           
           if (promptarea) {
             promptarea.value = data.transcription;
             console.log('data.transcription :>> ', data.transcription);
             console.log('promptarea.value :>> ', promptarea.value);
             spinner.style.display = 'none';
   const height = promptarea.scrollHeight;
             promptarea.style.height = height + 'px';
const event = new Event('keydown');
             const textarea = document.querySelector('#message-input');

textarea.dispatchEvent(event);
             console.log("keydowndone");
           }
           const textarea = document.querySelector('#message-input');

textarea.on('input', function() {
  if(promptarea.value === '') {
    promptarea.style.height = '30px'; 
      promptarea.refresh(); // refresh element 

  }
  if(promptarea.scrollHeight === 0) {
  // reset height
        promptarea.style.height = '30px'; 

}
  else if(promptarea.scrollHeight > promptarea.clientHeight) {
    promptarea.style.height = promptarea.scrollHeight + 'px';
  } 
})
           promptarea.addEventListener("mouseover", () => {
             // pressEnter(promptTextArea);
           });
     
           // Stop the timer and hide the SVG element again
           clearInterval(interval);
           // svg.style.display = "none";
         } else {
           // Handle other file types
         }
         });

});