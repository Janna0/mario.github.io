    (function() {
const canvas = document.getElementById("c1");
const context = canvas.getContext("2d");


//I used this tutorial to learn how to add sound effects  - https://www.youtube.com/watch?v=oqsjyzLicgE
let sound = document.getElementById("sound");

let gameo = document.getElementById("gameo");

let die = document.getElementById("die");

let jump = document.getElementById("jump");

let music = document.getElementById("music");

let end = document.getElementById("end");



const background = new Image();
background.src = "images/background1.webp";


const fire = new Image();
fire.src = "images/lava.jpeg";



const plant = new Image();
plant.src = "images/plantdown.png";

const plantdown = new Image();
plantdown.src = "images/plantdown.png";

const plantup = new Image();
plantup.src = "images/plantup.png";

const enemyleft = new Image();
enemyleft.src = "images/pilz.png";

const enemyright = new Image();
enemyright.src = "images/pilz.png";

const realtube = new Image();
realtube.src = "images/realtubemario.png";

const gameover = new Image();
gameover.src = "images/gameover.jpeg";

const beton = new Image();
beton.src="images/stone1.png";

const stone = new Image();
stone.src = "images/stone1.png";

const edge = new Image();
edge.src = "images/edge2.png";

const platform = new Image();
platform.src = "images/platform1.png";


const tubetop = new Image();
tubetop.src = "images/tubetop1.png";


const heart = new Image();
heart.src = "images/heart.png";

const coin = new Image();
coin.src = "images/coin.png";


const enemy = new Image();
enemy.src = "images/pilz.png";

const mario = new Image();
mario.src = "images/marioright.png";

const grass = new Image();
grass.src = "images/grass1.jpg";

const tube = new Image();
tube.src = "images/tubebottom1.png";

const lava = new Image();
lava.src = "images/lava.jpeg";


const question = new Image();
question.src = "images/grass1.jpg";


let points = 0;
let life = 5;
let level =1;

let side = 1;

let borderRight = 900;
let borderLeft = 500;

let borderTop = 311;
let borderBottom = 450;



//This is just a basic controller, very similar to the one we used in class 
const controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    let key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:
        controller.left = key_state;
      break;
      case 38:
        controller.up = key_state;
      break;
      case 39:
        controller.right = key_state;
      break;
      case 32:
        controller.space = key_state;

    }

  }

};

