var colorOfDisplay = 'rgb(109, 104, 97)';
var speed = 120;
var frequency = 6;
var horizontal = [0, 0, 1, 0, 0];
var vertical = [0, 1, 0, 0];
var pattern = 0;
var wan = 0;
var rand = '';
var turnedOn = false;

ResetVariables();
ValuesToDisplay();
TurnOffDisplay();

function ResetVariables(){
    speed = 120;
    frequency = 6;
    horizontal = [0, 0, 1, 0, 0];
    vertical = [0, 1, 0, 0];
    pattern = 0;
    wan = 0;
}

function ValuesToDisplay(){
    document.getElementById('dis_speed1').innerText = speed;
    document.getElementById('dis_speed2').innerText = speed;
    document.getElementById('dis_frequency').innerText = frequency;
    document.getElementById('dis_random').innerText = rand;

    if (horizontal[0]==1){
        document.getElementById("dis_horizontal_1").style.backgroundColor="black";
    }
    else{
        document.getElementById("dis_horizontal_1").style.backgroundColor=colorOfDisplay;
    }
    if (horizontal[1]==1){
        document.getElementById("dis_horizontal_2").style.backgroundColor="black";
    }
    else{
        document.getElementById("dis_horizontal_2").style.backgroundColor=colorOfDisplay;
    }
    if (horizontal[2]==1){
        document.getElementById("dis_horizontal_3").style.backgroundColor="black";
    }
    else{
        document.getElementById("dis_horizontal_3").style.backgroundColor=colorOfDisplay;
    }
    if (horizontal[3]==1){
        document.getElementById("dis_horizontal_4").style.backgroundColor="black";
    }
    else{
        document.getElementById("dis_horizontal_4").style.backgroundColor=colorOfDisplay;
    }
    if (horizontal[4]==1){
        document.getElementById("dis_horizontal_5").style.backgroundColor="black";
    }
    else{
        document.getElementById("dis_horizontal_5").style.backgroundColor=colorOfDisplay;
    }



    if (vertical[3]==1){
        document.getElementById("dis_vertical_1").style.backgroundColor="black";
    }
    else{
        document.getElementById("dis_vertical_1").style.backgroundColor=colorOfDisplay;
    }
    if (vertical[2]==1){
        document.getElementById("dis_vertical_2").style.backgroundColor="black";
    }
    else{
        document.getElementById("dis_vertical_2").style.backgroundColor=colorOfDisplay;
    }
    if (vertical[1]==1){
        document.getElementById("dis_vertical_3").style.backgroundColor="black";
    }
    else{
        document.getElementById("dis_vertical_3").style.backgroundColor=colorOfDisplay;
    }
    if (vertical[0]==1){
        document.getElementById("dis_vertical_4").style.backgroundColor="black";
    }
    else{
        document.getElementById("dis_vertical_4").style.backgroundColor=colorOfDisplay;
    }

    if (wan == 1){
        document.getElementById("dis_wan1").style.opacity=100;
    }
    if (wan == 2){
        document.getElementById("dis_wan1").style.opacity=0;
        document.getElementById("dis_wan2").style.opacity=100;
    }
    if (wan == 3){
        document.getElementById("dis_wan2").style.opacity=0;
        document.getElementById("dis_wan3").style.opacity=100;
    }
    if (wan == 4){
        document.getElementById("dis_wan3").style.opacity=0;
    }
}

function TurnOffDisplay(){
    document.getElementById('dis_speed1').innerText = '';
    document.getElementById('dis_speed2').innerText = '';
    document.getElementById('dis_frequency').innerText = '';
    document.getElementById('dis_random').innerText = '';
    document.getElementById("dis_horizontal_1").style.backgroundColor=colorOfDisplay;
    document.getElementById("dis_horizontal_2").style.backgroundColor=colorOfDisplay;
    document.getElementById("dis_horizontal_3").style.backgroundColor=colorOfDisplay;
    document.getElementById("dis_horizontal_4").style.backgroundColor=colorOfDisplay;
    document.getElementById("dis_horizontal_5").style.backgroundColor=colorOfDisplay;
    document.getElementById("dis_vertical_1").style.backgroundColor=colorOfDisplay;
    document.getElementById("dis_vertical_2").style.backgroundColor=colorOfDisplay;
    document.getElementById("dis_vertical_3").style.backgroundColor=colorOfDisplay;
    document.getElementById("dis_vertical_4").style.backgroundColor=colorOfDisplay;
    document.getElementById("dis_wan1").style.opacity=0;
    document.getElementById("dis_wan2").style.opacity=0;
    document.getElementById("dis_wan3").style.opacity=0;
}

