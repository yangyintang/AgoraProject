let handfail = function(err){
    console.log(err);

}

function addVideo(streamId){
    console.log("adding Video");
    let remoteContainer=document.getElementById("remoteStream");
    let streamDiv = document.createElement("div");
    streamDiv.id=streamId;
    streadDiv.style.height = "250px";
    remoteContainer.appendChild(streamDiv);
}
document.getElementById("join").onclick = function(){
    let channelName = document.getElementById("channelName").value;
    let Username = document.getElementById("username").value;
    let appId = "b7fd2e655be74322a899bccc39878088";

    let client = AgoraRTC.createClient({
        mode:"rtc",
        codec:"h264"
    })

    client.init(appId, ()=>console.log("AgoraRTC Client Connected"), handfail)
    client.join(null, channelName, Username, ()=>{
        var localStream = AgoraRTC.createStream({
            video: true,
            audio: true 
        })
        localStream.init(function(){
            localStream.play("SelfStream");
            console.log('App ID: ${appID}\nChannel Name: ${channelName}')
            client.publish(locakStream);
        })
    })
    client.on('stream-subscribed', function(evt){
        console.log("Subscribed Stream");
        let stream = evt.stream;
        addVideoStream(stream.getId());
        client.subscribe(evt.stream, handlefail);
        stream.play(stream.getId());
    })
}