console.log("set")


window.addEventListener('load', function() {


    document.getElementById("butn").addEventListener("click", function() {
        console.log("working")
        chrome.storage.sync.set({ "user": document.getElementById("name").value })
        chrome.storage.sync.set({ "pass": document.getElementById("pass").value })
        chrome.storage.sync.set({ "time": (document.getElementById("time").value) * 60 * 1000 })
        chrome.storage.sync.set({ "time2": (document.getElementById("time2").value) * 60 * 1000 })


    })
    if (localStorage.getItem("cheo") == "true") {
        document.getElementById("name").removeAttribute("disabled")
        document.getElementById("pass").removeAttribute("disabled")
        document.getElementById("time").removeAttribute("disabled")
        document.getElementById("butn").removeAttribute("disabled")
        document.getElementById("time2").removeAttribute("disabled")

        chrome.storage.sync.get(["user", "pass", "time", "time2"], function(a) {
            document.getElementById("name").value = a.user;
            document.getElementById("pass").value = a.pass;
            document.getElementById("time").value = (a.time / 60000);
            document.getElementById("time2").value = (a.time2 / 60000);
        })


    } else {
        document.getElementById("name").disabled = true;
        document.getElementById("pass").disabled = true;
        document.getElementById("time").disabled = true;
        document.getElementById("time2").disabled = true;
        document.getElementById("butn").disabled = true;

    }
    document.getElementById("cheo").addEventListener("click", function() {
        var checkbox = document.getElementById("cheo");
        localStorage.setItem("cheo", checkbox.checked);


        chrome.storage.sync.set({ "work": localStorage.getItem("cheo") }, function() {
            console.log("data packet saved")
            console.log(localStorage.getItem("cheo"))
        });

        window.location.reload();
    })
    var checked = JSON.parse(localStorage.getItem("cheo"));
    document.getElementById("cheo").checked = checked;




})