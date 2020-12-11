const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt the user to select a media stream and pass to video element and play
async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch(error){
        console.log(error)
    }
}

button.addEventListener('click', async () => {
    // Button disable 
    button.disabled = true;
    // Start pictur in picture
    await videoElement.requestPictureInPicture();
    // Reset the Button
    button.disabled = fales;
});

// Onload
selectMediaStream();