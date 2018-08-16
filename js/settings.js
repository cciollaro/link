function Settings(){
    this.selectedKana = {};
    this.speed = 0.6;
    this.quantity = 0.5;
    this.mute = false;
    this.volume = 0.5;
    this.width = 980;
    this.height = 640;

    this.loadSettings();
    this.updateSettingsView();
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

Settings.prototype.updateSettingsView = function() {
    document.getElementById("volSlider").value = this.volume;
    document.getElementById("speedSlider").value = this.speed;
    document.getElementById("quantitySlider").value = this.quantity;
    if(!this.mute){
        document.getElementById("mute_controller").style.webkitMaskImage = 'url("img/ic_volume_up_48px.svg")';
    } else {
        document.getElementById("mute_controller").style.webkitMaskImage = 'url("img/ic_volume_off_48px.svg")';
    }
};

Settings.prototype.saveSettings = function() {
    localStorage['selectedKana'] = JSON.stringify(this.selectedKana);
    localStorage['speed'] = this.speed.toFixed(2);
    localStorage['quantity'] = this.quantity.toFixed(2);
    localStorage['mute'] = this.mute.toString();
    localStorage['volume'] = this.volume.toFixed(2);
};

Settings.prototype.updateMute = function(newVal){
    this.mute = newVal;
    localStorage['mute'] = this.mute.toString();
};
Settings.prototype.updateVol = function(newVal){
    this.volume = newVal;
    localStorage['volume'] = this.volume.toFixed(2);
};
Settings.prototype.updateSpeed = function(newVal){
    this.speed = newVal;
    localStorage['speed'] = this.speed.toFixed(2);
};
Settings.prototype.updateQuantity = function(newVal){
    this.quantity = newVal;
    localStorage['quantity'] = this.quantity.toFixed(2);
};

document.getElementById('mute_controller').addEventListener('click', function(){
    if(settings.mute){
        settings.updateMute(false);
        document.getElementById("mute_controller").style.webkitMaskImage = 'url("img/ic_volume_up_48px.svg")';
    } else {
        settings.updateMute(true);
        document.getElementById("mute_controller").style.webkitMaskImage = 'url("img/ic_volume_off_48px.svg")';
    }
});

document.getElementById('volSlider').addEventListener('change', function(){
    settings.updateVol(parseFloat(this.value));
    changeVolume(this.value);
});

document.getElementById('speedSlider').addEventListener('change', function(){
    settings.updateSpeed(parseFloat(this.value));
});

document.getElementById('quantitySlider').addEventListener('change', function(){
    settings.updateQuantity(parseFloat(this.value));
});

settings = new Settings();
window.onbeforeunload = function() {
   settings.saveSettings();
};
