var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var whiteSquare;
var fontStyle = {"fontSize": 14};
var toggleChanged = new Phaser.Signal();

function preload() {
    game.load.atlasJSONHash("anim", "assets/dino.png", "assets/dino.json");

    var graphics = game.add.graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 100, 50);
    whiteSquare = graphics.generateTexture();
    graphics.destroy();
}

function create() {
    var sprite = game.add.sprite(360, game.world.centerY, "anim", 0);
    sprite.anchor.setTo(0.5);
    sprite.animations.add("anim");
    sprite.animations.play("anim", 15, true);

    var UIGroup = game.add.group();
    UIGroup.position.setTo(495, 185);

    UIGroup.add(makeToggleBtn("visible", sprite, true));
    UIGroup.add(makeToggleBtn("visible", sprite, false));
    UIGroup.add(makeToggleBtn("alive", sprite, true));
    UIGroup.add(makeToggleBtn("alive", sprite, false));
    UIGroup.add(makeToggleBtn("exists", sprite, true));
    UIGroup.add(makeToggleBtn("exists", sprite, false));

    UIGroup.add(makeFuncBtn("revive", sprite));
    UIGroup.add(makeFuncBtn("kill", sprite));

    UIGroup.align(2, -1, whiteSquare.width + 10, whiteSquare.height + 10);

    // Make sure buttons show correct state on load
    toggleChanged.dispatch();

    game.sprite = sprite;
}

function update() {}

function makeToggleBtn(property, sprite, boolToSet) {
    var btn = game.add.sprite(0, 0, whiteSquare);
    var text = game.add.text(0, 0, property + ": " + (boolToSet ? "TRUE" : "FALSE"), fontStyle);

    btn.anchor.setTo(0.5);
    text.anchor.setTo(0.5);

    btn.addChild(text);

    btn.inputEnabled = true;
    btn.events.onInputDown.add(function() {
        sprite[property] = boolToSet;
        toggleChanged.dispatch();
    }, this);

    toggleChanged.add(function() {
        if (sprite[property] === boolToSet) {
            btn.tint = boolToSet ? 0x00FF00 : 0xFF0000;
        } else {
            btn.tint = 0xFFFFFF;
        }
    }, this);

    return btn;
}

function makeFuncBtn(func, sprite) {
    var btn = game.add.sprite(0, 0, whiteSquare);
    var text = game.add.text(0, 0, func + "()", fontStyle);

    btn.anchor.setTo(0.5);
    text.anchor.setTo(0.5);

    btn.addChild(text);

    btn.inputEnabled = true;
    btn.events.onInputDown.add(function() {
        sprite[func]();
        toggleChanged.dispatch();
    }, this);

    return btn;
}
