class Rigidbody
{
	constructor()
	{
		this.colliders = [];
	}	
	
	AddCollider(collider)
	{
		this.colliders.push(collider);
	}
	
	GetColliders()
	{
		return this.colliders;
	}
	
	IsInColliderRange(position, anotherPosition, anotherSize)
	{
		for(i = 0; i < this.colliders.length; i++)
		{
			if(anotherPosition.y + anotherSize.getSizeY() > position.y && anotherPosition.y < position.y + this.colliders[i].getSizeY())
			{
				if((anotherPosition.x > position.x && anotherPosition.x < position.x + this.colliders[i].getSizeX()) ||
				   (anotherPosition.x < position.x && anotherPosition.x + anotherSize.getSizeX() > position.x))
				   return true;
			}
		}
		return false;
	}
}

class Collider
{
	constructor(sizeX, sizeY)
	{
		this.sizeX = sizeX;
		this.sizeY = sizeY;
	}
	
	getSizeX(){ return this.sizeX; }
	getSizeY(){ return this.sizeY; }
}