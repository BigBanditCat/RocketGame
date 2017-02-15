var keyPressed = {};

document.addEventListener('keydown', 
function(e) 
{
	keyPressed[e.keyCode] = true; 
});

document.addEventListener('keyup', 
function(e)
{
	keyPressed[e.keyCode] = false; 
});