function Bluetooth(){}

function CalibrateDisplay(){}


function SpeedUp() {
    if (turnedOn){
        sendRequest("/SpeedUp");
    
        if (speed<150){
            speed += 10;
        }
    
        ValuesToDisplay();
    }
}

function SpeedDown() {
    if (turnedOn){
        sendRequest("/SpeedDown");

        if (speed>30){
            speed -= 10;
        }

        ValuesToDisplay();
    }
}

function HorizontalLeft() {
    if (turnedOn && wan == 0){
        sendRequest("/HorizontalLeft");

        if (horizontal.filter(x => x === 1).length == 1){

            var a = horizontal.indexOf(1);
            if (a > 0){
                horizontal[a] = 0;
                horizontal[a-1] = 1;
            }
        }
        ValuesToDisplay();
    }
}

function HorizontalRight() {
    if (turnedOn && wan == 0){
        sendRequest("/HorizontalRight");

        if (horizontal.filter(x => x === 1).length == 1){

            var a = horizontal.indexOf(1);
            if (a < 4){
                horizontal[a] = 0;
                horizontal[a+1] = 1;
            }
        }
        ValuesToDisplay();
    }
}

function VerticalUp() {
    if (turnedOn){
        sendRequest("/VerticalUp");

        if (vertical.filter(x => x === 1).length == 1){

            var a = vertical.indexOf(1);
            if (a < 3){
                vertical[a] = 0;
                vertical[a+1] = 1;
            }
        }
        ValuesToDisplay();
    }
}

function VerticalDown() {
    if (turnedOn){
        sendRequest("/VerticalDown");

        if (vertical.filter(x => x === 1).length == 1){

            var a = vertical.indexOf(1);
            if (a > 0){
                vertical[a] = 0;
                vertical[a-1] = 1;
            }
        }
        ValuesToDisplay();
    }
}

function Reset() {
    if (turnedOn){
        sendRequest("/Reset");

        ResetVariables();
        ValuesToDisplay();
        turnedOn = false;
        TurnOffDisplay();
    }
    
}

function OnOff() {
    sendRequest("/OnOff");

    if (turnedOn){
        turnedOn = false;
        TurnOffDisplay();
    }
    else{
        turnedOn = true;
        ValuesToDisplay();
    }
}

function Stock() {
    if (turnedOn){
        sendRequest("/Stock");
    }
}

function WAN() {
    if (turnedOn){
        sendRequest("/WAN");

        wan++;
        if (wan == 1){
            horizontal = [1, 0, 0, 0, 1];
        }
        if (wan == 2){
            horizontal = [0, 1, 0, 1, 0];
        }
        if (wan == 3){
            horizontal = [0, 0, 1, 0, 0];
        }
        if (wan == 4){
            horizontal = [1, 1, 1, 1, 1];
        }
        if (wan == 5){
            wan = 0;
            horizontal = [0, 0, 1, 0, 0];
        }

        ValuesToDisplay();
    }
}

function Pattern() {
    if (turnedOn){
        sendRequest("/Pattern");
    }
}

function FrequencyUp() {
    if (turnedOn){
        sendRequest("/FrequencyUp");
        
        if (frequency<10){
            frequency += 1;
        }

        ValuesToDisplay();
    }
}

function FrequencyDown() {
    if (turnedOn){
        sendRequest("/FrequencyDown");

        if (frequency>2){
            frequency -= 1;
        }

        ValuesToDisplay();
    }
}

function HeightUp() {
    sendRequest("/HeightUp");
}

function HeightDown() {
    sendRequest("/HeightDown");
}

function HeightStop() {
    sendRequest("/HeightStop");
}



function ZoomContainer(){
    var size = screen.width;
    var zoom = Math.round(size/450 * 100) / 100;
    if (zoom < 1){
        document.getElementById("container").style.zoom=zoom;
    }
}
window.addEventListener('resize', function(event) {
    ZoomContainer();
}, true);

ZoomContainer();

function sendRequest(path) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path);
    xhr.send();
}