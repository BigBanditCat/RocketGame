var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var player;
var controller;
var playerAnimator;
var playerHealthManager;

var enemyAnimator;

function UpdateInput()
{
	if(keyPressed["37"] && player.getPosition().x > 0)
	{	
		controller.setLeft(true);
		player.Move(new Vector2(-3,0)); //left
	}
	else if(keyPressed["39"] && player.getPosition().x < canvas.width - 50)
	{
		controller.setRight(true);
		player.Move(new Vector2(3,0));  //right
	}
	else
		controller.ResetDirections();
}

function Start()
{
	var normalSprites = ['img/rocket1.png', 'img/rocket2.png'];
	
	player         = new GameObject(canvas.width/2-50, canvas.height * 0.7);
	player.setRigidbody(new Rigidbody());
	player.getRigidbody().AddCollider(new Collider(75, 25));
	
	controller     = new PlayerController();
	playerAnimator = new PlayerAnimator(normalSprites, 'img/rocketLeft.png', 'img/rocketRight.png', 10);
	
	playerHealthManager = new PlayerHealthManager();
	
	Game();
}

var enemies = [];
var canSpawn = true;

async function SpawnEnemies()
{
	canSpawn = false;
	
	var enemy = new GameObject(Math.floor((Math.random() * canvas.width) - 125), -125);
	var enemyNormalSprites = ["img/enemy.png", "img/enemy2.png"];
	
	enemy.setRigidbody(new Rigidbody());
	enemy.getRigidbody().AddCollider(new Collider(125, 125));	
	enemy.setAnimator(new Animator(enemyNormalSprites, 100));
	enemies.push(enemy);
	
	await Sleep(800);
	canSpawn = true;
}

function UpdateEnemies()
{
	if(canSpawn && enemies.length < 3)
		SpawnEnemies();
	
	for(i=0; i<enemies.length; i++)
	{
		enemies[i].Move(new Vector2(0,1));
		console.log(i);

		if(enemies[i].getPosition().y > canvas.height) //destroy when enemy is out of map range
		{
			enemies.splice(i, 1);
			continue;
		}		
				
		if(enemies[i].getAnimator())
		{
			enemies[i].getAnimator().UpdateSprite();
			enemies[i].getImage().src = enemies[i].getAnimator().getSprite();			
		}
		
		context.drawImage(enemies[i].getImage(), enemies[i].getPosition().x, enemies[i].getPosition().y, 125, 125);	
		
		if(enemies[i].getRigidbody())
		{
			if(player.getRigidbody().IsInColliderRange(player.getPosition(), enemies[i].getPosition(), enemies[i].getRigidbody().GetColliders()[0]))
			{
				playerHealthManager.RemoveLife();
				enemies.splice(i, 1);
			}
		}
	}	
}

function UpdatePlayer()
{
	var playerSprite = new Image();
	var lifeSprite = new Image();
	
	playerAnimator.UpdateSprite(controller);
	
	playerSprite.src = playerAnimator.getSprite();
	lifeSprite.src = "img/life.png";
	
	context.drawImage(playerSprite, player.getPosition().x, player.getPosition().y);	
	
	for(i=0, margin=10; i<playerHealthManager.getHealth(); i++, margin+=40)
		context.drawImage(lifeSprite, margin, 15, 25, 25);	
}

function Game()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	UpdateInput();	
	UpdateEnemies();
	UpdatePlayer();
	
	setTimeout(Game, 5);
}