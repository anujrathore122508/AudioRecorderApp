// Wait for the Cordova device to be ready
document.addEventListener("deviceready", function () {
    let mediaFilePath; // Variable to store the path of the recorded file

    // Function to record audio
    document.getElementById("recordButton").addEventListener("click", function () {
        navigator.device.capture.captureAudio(
            function (mediaFiles) {
                mediaFilePath = mediaFiles[0].fullPath; // Save the file path
                document.getElementById("status").textContent = "Recording saved at: " + mediaFilePath;
            },
            function (error) {
                document.getElementById("status").textContent = "Recording failed: " + error.message;
            }
        );
    });

    // Function to play audio
    document.getElementById("playButton").addEventListener("click", function () {
        if (mediaFilePath) {
            let media = new Media(
                mediaFilePath,
                function () {
                    document.getElementById("status").textContent = "Playback finished.";
                },
                function (error) {
                    document.getElementById("status").textContent = "Playback error: " + error.message;
                }
            );
            media.play();
        } else {
            document.getElementById("status").textContent = "No recording found.";
        }
    });
});
