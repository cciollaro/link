function Settings(){
    this.selectedKana = {};
    this.speed = 5;
    this.quantity = 5;
    this.mute = false;
    this.volume = 0.5;
    this.width = 980;
    this.height = 640;

    this.loadSettings();
    this.saveSettings();
}

Settings.prototype.loadSettings = function() {
    if(localStorage['selectedKana'])
        this.selectedKana = JSON.parse(localStorage['selectedKana']);
    if(localStorage['speed'])
        this.speed = parseFloat(localStorage['speed']);
    if(localStorage['quantity'])
        this.quantity = parseFloat(localStorage['quantity']);
    if(localStorage['mute'])
        this.mute = localStorage['mute'] == "true";
    if(localStorage['volume'])
        this.volume = parseFloat(localStorage['volume']);
};

Settings.prototype.saveSettings = function() {
    localStorage['selectedKana'] = JSON.stringify(this.selectedKana);
    localStorage['speed'] = this.speed.toFixed(2);
    localStorage['quantity'] = this.quantity.toFixed(2);
    localStorage['mute'] = this.mute.toString();
    localStorage['volume'] = this.volume.toFixed(2);
};

Settings.prototype.updateMute = function(newVal){

};
Settings.prototype.updateVol = function(newVal){

};
Settings.prototype.updateSpeed = function(newVal){

};
Settings.prototype.updateQuantity = function(newVal){

};

document.getElementById('mute_controller').addEventListener('click', function(){
    if(!playSounds){
        playSounds = true;
        document.getElementById("mute_controller").style.webkitMaskImage = 'url("/img/ic_volume_up_48px.svg")';
    } else {
        playSounds = false;
        document.getElementById("mute_controller").style.webkitMaskImage = 'url("/img/ic_volume_off_48px.svg")';
    }
});

document.getElementById('volSlider').addEventListener('change', function(){
   changeVolume(this.value);
});
settings = new Settings();
window.onbeforeunload = function() {
    alert("hi");
};
