//preload the image
    var preloadedimage = new Image();
    preloadedimage.src = "ic_volume_up_48px.svg";
    var small_space = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";
    //for cross-browser compatibility
    //is floating around on internet, I forgot where I got this from
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();

	//fixes stretched out text
    //http://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas 
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

	var WIDTH = 980;
    var HEIGHT = 640;
    
	var canvas = document.getElementById('game');
        canvas.addEventListener("click", function(){
            document.getElementById("in").focus();
        });
    var ctx = canvas.getContext("2d");
    ctx.setTransform(RATIO, 0, 0, RATIO, 0, 0);
		
    var hiragana = {
        vowels: [['あ', 'a'],['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']],
        k: [['か', 'ka'],['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko']],
        s: [['さ', 'sa'],['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so']],
        t: [['た', 'ta'],['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to']],
        n: [['な', 'na'],['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no']],
        h: [['は', 'ha'],['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho']],
        m: [['ま', 'ma'],['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo']],
        y: [['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo']],
        r: [['ら', 'ra'],['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro']],
        w: [['わ', 'wa'], ['ん', 'n'], ['を', 'wo']],
        g: [['が', 'ga'],['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go']],
        z: [['ざ', 'za'],['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo']],
        d: [['だ', 'da'],['ぢ', 'di'], ['づ', 'du'], ['で', 'de'], ['ど', 'do']],
        b: [['ば', 'ba'],['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo']],
        p: [['ぱ', 'pa'],['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']]
    };

    var katakana = {
        vowels: [['ア', 'a'],['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o']],
        k: [['カ', 'ka'],['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko']],
        s: [['サ', 'sa'],['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so']],
        t: [['タ', 'ta'],['チ', 'chi'], ['ツ', 'tsu'], ['テ', 'te'], ['ト', 'to']],
        n: [['ナ', 'na'],['ニ', 'ni'], ['ヌ', 'nu'], ['ネ', 'ne'], ['ノ', 'no']],
        h: [['ハ', 'ha'],['ヒ', 'hi'], ['フ', 'fu'], ['ヘ', 'he'], ['ホ', 'ho']],
        m: [['マ', 'ma'],['ミ', 'mi'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo']],
        y: [['ヤ', 'ya'],['ユ', 'yu'], ['ヨ', 'yo']],
        r: [['ラ', 'ra'],['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro']],
        w: [['ワ', 'wa'], ['ン', 'n'], ['ヲ', 'wo']],
        g: [['ガ', 'ga'],['ギ', 'gi'], ['グ', 'gu'], ['ゲ', 'ge'], ['ゴ', 'go']],
        z: [['ザ', 'za'],['ジ', 'ji'], ['ズ', 'zu'], ['ゼ', 'ze'], ['ゾ', 'zo']],
        d: [['ダ', 'da'],['ヂ', 'di'], ['ヅ', 'du'], ['デ', 'de'], ['ド', 'do']],
        b: [['バ', 'ba'],['ビ', 'bi'], ['ブ', 'bu'], ['ベ', 'be'], ['ボ', 'bo']],
        p: [['パ', 'pa'],['ピ', 'pi'], ['プ', 'pu'], ['ペ', 'pe'], ['ポ', 'po']]
    };

    var languages = {};
    languages.katakana = katakana;
    languages.hiragana = hiragana;
    
    var order = ['a','i','u','e','o'];

    var onclicked = function(e){
        var row = this.className.substring(0, this.className.indexOf(" "));
        var symbol = this.id.substring(0, this.id.indexOf("_"));
        var set = this.id.substring(this.id.indexOf("_")+1, this.id.length);
        var col = order.indexOf(symbol.substring(symbol.length-1, symbol.length));
        
//        for (var x=0; x<languages[set][row].length; x++)

        //alert(symbol+ " "+ set + " was clicked in row "+ row);
        if(this.style.backgroundColor == "white" || this.style.backgroundColor == ""){
            if (!list[row])
                list[row] = [];
            list[row].push(languages[set][row][col]);
            localStorage[set+"_"+symbol] = true;
            this.style.backgroundColor = "rgb(204, 255, 220)";
        } else {
            list[row].splice(list[row].indexOf(languages[set][row][col]), 1);
            console.log(list[row]);
            localStorage[set+"_"+symbol] = false;
            this.style.backgroundColor = "white";
        }
    };

if (!localStorage['initialized'])
{
    
}

if (!localStorage['initialized'])
{
    order.forEach(function(e){
      localStorage['hiragana_'+e] = true;
                                      });
    localStorage['initialized'] = true;

}



var kanachart = document.createElement('div');
kanachart.className = "border_container";
    //make the checkboxes
    for(var prop in hiragana){
        var row = document.createElement('div');
        row.id = prop;
        for (var x=0; x<hiragana[prop].length; x++)
        {
            var symbol = hiragana[prop][x];
            
            var input = document.createElement('div');
            input.className = row.id + " symbol";
            input.innerHTML = symbol[0];
            input.id = symbol[1]+"_hiragana";

            var input1 = document.createElement('div');
            input1.className = row.id + " inner_symbol";;
            input1.innerHTML = "<br>"+symbol[1];

            var input2 = document.createElement('div');
            input2.className = row.id + " symbol";
            input2.innerHTML = katakana[prop][x][0];
            input2.id = katakana[prop][x][1]+"_katakana";

            input.addEventListener('click', onclicked);
            input2.addEventListener('click', onclicked);
            
            var smspace = document.createElement('img');
            smspace.src = small_space;
            smspace.className = "smspace";

            var block = document.createElement('div');
            block.appendChild(smspace);
            block.appendChild(input);
            block.appendChild(input1);
            block.appendChild(input2);
            block.className = "sym_block";
            block.id = katakana[prop][x][1];
            row.appendChild(block);
            
            // dat spacing hack tho
            if (hiragana[prop].length == 3 && x!=2)
            {
                var spacer = document.createElement('div');
                spacer.className = "sym_block";
                row.appendChild(spacer);
            }
            

        }
        kanachart.appendChild(row);
    }

    document.getElementById('settings').appendChild(kanachart);


    var list = {};
    
    // give them vowels in the beginning
    list.vowels = [];
    for (var x=0; x<order.length; x++)
    {
        list.vowels.push(hiragana.vowels[x]);
        document.getElementById(order[x]+"_hiragana").style.backgroundColor = "rgb(204, 255, 220)";
    }

    function pickRandomProperty(obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1/++count)
                result = prop;
        return result;
    }

    var Kana = function(){
        var choice;
        
        while (typeof choice == 'undefined')
        {
            var arr = list[pickRandomProperty(list)];
            choice = arr[parseInt(Math.random()*arr.length)];
        }
        
        this.hiragana = choice[0];
        this.english = choice[1];
        this.x = parseInt(Math.random()*(WIDTH-20));
        this.y = 0;
    };

    function ActiveKana(){
        this.arr = [];
    }

    ActiveKana.prototype = {
        add: function(kana){
            //check for empty spots in the array
            for(var i = 0; i < this.arr.length; i++){
                if(!this.arr[i]){
                    this.arr[i] = kana;
                    return;
                }
            }
            //the array is actually full (because the above for-loop didn't return) so just push the element.
            this.arr.push(kana);
        },
        remove: function(kana){
            for(var i = 0; i < this.arr.length; i++){
                if(this.arr[i] === kana){
                    this.arr[i] = null;
                }
            }
        },
        forEach: function(fn){
            for(var i = 0; i < this.arr.length; i++){
                if(!this.arr[i]) continue;
                fn(this.arr[i]);
            }
        }
    };
    
    //set up the sound table
    var sounds = {};
    for(var prop1 in hiragana){
        var row =  hiragana[prop1];
        for(var i = 0; i < row.length; i++){
            var sound = new Audio('mp3/' + row[i][1] + '.mp3');
            sound.volume = 0.5;
            sounds[row[i][1]] = sound;
        }
    }

    function changeVolume(newVol){
        for(var prop3 in sounds){
            sounds[prop3].volume = newVol;
        }
    }

    var playSounds = false;
    var active_kana = new ActiveKana();
    var score = 0;
    var paused = true;
    var pausedShowing = false;
    var firstPass = true;
    var difficulty = 1;
    var speed = 0.5;
    var new_kana_in = 120;
    
    function massSet(lang, check)
    {
//        var things = ['vowels', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w', 'g', 'z', 'd', 'b', 'p'];
//        for (var y=0; y<things; y++)
//        {
//            list[things] = [];
//            for (var x=0; x<order.length; x++)
//            {
//                list.vowels.push(hiragana.vowels[x]);
//                document.getElementById(order[x]+"_hiragana").style.backgroundColor = "rgb(204, 255, 220)";
//            }
//        }

    }

    function animate() {
        if(paused) {
			if(!pausedShowing){
				ctx.fillStyle = '#000000'; // set canvas background color
				ctx.fillRect(0,0,WIDTH,HEIGHT);
				ctx.fillStyle = '#FFFFFF'; // set canvas font color
				ctx.fillText("paused", WIDTH/2 - 40, HEIGHT/2);
			}
            requestAnimFrame(animate);
            return;
        }

        if(firstPass){
            active_kana.add(new Kana());
            firstPass = false;
        }

        // update
        new_kana_in--;
        if(new_kana_in <= 0){
            active_kana.add(new Kana());
            new_kana_in = 120 - difficulty*8;
        }

        active_kana.forEach(function(kana){
            if(kana.y > HEIGHT){
                active_kana.remove(kana);
                score--;
                redrawScore();
            } else {
                kana.y += .5 + difficulty/10;
            }
        });

        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle   = '#000000'; // set canvas background color
        ctx.fillRect  (0,   0, WIDTH, HEIGHT);
        ctx.fillStyle   = '#FFFFFF'; // set canvas font color

        // draw stuff
        active_kana.forEach(function(kana){
            ctx.fillText(kana.hiragana, kana.x, kana.y);
        });

        // request new frame
        requestAnimFrame(animate);
    }
    animate();

    //when you type into the input
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
                        if(playSounds) {sounds[val].play();}
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

	var updateDifficulty = function(){
        var val = parseInt(this.value);
        if(val && (val > 0 && val <=10)){
            difficulty = val;
            this.dataset.prevValue = val;
        } else {
            this.value = this.dataset.prevValue;
        }
        document.getElementById('in').focus();
    };
    
    document.getElementById('difficulty').addEventListener('change', updateDifficulty);

    // document.getElementById('volume_controller').addEventListener('click', function(){
    //    if(!playSounds){
    //       playSounds = true;
    //      document.getElementById("volume_controller").style.webkitMaskImage = 'url("ic_volume_up_48px.svg")';
    //      document.getElementById('volSlider').style.visibility = "visible";
    // } else {
    //    playSounds = false;
    //   document.getElementById("volume_controller").style.webkitMaskImage = 'url("ic_volume_off_48px.svg")';
    //  document.getElementById('volSlider').style.visibility = "hidden";
    //}
    //});

    //document.getElementById('volSlider').addEventListener('change', function(){
    //   changeVolume(this.value);
    //});
    document.getElementById("settings_icon").addEventListener('click', pause); 

    function pause(){
        document.getElementById("settings_overlay").style.display = "block";
    }
    function refreshCanvasSize(newWidth, newHeight){
		canvas.width = newWidth * RATIO;
		canvas.height = newHeight * RATIO;
		canvas.style.width = newWidth + "px";
		canvas.style.height = newHeight + "px";
		ctx.fillStyle = '#000000';
		ctx.fillRect(0,   0, newWidth, newHeight);
		ctx.fillStyle = '#FFFFFF';
		ctx.font = "20pt sans-serif";
		
		active_kana.forEach(function(kana){
			kana.x = kana.x / WIDTH * newWidth;
			kana.y = kana.y / HEIGHT * newHeight;
		});
		
		WIDTH = newWidth;
		HEIGHT = newHeight;
	}
	refreshCanvasSize(WIDTH,HEIGHT);
    
    var changeSize = document.getElementsByClassName('changeSize');
    for(var i = 0; i < changeSize.length; i++){
		changeSize[i].addEventListener('click', function(){
			refreshCanvasSize(parseInt(this.dataset.w), parseInt(this.dataset.h));
			document.getElementById('in').focus();
		});
	}

    function redrawScore(){
        document.getElementById('score').innerText = 'Score: ' + score;
    }
