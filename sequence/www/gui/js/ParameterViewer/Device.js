window.onload = function()
{
    if ( navigator.userAgent.match( /iPhone | Android. + Mobile/ ) )
    {
        document.getElementById("frame").height = "80%"
        document.getElementById("mainDiv").width = "50%"
        console.log(document.getElementById("frame"))
        console.log(document.getElementById("frame").height)

        document.getElementById("M0div").style.left = "2%";
        document.getElementById("M0div").style.top = "5%";
        document.getElementById("M1div").style.left = "2%";
        document.getElementById("M1div").style.top = "25%";
        document.getElementById("M2div").style.left = "2%";
        document.getElementById("M2div").style.top = "45%";

        document.getElementById("ros_status").style.top = "5%";
        document.getElementById("ros_status").style.left = "40%";

        document.getElementById("getButton").style.top = "10%";
        document.getElementById("getButton").style.left = "70%";
        document.getElementById("getButton").style.width = "20%";
        document.getElementById("getButton").style.height = "10%";
        
        document.getElementById("ShootSpotSelection").style.top = "22%";
        document.getElementById("ShootSpotSelection").style.left = "70%";
        document.getElementById("ShootSpotSelection").style.width = "20%";


    }
    
}