// This is where I learned about this method of creating a map in the canvas - https://www.npmjs.com/package/canvas-tile-map
//some other details and calculations of the exact x and y positions are from various programming pages 
let map =  [
    0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  
   	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,8,0,8,0,8,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    
    0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,
    5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3];


  let size = 50;
  let columns = 20;
  let rows = 12;

  canvas.width = size*columns;
  canvas.height = size*rows;

  drawMap = function() {

    for (let index = 0; index < map.length; index ++) {


      if(map[index]===0){
        
      }

      if(map[index]===5 ){
        //context.fillStyle = "#004d00"; 
        //ontext.fillRect((index % 20) * size, Math.floor(index/20) * size, size, size);
        context.drawImage(grass,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

      if(map[index]===4){

          context.drawImage(tubetop,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

        if(map[index]===1){

          context.drawImage(realtube,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


      if(map[index]===3){

          context.drawImage(stone,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }



       if(map[index]===7){

          context.drawImage(lava,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      


       if(map[index]===2){

          context.drawImage(edge,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


       if(map[index]===8){




       		enemyX = (index % 20) * size;
       		enemyY = Math.floor(index/20) * size;
          context.drawImage(platform, enemyX, enemyY, size, size);


      }


       if(map[index]===6){

          context.drawImage(tube,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      
      
    }

    

  };





 game = {

    
    hero: {

      color:"#ff9900",
      height:32,
      jumping:false,
      oldx:160,
      oldy:160,
      xDelta:0,
      yDelta:0,
      width:24,
      x:160,
      y:60,


        draw: function(){
    

    //context.fillStyle = "#0d0d0d";// color of hero
    //context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(mario,this.x, this.y, this.width, this.height);
    
  },

    },
//BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB



    //BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB


    coin: { 
    	
   	height:30,
      
      
      width:30,
      x:610,
      y:255,
	  draw: function(){
    

    
    context.drawImage(coin,this.x, this.y, this.width, this.height);
    if(game.coin.x<game.hero.x +game.hero.width-10 &&game.coin.x+game.coin.width>game.hero.x+10 && game.coin.y < game.hero.y+game.hero.height-10 &&game.coin.y +game.coin.height>game.hero.y+10 ){
					//alert("GAME OVER "+" "+" Click OK to restart");  	
					game.coin.x = 1500;		
					points ++;	

          //this is also part of the sound adding tutorial I mentioned at the beginning 
            let soundFlag = true;

                if (soundFlag){
                  sound.pause();
                  sound.currentTime = 0;
                  sound.play();
                  soundFlag = false;
                }
                
  			}
    
  }



    },



       coin1: { 
    	
   	height:30,
      
      
      width:30,
      x:710,
      y:255,
	  draw: function(){
    

    
    context.drawImage(coin,this.x, this.y, this.width, this.height);
    if(game.coin1.x<game.hero.x +game.hero.width-10 &&game.coin1.x+game.coin1.width>game.hero.x+10 && game.coin1.y < game.hero.y+game.hero.height-10 &&game.coin1.y +game.coin1.height>game.hero.y+10 ){
					//alert("GAME OVER "+" "+" Click OK to restart");  	
					game.coin1.x = 1500;
					points ++;	
            let soundFlag = true;

                if (soundFlag){
                  sound.pause();
                  sound.currentTime = 0;
                  sound.play();
                  soundFlag = false;
                }
                		
  			}
    
  }



    },



    //=========================
           coin2: { 
    	
   	height:30,
      
      
      width:30,
      x:660,
      y:100,
	  draw: function(){
    

    
    context.drawImage(coin,this.x, this.y, this.width, this.height);
    if(game.coin2.x<game.hero.x +game.hero.width-10 &&game.coin2.x+game.coin2.width>game.hero.x+10 && game.coin2.y < game.hero.y+game.hero.height-10 &&game.coin2.y +game.coin2.height>game.hero.y+10 ){
					//alert("GAME OVER "+" "+" Click OK to restart");  	
					game.coin2.x = 1500;	
					points ++;	
            let soundFlag = true;

                if (soundFlag){
                  sound.pause();
                  sound.currentTime = 0;
                  sound.play();
                  soundFlag = false;
                }
                	
  			}
    
  }



    },
    //======================



    	       coin3: { 
    	
   	height:30,
      
      
      width:30,
      x:365,
      y:210,
	  draw: function(){
    

    
    context.drawImage(coin,this.x, this.y, this.width, this.height);
    if(game.coin3.x<game.hero.x +game.hero.width-10 &&game.coin3.x+game.coin3.width>game.hero.x+10 && game.coin3.y < game.hero.y+game.hero.height-10 &&game.coin1.y +game.coin3.height>game.hero.y+10 ){
					//alert("GAME OVER "+" "+" Click OK to restart");  	
					game.coin3.x = 1500;	
					points ++;		
            let soundFlag = true;

                if (soundFlag){
                  sound.pause();
                  sound.currentTime = 0;
                  sound.play();
                  soundFlag = false;
                }
                
  			}
    
  }



    },
    //===================================



    enemy: {

      height:30,
      
      
      xDelta:1,
      yDelta:1,
      width:30,
      x:520,
      y:420,

    draw: function(){
    

    //context.fillStyle = "#0d0d0d";// color of hero
    //context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(enemy,this.x, this.y, this.width, this.height);
    
  },


  up: function(){


  			if(game.enemy.x+game.enemy.width>borderRight){
  				game.enemy.xDelta= game.enemy.xDelta*(-1);
          //context.drawImage(enemyleft,this.x, this.y, this.width, this.height);
          enemy.src = enemyleft.src;

  			}

  			if(game.enemy.x <= borderLeft){
  				game.enemy.xDelta= game.enemy.xDelta*(-1);
          enemy.src = enemyright.src;
  			}


  			if(game.enemy.x<game.hero.x +game.hero.width-5 &&game.enemy.x+game.enemy.width>game.hero.x+5 && game.enemy.y < game.hero.y+game.hero.height-10 &&game.enemy.y +game.enemy.height>game.hero.y+5 ){
					//alert("GAME OVER "+" "+" Click OK to restart"); 
					life --; 
            let soundFlag = true;

                if (soundFlag && life !=0){
                  die.pause();
                  die.currentTime = 0;
                  die.play();
                  soundFlag = false;
                } 	
          game.hero.yDelta = -25;
        game.hero.jumping = true;
					game.hero.x = 5;	
          game.hero.y = 500;	
        
  			}



if(game.hero.y+game.hero.height>game.enemy.y && game.hero.x + game.hero.width>=game.enemy.x && game.hero.x<game.enemy.x+game.enemy.width && game.hero.oldy<game.hero.y ){
//alert("GAME OVER "+" "+" Click OK to restart"); \




game.enemy.height = 10;

game.enemy.y+=7;

game.enemy.xDelta =0;
setTimeout(function(){;

game.enemy.x=1000;	
},500)


let soundFlag = true;

                if (soundFlag){
                  music.pause();
                  music.currentTime = 0;
                  music.play();
                  soundFlag = false;
                }


}
  			game.enemy.x += game.enemy.xDelta;



        




  },


    },





      plant: {

      height:40,
      
      
      xDelta:1,
      yDelta:1,
      width:30,
      x:460,
      y:313,

    draw: function(){
    

    
    context.drawImage(plant,this.x, this.y, this.width, this.height);
    
  },


  up: function(){


        if(game.plant.y+game.plant.height>borderBottom){
          game.plant.yDelta= game.plant.yDelta*(-1);
          
          plant.src = plantup.src;

        }

        if(game.plant.y <= borderTop){
          game.plant.yDelta= game.plant.yDelta*(-1);
          plant.src = plantdown.src;
        }


        if(game.plant.x<game.hero.x +game.hero.width-5 &&game.plant.x+game.plant.width>game.hero.x+5 && game.plant.y < game.hero.y+game.hero.height-10 &&game.plant.y +game.plant.height>game.hero.y+5 ){
          //alert("GAME OVER "+" "+" Click OK to restart"); 
          life --;  
          let soundFlag = true;

                if (soundFlag && life !=0){
                  die.pause();
                  die.currentTime = 0;
                  die.play();
                  soundFlag = false;
                } 
          game.hero.yDelta = -25;
        game.hero.jumping = true;
          game.hero.x = 5;  
          game.hero.y = 500;  

        }

        game.plant.y += game.plant.yDelta;





  },


    },



    plant2:{
            height:40,
      
      
      xDelta:1,
      yDelta:0,
      width:30,
      x:1500,
      y:313,

    draw: function(){
    

    
    context.drawImage(plant,this.x, this.y, this.width, this.height);
    
  },


  up: function(){


        if(game.plant2.y+game.plant2.height>borderBottom){
          game.plant2.yDelta= game.plant2.yDelta*(-1);
          
          plant.src = plantup.src;

        }

        if(game.plant2.y <= borderTop){
          game.plant2.yDelta= game.plant2.yDelta*(-1);
          plant.src = plantdown.src;
        }


        if(game.plant2.x<game.hero.x +game.hero.width-5 &&game.plant2.x+game.plant2.width>game.hero.x+5 && game.plant2.y < game.hero.y+game.hero.height-10 &&game.plant2.y +game.plant2.height>game.hero.y+5 ){
          //alert("GAME OVER "+" "+" Click OK to restart"); 
          life --;  
          let soundFlag = true;

                if (soundFlag && life !=0){
                  die.pause();
                  die.currentTime = 0;
                  die.play();
                  soundFlag = false;
                } 
          game.hero.yDelta = -25;
        game.hero.jumping = true;
          game.hero.x = 5;  
          game.hero.y = 500;    
        }

        game.plant2.y += game.plant2.yDelta;





  },
    },

    plant3:{
            height:40,
      
      
      xDelta:1,
      yDelta:1,
      width:30,
      x:1460,
      y:313,

    draw: function(){
    

    
    context.drawImage(plant,this.x, this.y, this.width, this.height);
    
  },


  up: function(){


        if(game.plant3.y+game.plant3.height>borderBottom){
          game.plant3.yDelta= game.plant3.yDelta*(-1);
          
          plant.src = plantup.src;

        }

        if(game.plant3.y <= borderTop){
          game.plant3.yDelta= game.plant3.yDelta*(-1);
          plant.src = plantdown.src;
        }


        if(game.plant3.x<game.hero.x +game.hero.width-5 &&game.plant3.x+game.plant3.width>game.hero.x+5 && game.plant3.y < game.hero.y+game.hero.height-5 &&game.plant3.y +game.plant3.height>game.hero.y+5 ){
          //alert("GAME OVER "+" "+" Click OK to restart"); 
          life --;  
          let soundFlag = true;

                if (soundFlag && life !=0){
                  die.pause();
                  die.currentTime = 0;
                  die.play();
                  soundFlag = false;
                } 
          game.hero.yDelta = -25;
        game.hero.jumping = true;
          game.hero.x = 5;  
          game.hero.y = 500;    
        }

        game.plant3.y += game.plant3.yDelta;





  },
    },

   


   
   // This part is from a GitHub link. I have done some changes, but most of it is the same as the original
    //It checks what number is assigned to the tile,  according to that it decides from which sides the character
    // can enter. then at the bottom it does the exact calculations for every possible side
    collision: {

     
      
      1:function(object, row, column) {

        

        if (this.topCollision(object, row)) { return; }
        this.rightCollision(object, column);          

      },

     
      2:function(object, row, column) {

        if (this.topCollision(object, row)) { return; }
        this.leftCollision(object, column);

      },

      
      3:function(object, row, column) {

        this.rightCollision(object, column);

      },

      4:function(object, row, column) {

        if (this.topCollision(object, row)) { return; }
        if (this.leftCollision(object, column)) { return; }
        this.rightCollision(object, column);

      },

     
      5:function(object, row, column) {

        this.topCollision(object, row);

      },

      6:function(object, row, column) {

        
        if (this.leftCollision(object, column)) { return; }
        this.rightCollision(object, column);

      },


       7:function(object, row, column) {

        
         this.dangerCollision(object, row);
          game.hero.yDelta = -25;
          game.hero.jumping = true;
          game.hero.x = 5;   
          game.hero.y = 500; 
           let soundFlag = true;

                if (soundFlag && life !=0){
                  die.pause();
                  die.currentTime = 0;
                  die.play();
                  soundFlag = false;
                } 
          life--;
         //alert("GAME OVER "+" "+" Click OK to restart");
         

      },
      8:function(object, row, column) {

        if (this.topCollision(object, row)) { return; }
        if (this.leftCollision(object, column)) { return; }
        this.rightCollision(object, column);


      },

      
      leftCollision(object, column) {

        if (object.xDelta > 0) {

          let left = column * size;

          if (object.x + object.width * 0.5 > left && object.oldx <= left) {

            object.xDelta = 0;
            object.x = object.oldx = left - object.width * 0.5 - 0.001;

            return true;

          }

        }

        return false;

      },

      

      rightCollision(object, column) {

        if (object.xDelta < 0) {

          let right = (column + 1) * size;

          if (object.x + object.width * 0.5 < right && object.oldx + object.width * 0.5 >= right) {

            object.xDelta = 0;
            object.oldx = object.x = right - object.width * 0.5;

            return true;

          }

        }

        return false;

      },

      topCollision(object, row) {

        if (object.yDelta > 0) {

          let top = row * size;

          if (object.y + object.height > top && object.oldy + object.height <= top) {

            object.jumping = false;
            object.yDelta = 0;
            object.oldy = object.y = top - object.height - 0.01;

            return true;

          }

        }

        return false;

      },

      dangerCollision(object,row){

            if (object.yDelta > 0) {

          let top = row * size;

          if (object.y + object.height > top && object.oldy + object.height <= top) {

            object.jumping = false;
            object.yDelta = 0;
            object.oldy = object.y = top - object.height - 0.01;
              //alert("GAME OVER "+" "+" Click OK to restart");

            return true;

          }

        }

      }




    },




    
    blop: function() {

      
      if (controller.left) {

        game.hero.xDelta -= 0.30;
        mario.src = "images/marioleft.png";


      }

      if (controller.right) {

        game.hero.xDelta += 0.30;
        mario.src = "images/marioright.png";

      }

      if (controller.up && !game.hero.jumping) {

        game.hero.yDelta = -25;
        game.hero.jumping = true;

       

      

      }


   

      game.hero.yDelta += 1; // gravity

      game.hero.oldx = game.hero.x;// last position of the hero
      game.hero.oldy = game.hero.y;
      game.hero.x += game.hero.xDelta;
      game.hero.y += game.hero.yDelta;





      if (game.hero.x < 0) {

        game.hero.xDelta = 0;
        game.hero.oldx = game.hero.x = 0;

      } else if (game.hero.x + game.hero.width > canvas.width && level >=1) {
      	level++;

      	borderLeft = 100;
      	borderRight = 300;

        borderTop = 312;
        borderBottom = 353;

      	game.enemy.y = 420;
      	game.enemy.x = 160;
        
        game.plant.x = 510;
        game.plant.y = 313;


        game.plant3.y=313;
        game.plant3.yDelta = 0;
        game.enemy.height = 30;
        game.enemy.xDelta =1;

        

        game.plant.yDelta = 0.03;
        //game.plant2.x = 1500;

      	grass.src ="images/grass2.png";
      	platform.src = "images/platform2.png";
      	stone.src="images/stone2.png";
        background.src = "images/background2.webp";
        plantdown.src = "images/plantdown.png";
        plant.src = "images/plantup.png";

 map =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  
    0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,8,8,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,8,8,8,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    5,5,5,5,5,1,0,2,5,5,5,5,5,1,0,0,0,2,5,5,
    3,3,3,3,3,6,7,2,3,3,3,3,3,6,7,7,7,2,3,3];

    game.coin.x=460;
    game.coin1.x=710;
    game.coin2.x=560;
    game.coin3.x=810;

    game.coin.y=310;
    game.coin1.y=210;
    game.coin2.y=310;
    game.coin3.y=210;

      drawMap = function() {
   for (let index = 0; index < map.length; index ++) {


      if(map[index]===0){
        

      }

      if(map[index]===5 || map[index]===3 ){
        
        context.drawImage(grass,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

      if(map[index]===4){

          context.drawImage(tubetop,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


      if(map[index]===3){

          context.drawImage(stone,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


       if(map[index]===7){

          context.drawImage(lava,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      


       if(map[index]===2 || map[index]===1){

          context.drawImage(edge,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


       if(map[index]===8){




       		enemyX = (index % 20) * size;
       		enemyY = Math.floor(index/20) * size;
          context.drawImage(platform, enemyX, enemyY, size, size);


      }


       if(map[index]===6){

          context.drawImage(edge,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      
      
    }
    

  };





        //+++++++++++++++++++++++
        	if(game.hero.x + game.hero.width > canvas.width ){
        		//level++;
        		if(level >=3){
        			//level++;
        borderLeft = 150;
      	borderRight = 450;
        borderBottom = 548;
        borderTop=100;

      	game.enemy.y = 420;
      	game.enemy.x = 160;
        game.plant.yDelta = 2;
        game.plant.x = 710;
        game.plant.height = 35;
        game.enemy.height = 30;
        game.enemy.xDelta =1;
        


      	grass.src ="images/grass3.png";
      	stone.src = "images/stone3.png";
      	platform.src = "images/platform3.png";
      	edge.src = "images/edge3.png";
 		tube.src="images/tubebottom3.png";
 		tubetop.src="images/tubetop3.png";
    background.src = "images/background3.webp";
    
    plant.src = "images/bombdown.png";
    plantup.src = "images/bombup.png";
  plantdown.src = "images/bombdown.png";


 map =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,8,0,8,8,0,8,0,8,0,8,0,8,0,0,
    0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    5,5,5,5,5,5,5,5,2,0,0,0,0,0,0,0,0,0,0,2,
    3,3,3,3,3,3,3,3,2,7,7,7,7,7,7,7,7,7,7,2];

    game.coin.x=610;
    game.coin1.x=360;
    game.coin2.x=710;
    game.coin3.x=510;

    game.coin.y=130;
    game.coin1.y=255;
    game.coin2.y=130;
    game.coin3.y=130;

      drawMap = function() {
   for (let index = 0; index < map.length; index ++) {


      if(map[index]===0){
        

      }

      if(map[index]===5 || map[index]===1){
        
        context.drawImage(grass,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

      if(map[index]===4){

          context.drawImage(tubetop,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

      if(map[index]===3){

          context.drawImage(stone,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }



       if(map[index]===7){

          context.drawImage(lava,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      


       if(map[index]===2){

          context.drawImage(edge,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


       if(map[index]===8){




       		enemyX = (index % 20) * size;
       		enemyY = Math.floor(index/20) * size;
          context.drawImage(platform, enemyX, enemyY, size, size);


      }


       if(map[index]===6){

          context.drawImage(tube,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      
      
    }
    

  };
        			
        		}

        	}




        	//WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW


        	if(game.hero.x + game.hero.width > canvas.width){
        			//level++;
        		if(level>=4){



        			      	borderLeft = 200;
      	borderRight = 450;



        borderBottom = 452;
        borderTop = 411;

      	game.enemy.y = 272;
      	game.enemy.x = 201;
        game.plant.yDelta = 0.03;
        game.plant.y = 412;
        game.plant2.y=412;

        game.plant3.y=412;

        game.plant3.x=1412;
        game.plant2.x=110;

        game.plant.height = 40;
        game.enemy.height = 30;
        game.enemy.xDelta =1;

      	grass.src ="images/grass4.png";
      	stone.src = "images/stone4.png";
      	platform.src = "images/platform4.png";
      	edge.src = "images/edge4.png";
 		tube.src="images/edge4.png";
 		tubetop.src="images/edge4.png";
    background.src = "images/background4.webp";
    

    plantup.src ="images/plantup.png";
    plantdown.src = "images/plantdown.png";
        plant.src = "images/plantdown.png";

  map =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    8,8,0,0,0,0,8,0,0,8,0,0,0,0,0,0,0,0,0,0,
    0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,4,0,0,0,0,
    0,0,0,0,8,8,8,8,8,0,0,0,2,6,0,6,1,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,2,2,6,0,6,1,1,0,0,
    0,0,0,0,0,0,0,0,0,0,2,2,2,6,0,6,1,1,1,0,
    5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3];

    game.coin.x=410;
    game.coin1.x=360;
    game.coin2.x=60;
    game.coin3.x=10;

    game.coin.y=155;
    game.coin1.y=155;
    game.coin2.y=90;
    game.coin3.y=90;

      drawMap = function() {
   for (let index = 0; index < map.length; index ++) {


      if(map[index]===0){
        

      }

      if(map[index]===5 ){
        
        context.drawImage(grass,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

      if(map[index]===4){

          context.drawImage(edge,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

        if(map[index]===3){

          context.drawImage(stone,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


       if(map[index]===7){

          context.drawImage(lava,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      


       if(map[index]===2 || map[index]===1){

          context.drawImage(edge,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


       if(map[index]===8){




       		enemyX = (index % 20) * size;
       		enemyY = Math.floor(index/20) * size;
          context.drawImage(platform, enemyX, enemyY, size, size);


      }


       if(map[index]===6){

          context.drawImage(edge,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      
      
    }
    

  };



        		}



        	}
        	//WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
              //LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
                              if(game.hero.x + game.hero.width > canvas.width){
              //level++;
            if(level>=5){

                



        borderBottom = 548;
        borderTop = 100;

        //game.enemy.y = 272;
        //game.enemy.x = 201;
        game.plant.yDelta = 4;
        game.plant2.yDelta = 4;
        game.plant3.yDelta = 4;

        game.plant.x= 160;

        game.plant.y = 412;
        game.plant2.y=412;

        game.plant3.y=412;

        game.plant3.x=360;
        game.plant2.x=910;

        game.plant.height = 35;
        game.plant2.height = 35;
        game.plant3.height = 35;



        borderLeft = 400;
        borderRight = 500;

        game.enemy.y = 420;
        game.enemy.x = 401;
        game.enemy.height = 30;
        game.enemy.xDelta =1;

        grass.src ="images/grass5.png";
        stone.src = "images/stone5.png";
        platform.src = "images/platform5.png";
        edge.src = "images/edge5.png";
    tube.src="images/edge5.png";
    tubetop.src="images/edge5.png";
          beton.src="images/beton5.png";
          background.src = "images/background5.png";
          plant.src = "images/bombdown.png";
    plantup.src = "images/bombup.png";
  plantdown.src = "images/bombdown.png";


  map =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,
          0,0,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,6,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,
          1,0,0,0,0,0,0,0,0,0,0,0,0,8,0,8,0,8,0,6,
          1,1,1,0,8,0,8,0,8,8,0,0,0,0,0,0,0,0,0,6,
          0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,6,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,8,8,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          4,0,4,0,4,0,4,0,4,5,5,5,5,4,0,0,0,0,0,2,
          4,7,4,7,4,7,4,7,4,3,3,3,3,4,7,7,7,7,7,2];

    game.coin.x=910;
    game.coin1.x=160;
    game.coin2.x=810;
    game.coin3.x=360;

    game.coin.y=310;
    game.coin1.y=120;
    game.coin2.y=90;
    game.coin3.y=120;

      drawMap = function() {
   for (let index = 0; index < map.length; index ++) {


      if(map[index]===0){
        

      }

      if(map[index]===5 ){
        
        context.drawImage(grass,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

      if(map[index]===4){

          context.drawImage(edge,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

        if(map[index]===3){

          context.drawImage(stone,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


       if(map[index]===7){

          context.drawImage(lava,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      


       if(map[index]===2 || map[index]===1){

          context.drawImage(beton,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


       if(map[index]===8){




          enemyX = (index % 20) * size;
          enemyY = Math.floor(index/20) * size;
          context.drawImage(platform, enemyX, enemyY, size, size);


      }


       if(map[index]===6){

          context.drawImage(beton,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      
      
    }
    

  };



            }



          }

              //LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

              //FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF



               if(game.hero.x + game.hero.width > canvas.width){
              //level++;
            if(level>=6){

              
                let soundFlag = true;

                if (soundFlag && life !=0){
                  end.pause();
                  end.currentTime = 0;
                  end.play();
                  soundFlag = false;
                } 


                      borderLeft = 400;
        borderRight = 500;

        game.enemy.y = 420;
        game.enemy.x = 1500;
       

        grass.src ="images/beton5.png";
        stone.src = "images/beton5.png";
        platform.src = "images/beton5.png";
        edge.src = "images/beton5.png";
    tube.src="images/beton5.png";
    tubetop.src="images/beton5.png";
          beton.src="images/beton5.png";
          background.src = "images/background6.png";

  map =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
          5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5];

    game.coin.x=4100;
    game.coin1.x=3600;
    game.coin2.x=6000;
    game.coin3.x=1000;

    game.coin.y=130;
    game.coin1.y=130;
    game.coin2.y=90;
    game.coin3.y=90;


        game.plant.yDelta = 0;
        game.plant.y = 412;
        game.plant2.y=412;

        game.plant3.y=412;

        game.plant3.x=1412;
        game.plant2.x=1110;
        game.plant.x=1412;

        game.plant.height = 40;

      drawMap = function() {
   for (let index = 0; index < map.length; index ++) {


      if(map[index]===0){
        

      }

      if(map[index]===5 ){
        
        context.drawImage(beton,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

      if(map[index]===4){

          context.drawImage(edge,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }

        if(map[index]===3){

          context.drawImage(stone,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


       if(map[index]===7){

          context.drawImage(lava,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      


       if(map[index]===2 || map[index]===1){

          context.drawImage(beton,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }


       if(map[index]===8){




          enemyX = (index % 20) * size;
          enemyY = Math.floor(index/20) * size;
          context.drawImage(platform, enemyX, enemyY, size, size);


      }


       if(map[index]===6){

          context.drawImage(beton,(index % 20) * size, Math.floor(index/20) * size, size, size);

      }
      
      
    }
    

  };



            }



          }

              //FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
        //+++++++++++++++++++++++



        game.hero.xDelta = 0;
        


        game.hero.oldx = game.hero.x = 0;





      }









      if (game.hero.y < 0) {

        game.hero.yDelta = 0;
        game.hero.oldy = game.hero.y = 0;

      } else if (game.hero.y + game.hero.height > canvas.height) {


          game.hero.oldy = game.hero.y =1000;




        

      }





      //This is also from a GitHub link. My calculations of this part would have bugs from time to time.
      // So I replaced it with this and made changes to it to fit my game. 


      let tile_x = Math.floor((game.hero.x + game.hero.width * 0.5) / size);
      let tile_y = Math.floor((game.hero.y + game.hero.height) / size);
      let value_at_index = map[tile_y * columns + tile_x];

      
      if (value_at_index != 0) {

        
        game.collision[value_at_index](game.hero, tile_y, tile_x);

      }


      tile_x = Math.floor((game.hero.x + game.hero.width * 0.5) / size);
      tile_y = Math.floor((game.hero.y + game.hero.height) / size);
      value_at_index = map[tile_y * columns + tile_x];

      if (value_at_index != 0) {

        game.collision[value_at_index](game.hero, tile_y, tile_x);

      } 








    game.hero.xDelta *= 0.9;
     game.hero.yDelta *= 0.9;







      

      

      

    }

  };


let soundFlag = true;



let loop = function() {

context.drawImage(background, 0, 0, canvas.width, canvas.height-50);

  game.plant.draw();
  game.plant.up();

  game.plant2.draw();
  game.plant2.up();

  game.plant3.draw();
  game.plant3.up();


  drawMap();


  game.hero.draw();

  



  

  //game.plant3.draw();
  //game.plant3.up();

 


  
  game.enemy.draw();
  
  game.enemy.up();
  game.coin.draw();
  game.coin1.draw();
  game.coin2.draw();
  game.coin3.draw();
  
  
  context.drawImage(coin, 20, 20, 20, 20);
  context.fillText("X"+ points,45,39);



  context.drawImage(heart, 950, 18, 30, 28);
  
  

    if(points%10===0 && points!=0){
    life++;
    points=0;
  }
  context.fillText(life+"X",910,40);
  context.fillStyle = "white";
  context.font = "25px Sans-Serif";



  
  if (life <=0){
  	//alert("GAME OVER "+" "+" Click OK to restart");
    context.drawImage(gameover, 0, 0, canvas.width, canvas.height-50);
  	//context.drawImage(background, 0, 0, canvas.width, canvas.height-50);
  	//context.fillText("GAME OVER",550,300);
    //context.font = "50px Sans-Serif";

     //let soundFlag = true;

                if (soundFlag){
                  gameo.pause();
                  gameo.currentTime = 0;
                  gameo.play();
                  soundFlag = false;
                }
  }


 

  game.blop();
  
  requestAnimationFrame(loop);
};
loop();





window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);

})();



//Some other links I have used - https://www.w3schools.com/graphics/game_intro.asp
//https://www.khanacademy.org/computing/computer-programming

//https://www.youtube.com/watch?v=txUvD5_ROIU

//https://www.youtube.com/user/nexttrex/videos

//https://www.youtube.com/watch?v=GOJBoGbRNQA

//...
