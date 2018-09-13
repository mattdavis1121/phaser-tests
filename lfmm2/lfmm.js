var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var boxClickComplete = new Phaser.Signal();
var toggle1;
var toggle2;
var box1;
var box2;
var whiteSquare;

function preload() {
    var graphics = game.add.graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 200, 200);
    whiteSquare = graphics.generateTexture();
    graphics.destroy();
}

function create() {
    box1 = game.add.sprite(200, game.height/2, whiteSquare);
    box1.anchor.setTo(0.5);
    box1.tint = 0xff0000;
    box1.inputEnabled = true;
    box1.events.onInputDown.addOnce(boxClicked, this);
    box1.resetCallback = function() {};

    toggle1 = game.add.text(0, -120, "ON", {fill: "white"});
    toggle1.anchor.setTo(0.5);
    toggle1.on = true;
    toggle1.inputEnabled = true;
    toggle1.events.onInputDown.add(toggleClicked, this);
    box1.toggle = toggle1;
    box1.addChild(toggle1);

    box2 = game.add.sprite(600, game.height/2, whiteSquare);
    box2.anchor.setTo(0.5);
    box2.tint = 0xff0000;
    box2.inputEnabled = true;
    box2.events.onInputDown.addOnce(boxClicked, this);
    box2.resetCallback = resetListener;

    toggle2 = game.add.text(0, -120, "ON", {fill: "white"});
    toggle2.anchor.setTo(0.5);
    toggle2.on = true;
    toggle2.inputEnabled = true;
    toggle2.events.onInputDown.add(toggleClicked, this);
    box2.toggle = toggle2;
    box2.addChild(toggle2);

    boxClickComplete.add(boxClickCompleteCallback, this);
}

function update() {
}

function boxClicked(box) {
    if (!box.toggle.on) {
        box.resetCallback();
        return;
    }

    box.tint = -box.tint;
    boxClickComplete.dispatch(box);
}

function boxClickCompleteCallback(box) {
    // Timer ensures listener removal has occurred before re-adding
    game.time.events.add(200, function() {
        box.events.onInputDown.addOnce(boxClicked, this);
    }, this);
}

function toggleClicked(toggle) {
    toggle.on = !toggle.on;
    var text = toggle.on ? "ON" : "OFF";
    toggle.setText(text);
}

function resetListener() {
    box2.events.onInputDown.remove(boxClicked, this);
    box2.events.onInputDown.addOnce(boxClicked, this);
}