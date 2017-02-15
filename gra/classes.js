class Vector2
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
	
	AddVector(anotherVector)
	{
		this.x += anotherVector.x;
		this.y += anotherVector.y;
	}
}

class GameObject
{
	constructor(x, y)        
	{
		this.position = new Vector2(x, y); 
		this.image = new Image();  
	}
	
	setRigidbody(rigidbody)  { this.rigidbody = rigidbody;          }
	getRigidbody()           { return this.rigidbody;               }
	
	getPosition()            { return this.position; 			    }	
	setPosition(newPosition) { this.position = newPosition;         }	
	
	getAnimator()            { return this.animator;                }
	setAnimator(animator)    { this.animator = animator;            }
	
	getImage()               { return this.image;                   }
	
	Move(moveVector)         { this.position.AddVector(moveVector); }
}

class PlayerController
{
	constructor()
	{
		this.left = false;
		this.right = false;
	}
	
	setLeft(v) 
	{
		this.left = v;
		if(v) this.setRight(false);
	}
	
	setRight(v) 
	{
		this.right = v;
		if(v) this.setLeft(false);
	}
	
	ResetDirections()
	{
		this.setRight(false);
		this.setLeft(false);
	}
	
	getLeft(){return this.left;}	
	getRight(){return this.right;}
	
}

class Animator
{
	constructor(normal, spriteChangeTime=1)
	{
		this.sprite = normal[0];
		this.normal = normal;
		this.frameCounter = 0;		
		this.iterator = 0;
		this.spriteChangeTime = spriteChangeTime;
	}
	
	UpdateSprite()
	{
		this.frameCounter++;
		if(this.frameCounter == this.spriteChangeTime)
			this.ChangeSprite();
	}
	
	ChangeSprite()
	{
		this.iterator = this.iterator < this.normal.length-1 ? this.iterator + 1 : 0; 
		this.sprite = this.normal[this.iterator];	
		this.frameCounter = 0;
	}	
		
	getSprite(){return this.sprite;}
}

class PlayerAnimator extends Animator
{
	constructor(normal, left, right, spriteChangeTime=1)
	{
		super(normal, spriteChangeTime);
		this.left = left;
		this.right = right;
	}
	
	UpdateSprite(controller)
	{
		if(controller.getLeft())
			this.sprite = this.left;
		else if(controller.getRight())
			this.sprite = this.right;
		else
		{
			this.frameCounter++;
			if(this.frameCounter == this.spriteChangeTime)
				this.ChangeSprite();
		}
	}
}

class PlayerHealthManager
{
	constructor(){ this.lifes = 3;    }
	RemoveLife() { this.lifes--;   	  }	
	AddLife()    { this.lifes++;      }
	getHealth()  { return this.lifes; }
}

function Sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}