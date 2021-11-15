//leaves at 2 mins before endtime. so you can change it if you want in the code.

//waits for 5 mins before entering a new class but based on tests you will have to increase that because people join even more late and youdont want to be in the class alonw tih the teacher when you are afk.

//takes endtime from website and save the time in endpoint

//saves your pass and username in locally stored variables

console.log("we do some trolling!!");
console.log(document.domain);
console.log(window.location.href);

chrome.storage.sync.get(["user", "pass", "time", "time2"], (a) => {
    localStorage.setItem("assuser", a.user);
    localStorage.setItem("asstime", a.time);
    localStorage.setItem("asspass", a.pass);
    localStorage.setItem("asstime2", a.time2);
})
var user = localStorage.getItem("assuser")
var pass = localStorage.getItem("asspass")


// change to your username and pass and also find a way to use the popup so that you can get stuff from there.
var rejointime = localStorage.getItem("asstime2")

var pretime = localStorage.getItem("asstime")
    //change this to adjust leave time i have kept it at 2 mins so that it will leave at 2 mins prior to ending it.
console.log("rejoin: ", rejointime)
console.log("leavemin: ", pretime)

window.addEventListener("load",
    function() {
        chrome.storage.sync.get(["work"], function(items2) {
            console.log(items2.work)
            if (items2.work == "true") {

                setTimeout(function() {
                    try {
                        if (window.location.href == "https://dpspune.edunexttech.com/StudentDashboardApp/StudentQuickDashboard#" || window.location.href ==
                            "https://dpspune.edunexttech.com/StudentDashboardApp/StudentQuickDashboard") {

                            console.log(document.querySelectorAll("#meeting_str_buffer .media-list .media .media-body .quiz-time span"));
                            let rf = document.querySelectorAll("#meeting_str_buffer .media-list .media .media-body .quiz-time span");

                            console.log(parseInt((rf[rf.length - 1].textContent).substring(11, 13)));

                            var endpoint = (parseInt((rf[rf.length - 1].textContent).substring(8, 10)) * 3600 * 1000) + ((parseInt((rf[rf.length - 1].textContent).substring(11, 13))) * 60 * 1000);

                            console.log("this is the time:" + endpoint)

                            //save the data
                            chrome.storage.sync.set({ "endp": endpoint }, function() {
                                console.log("data packet saved")
                            });

                            console.log(document.querySelectorAll("#meeting_str_buffer .media-list .media .media-right .buttontransition"));
                            var list1 = document.querySelectorAll("#meeting_str_buffer .media-list .media .media-right .buttontransition");
                            let sr = Array.from(list1);
                            console.log(sr)
                            sr[sr.length - 1].click();

                        } else if (document.domain == "meet.google.com") {

                            chrome.storage.sync.get(["endp"], function(items) {
                                console.log("here is the endtime:" + items.endp);

                                //retrieve data
                                var endpp = items.endp;

                                var today = new Date()
                                var time = (today.getHours() * 3600 * 1000) + (today.getMinutes() * 60 * 1000)

                                var intervals = (endpp - time) - pretime

                                console.log("here is the interval: " + intervals);

                                console.log("here is the current time: " + time);

                                //close cam
                                document.querySelector(".EIlDfe .MCcOAc .SSPGKf .T4LgNb .kFwPee .crqnQb .KWIIWd .gAGjv .vgJExf .Qmt7oc .KieQAe .ZUpb4c .oORaUb .mFzCLe .EhAUAc .GOH7Zb .GKGgdd .U26fgb .DPvwYc .IYwVEf .oTVIqe").click();
                                //mute mic
                                document.querySelector(".EIlDfe .MCcOAc .SSPGKf .T4LgNb .kFwPee .crqnQb .KWIIWd .gAGjv .vgJExf .Qmt7oc .KieQAe .ZUpb4c .oORaUb .mFzCLe .EhAUAc .ZB88ed .dP0OSd .GKGgdd .U26fgb .DPvwYc .SUtDBe").click();

                                //join meet
                                document.querySelector(".MCcOAc .SSPGKf .T4LgNb .kFwPee .crqnQb .KWIIWd .gAGjv  .vgJExf .Qmt7oc .KieQAe .d7iDfe .shTJQe .Sla0Yd .jtn8y .XCoPyb .uArJ5e").click();

                                //leave meet
                                setTimeout(function() {
                                    document.querySelector(".EIlDfe .MCcOAc .SSPGKf .T4LgNb .kFwPee .crqnQb .rG0ybd .Kn8SEb .cZG6je .NHaLPe .VfPpkd-Bz112c-LgbsSe").click()
                                    setTimeout(function() { window.open("https://dpspune.edunexttech.com/StudentDashboardApp/StudentQuickDashboard#", "_top"); }, rejointime);
                                    //this statement just makes it wait for some mins just so that there is some delay and you dont join the next class right away, also keep the value above the pretime value. it is at 5 mins right now.
                                }, intervals)
                            });






                        } else if (window.location.href == "https://dpspune.edunexttech.com/Index#") {
                            chrome.storage.sync.set({ "endp": 86400000 }, function() {
                                console.log("data packet saved")
                            });

                            document.getElementsByName("username")[0].value = user;
                            document.getElementsByName("password")[0].value = pass;


                            setInterval(function() {

                                document.querySelector("#user_login_btn").click();
                                document.querySelector(".login-container").click();


                            }, 2000)

                        }
                    } catch (error) {

                        if (window.location.href == "https://dpspune.edunexttech.com/StudentDashboardApp/StudentQuickDashboard#" || window.location.href ==
                            "https://dpspune.edunexttech.com/StudentDashboardApp/StudentQuickDashboard") {
                            chrome.storage.sync.set({ "endp": 86400000 }, function() {
                                console.log("data packet saved")
                            });
                            setInterval(function() { window.location.reload(); }, 60000);
                        }
                    }

                }, 3000);

            }
        })
    }


)