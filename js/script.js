// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyBj-rakWCJmpoVZ0s_qGABlqg_Pty95YCg",
//     authDomain: "webrtc-1f08c.firebaseapp.com",
//     databaseURL: "https://webrtc-1f08c.firebaseio.com",
//     projectId: "webrtc-1f08c",
//     storageBucket: "webrtc-1f08c.appspot.com",
//     messagingSenderId: "867960602598",
//     appId: "1:867960602598:web:17bb3f95cef9be2087a027",
//     measurementId: "G-C8EVJ4RR15"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>


//Create an account on Firebase, and use the credentials they give you in place of the following
// var config = {
//   apiKey: "AIzaSyBajPcoloVgJTcE44NhPLvVsqnWG9RSBEE",
//   authDomain: "simple-webrtc-video-chat.firebaseapp.com",
//   databaseURL: "https://simple-webrtc-video-chat.firebaseio.com",
//   projectId: "simple-webrtc-video-chat",
//   storageBucket: "simple-webrtc-video-chat.appspot.com",
//   messagingSenderId: "748074977719"
// };

var config = {
    apiKey: "AIzaSyBj-rakWCJmpoVZ0s_qGABlqg_Pty95YCg",
    authDomain: "webrtc-1f08c.firebaseapp.com",
    databaseURL: "https://webrtc-1f08c.firebaseio.com",
    projectId: "webrtc-1f08c",
    storageBucket: "webrtc-1f08c.appspot.com",
    messagingSenderId: "867960602598"
};

firebase.initializeApp(config);

var database = firebase.database().ref();
var yourVideo = document.getElementById("yourVideo");
var friendsVideo = document.getElementById("friendsVideo");
var yourId = Math.floor(Math.random()*1000000000);
//Create an account on Viagenie (http://numb.viagenie.ca/), and replace {'urls': 'turn:numb.viagenie.ca','credential': 'websitebeaver','username': 'websitebeaver@email.com'} with the information from your account
var servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'beaver','username': 'webrtc.websitebeaver@gmail.com'}]};
var pc = new RTCPeerConnection(servers);
pc.onicecandidate = (event => event.candidate?sendMessage(yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
pc.onaddstream = (event => friendsVideo.srcObject = event.stream);

function sendMessage(senderId, data) {
    var msg = database.push({ sender: senderId, message: data });
    msg.remove();
}

function readMessage(data) {
    var msg = JSON.parse(data.val().message);
    var sender = data.val().sender;
    if (sender != yourId) {
        if (msg.ice != undefined)
            pc.addIceCandidate(new RTCIceCandidate(msg.ice));
        else if (msg.sdp.type == "offer")
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
              .then(() => pc.createAnswer())
              .then(answer => pc.setLocalDescription(answer))
              .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})));
        else if (msg.sdp.type == "answer")
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }
};

database.on('child_added', readMessage);

const constraints = window.constraints = {
    audio: false,
    video: true
  };

function showMyFace() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => yourVideo.srcObject = stream)
    .then(stream => pc.addStream(stream));
}

function showFriendsFace() {
  pc.createOffer()
    .then(offer => pc.setLocalDescription(offer) )
    .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})) );
}
