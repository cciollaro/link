//set up the sound table
var sounds = {};
for(var prop1 in hiragana){
    var row =  hiragana[prop1];
    for(var i = 0; i < row.length; i++){
        var sound = new Audio('mp3/' + row[i][1] + '.mp3');
        sound.volume = settings.volume;
        sounds[row[i][1]] = sound;
    }
}

function changeVolume(newVol){
    for(var prop3 in sounds){
        sounds[prop3].volume = newVol;
    }
}
