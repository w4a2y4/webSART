const videoElement = document.querySelector('video');
const audioSelect = document.querySelector('select#audioSource');
const videoSelect = document.querySelector('select#videoSource');
var recorder;
var allChunks = [];

audioSelect.onchange = getStream;
videoSelect.onchange = getStream;

function gotDevices(deviceInfos) {
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label ||
        'microphone ' + (audioSelect.length + 1);
      audioSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' +
        (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Found another kind of device: ', deviceInfo);
    }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  const constraints = {
    audio: {
      deviceId: {exact: audioSelect.value}
    },
    video: {
      deviceId: {exact: videoSelect.value}
    }
  };

  navigator.mediaDevices.getUserMedia(constraints).
    then(gotStream).catch(handleError);
}

function gotStream(stream) {
  // window.stream = stream; // make stream available to console
  // videoElement.srcObject = stream;
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = pushblob;
  recorder.onstop = stoprecord;
  recorder.start();
}

function handleError(error) {
  console.error('Error: ', error);
}

function pushblob(e) {
    allChunks.push(e.data);
    console.log("!!!!");
}

function stoprecord() {
    var fullBlob = new Blob(allChunks);
    window.fb = fullBlob;
    window.dl = download;
    console.log(allChunks);
    console.log(fullBlob);
    download(fullBlob, 'media.webm');
}