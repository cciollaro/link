//for cross-browser compatibility
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

//fixes stretched out text
var RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
})();

var canvas = document.getElementById('game');

canvas.addEventListener("click", function(){
    document.getElementById("in").focus();
});

var ctx = canvas.getContext("2d");
ctx.setTransform(RATIO, 0, 0, RATIO, 0, 0);

function refreshCanvasSize(newWidth, newHeight){
    canvas.width = newWidth * RATIO;
    canvas.height = newHeight * RATIO;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,   0, newWidth, newHeight);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = "20pt sans-serif";
}
refreshCanvasSize(settings.width, settings.height);

var active_kana = new ActiveKana();
active_kana.add(new Kana());
var score = 0;
var paused = true;
var new_kana_in = 120;

function animate() {
    if(paused) {
        ctx.fillStyle = '#000000'; // set canvas background color
        ctx.fillRect(0,0,settings.width,settings.height);
        ctx.fillStyle = '#FFFFFF'; // set canvas font color
        ctx.fillText("paused", settings.width/2 - 40, settings.height/2);
        requestAnimFrame(animate);
        return;
    }

    // update
    new_kana_in--;
    if(new_kana_in <= 0){
        active_kana.add(new Kana());
        new_kana_in = 120 - 100*settings.quantity*settings.quantity;
    }

    active_kana.forEach(function(kana){
        if(kana.y > settings.height){
            active_kana.remove(kana);
            score--;
            redrawScore();
        } else {
            //kana.y += settings.speed;
            kana.y += 2.5*settings.speed;
        }
    });

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000'; // set canvas background color
    ctx.fillRect(0,0, settings.width, settings.height);
    ctx.fillStyle = '#FFFFFF'; // set canvas font color

    // draw stuff
    active_kana.forEach(function(kana){
        ctx.fillText(kana.hiragana, kana.x, kana.y);
    });

    // request new frame
    requestAnimFrame(animate);
}
animate();

document.getElementById('in').addEventListener('keyup', function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code === 27){ //esc
            this.blur();
    } else if(code === 13){ //enter
            this.value = "";
    } else {
        var val = this.value;
        var playedSound = false;
        var gotOne = false;
        active_kana.forEach(function(kana){
            if(kana.english === val){
                if(!playedSound){
                    if(!settings.mute) {sounds[val].play();}
                    playedSound = true;
                }
                active_kana.remove(kana);
                gotOne = true;
            }
        });
        if(gotOne){
            this.value = "";
            score++;
            redrawScore();
        }
     }   
});

document.getElementById('in').addEventListener('focus', function(){
    paused = false;
});

document.getElementById('in').addEventListener('blur', function(){
   paused = true;
});


document.getElementById("settings_icon").addEventListener('mousedown', pause); 
document.getElementById("return_to_game").addEventListener('click', unpause);

function pause(){
    document.getElementById("settings_overlay").style.display = "block";
}

function unpause(){
    document.getElementById("settings_overlay").style.display = "none";
}

function redrawScore(){
    document.getElementById('score').innerText = 'Score: ' + score;
}
