var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.atlasJSONHash("introTexture", "assets/intro.png", "assets/intro.json");
    game.load.atlasJSONHash("loopTexture", "assets/loop.png", "assets/loop.json");
}

function create() {
    var badSprite = game.add.sprite(game.world.centerX - 150, game.world.centerY, "introTexture");
    var goodSprite = game.add.sprite(game.world.centerX + 150, game.world.centerY, "introTexture");
    badSprite.anchor.setTo(0.5);
    goodSprite.anchor.setTo(0.5);

    var textStyle = {font: "32px Arial", fill: "#ffffff"};

    var badText = game.add.text(badSprite.x, badSprite.y - 100, "BAD", textStyle);
    var goodText = game.add.text(goodSprite.x, goodSprite.y - 100, "GOOD", textStyle);
    badText.anchor.setTo(0.5);
    goodText.anchor.setTo(0.5);

    // Animation created before texture loaded
    var badSpriteIntroAnim = badSprite.animations.add("introAnim", null, 15, false);
    var badSpriteLoopAnim = badSprite.animations.add("loopAnim", null, 15, true);
    badSpriteIntroAnim.onComplete.add(function () {
        badSprite.loadTexture("loopTexture", 0);
        badSpriteLoopAnim.play();
    }, this);
    badSpriteIntroAnim.play();

    // Animation created after texture loaded
    goodSprite.animations.add("introAnim");
    goodSprite.animations.getAnimation("introAnim").onComplete.add(function () {
        goodSprite.loadTexture("loopTexture", 0);
        goodSprite.animations.add("loopAnim");
        goodSprite.animations.play("loopAnim", 15, true);
    }, this);
    goodSprite.animations.play("introAnim", 15, false);
}

function update() {
}