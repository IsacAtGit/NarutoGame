const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')//elling Js that the context of the drawing is going to be one of 2 dimensional
canvas.width = 1475 //1024
canvas.height = 867.5//756
const gravity = 1.2
c.fillRect(0, 0, canvas.width, canvas.height)
// used to draw rectangle with canvas 
//fillRect(x, y, width, height)
// The x-coordinate of the upper-left corner of the rectangle
//The y-coordinate of the upper-left corner of the rectangle
class Sprite {
    constructor({ position,imageSrc,scale=1,framemax=1,offset={x:0,y:0} }) {
        //newly added velocity for animate the object
        this.position = position //poisition for individual
       
        this.width=50
        this.height = 150
        this.image=new Image()
        this.image.src=imageSrc
        this.scale=scale //scale used to increasing height and width of particular
         this.framemax=framemax //framemax total number of frames
         this.framecurrent=0 //the current frame
         this.frameelapse=0
         this.framehold=5
         this.offset=offset
    }
    draw() { //method of the plyer poisition
        c.drawImage(this.image,
            this.framecurrent*(this.image.width/this.framemax),  // 0*width 200=0th frame
                                                                  // 1*width 200=1th frame
                                                                  // 2*width 200=2th frame
                                                                  // 3*width 200=3th frame 
                                                                  // 4*width 200=4th frame
                                                                  // 5*width 200=5th frame

            0,//for animation showing one by one images
            this.image.width/this.framemax, //total 6 shop images them maked as framemax
            //thotal image width is 6 imge width it dived by 6 to show one image
            this.image.height,
            this.position.x-this.offset.x,
            this.position.y-this.offset.y,
            this.image.width/this.framemax*this.scale,//scale to postion the image
            this.image.height*this.scale)
    }
    animateframes(){
        this.frameelapse++
        if(this.frameelapse%this.framehold===0){
        if(this.framecurrent<this.framemax-1){//runt he frame
            this.framecurrent++
        }
        else{
            this.framecurrent=0
        }
    } 
    }
    update() {
        this.draw()
        this.animateframes()
    }
   
}

class fighter extends Sprite {
    constructor({position, velocity, color = 'red',imageSrc,scale=1,framemax=1,offset={x:0,y:0},sprites,attackbox={offset:{},width:undefined,height:undefined}}) {
        super({
            position,
           imageSrc,
           scale,
           framemax,
           offset
        })
        //newly added velocity for animate the object
        this.position = position //poisition for individual
        this.velocity = velocity
        this.width=50
        this.height = 150
        this.lastkey

        this.attackbox = {//attck box is a rectangel 
            // position: this.position,//hand position is also a charcter position but comments make handof enemy face opposite
            position: {
                x: this.position.x, //it depend on the starting positin so struked
               y:this.position.y // box will stuck iin up
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.isspAttacking=true
        this.spkey
        this.health=100
        this.framecurrent=0 //the current frame
         this.frameelapse=0
         this.framehold=7
         this.sprites=sprites
        
          this.dead=false

         for( const sprite in this.sprites){
            sprites[sprite].image=new Image()
            sprites[sprite].image.src=sprites[sprite].imageSrc
         }
        //   (this.sprites);

    }
    // draw() { //method of the plyer poisition
    //     c.fillStyle = this.color
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)//height 150 overwrited by this height
    //     // x and y from the player positions 

    //     //attackbox
    //     if(this.isAttacking){ //whn attackiing is true green box appear
    //     c.fillStyle = 'green'
    //     c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)
    // }
    // }
    update() {
        this.draw()
    //    this.animateframes()
       if(!this.dead) this.animateframes()
        this.attackbox.position.x=this.position.x + this.attackbox.offset.x//-50 turns opposite for enemy
        this.attackbox.position.y=this.position.y
        //    this.velocity.y+=gravity//gravity value added to avoid the gap but it goes down so it added in the else condition commented
        //changing the y position and to stop the position out of black
        // this.position.y+=10
        // c.fillRect(this.attackbox.position.x,this.attackbox.position.y,this.attackbox.width,this.attackbox.height)
        //  (this.attackbox.position);
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        //if bottom of the rec+velocity==bottom of the canvs right down to it velocity is 0
        if (this.position.y + this.height + this.velocity.y >= canvas.height-100) {
            this.velocity.y = 0 //samll distance between canvas and rec sp litle value added as gravity
        }
        else {
            this.velocity.y += gravity//stoped going down
        }
        
    }
    attack(){
       this.switchsprite('attack')
        this.isAttacking=true
        setTimeout(()=>{
      this.isAttacking=false
        },100)
    }
    spattack(){
        
        
           
            if(this.isspAttacking==true){
                
                this.isAttacking=true
               
                this.switchsprite('spattack')
                
               return this.isspAttacking=false

             }
        
    //      this.isAttacking=true
    //      this.isspAttacking=true
    //      if(this.isspAttacking==true){
    //         this.switchsprite('spattack')
    //      }
    //       (this.isspAttacking);
    //      setTimeout(()=>{
    //    this.isAttacking=false
    //    this.isspAttacking=false
    //      },1)
     }
    attacked(){
        // this.switchsprite('attacked')
        
            this.health -= 20
          
            
        
        if(player.health<=0){
            player.switchsprite('death') 
           enemy.switchsprite('win') 
        }
        else if(enemy.health<=0){
            enemy.switchsprite('death') 
            player.switchsprite('win') 
        }
        else{
            this.switchsprite('attacked')
        }
    }
    switchsprite(sprite){
        if(this.image===this.sprites.death.image ) {
            if(this.framecurrent===this.sprites.death.framemax-1)
            this.dead=true
            return
        }
        if(this.image===this.sprites.spattack.image && this.framecurrent<this.sprites.spattack.framemax-1) return
        //overriding all animation with attack anmation
        if(this.image===this.sprites.attack.image && this.framecurrent<this.sprites.attack.framemax-1) return
        if(this.image===this.sprites.attackback.image && this.framecurrent<this.sprites.attackback.framemax-1) return
        
        //overriding all animation with attack anmation
        if(this.image===this.sprites.attacked.image && this.framecurrent<this.sprites.attacked.framemax-1) return
        
        switch (sprite) {
            case 'idle':
                if(this.image !==this.sprites.idle.image){
                if (keys.a.pressed==false&&player.lastkey === 'a'){
                    
                    this.image=this.sprites.idleback.image
                    this.framemax=this.sprites.idle.framemax
                    // this.framecurrent=0
                }
                else{
                    this.image=this.sprites.idle.image 
                    this.framemax=this.sprites.idle.framemax
                
                    // this.framecurrent=0      
                         }
            }
          
                break;
                case 'enidle':
                    if(this.image !==this.sprites.idle.image){
                    if (keys.ArrowRight.pressed==false&&enemy.lastkey === 'ArrowRight'){
                        
                        this.image=this.sprites.idle.image
                        this.framemax=this.sprites.idle.framemax
                        // this.framecurrent=0
                    }
                    else{
                        this.image=this.sprites.idleback.image 
                        this.framemax=this.sprites.idle.framemax
                    
                        // this.framecurrent=0      
                             }
                }
              
                    break;
                
                case 'jump':
                   
                       
                        this.image=this.sprites.jump.image
                        this.framemax=this.sprites.jump.framemax
                         
                      
                       
                break;
                case 'enjump':
                    if(this.image !==this.sprites.jump.image){
                        if(enemy.lastkey === 'ArrowLeft'){
                         
                            this.image=this.sprites.jump.image
                            this.framemax=this.sprites.jump.framemax
                        // this.framecurrent=0
                    }
                    else if(enemy.lastkey === 'ArrowRight'){
                        this.image=this.sprites.jumpback.image
                        this.framemax=this.sprites.jump.framemax
                        this.framecurrent=0
                    }
                    else{
                       
                        this.image=this.sprites.jump.image
                        this.framemax=this.sprites.jump.framemax
                        
                        this.framecurrent=0
                    }
                    
                        }
                       
                break;
              
                case 'run':
                    if(this.image !==this.sprites.run.image){
                        this.image=this.sprites.run.image
                        this.framemax=this.sprites.run.framemax
                        this.framecurrent=0    
                    }
                 
                break;
                case 'runback':
                    if(this.image !==this.sprites.runback.image){
                    this.image=this.sprites.runback.image
                    this.framemax=this.sprites.runback.framemax
                    this.framecurrent=0    
                }
              
                break;
                case 'attack':
                
                if(this.image !==this.sprites.attack.image){
                   
                        this.image=this.sprites.attack.image 
                        this.framemax=this.sprites.attack.framemax
                    
                        this.framecurrent=0      
                  
                }
              
                break;
                case 'attacked':
                    if(this.image !==this.sprites.attacked.image){
                    this.image=this.sprites.attacked.image
                    this.framemax=this.sprites.attacked.framemax
                    this.framecurrent=0    
                }
              
                break;
                case 'death':
                    if(this.image !==this.sprites.death.image){
                    this.image=this.sprites.death.image
                    this.framemax=this.sprites.death.framemax
                    this.framecurrent=0    
                }
              
                break;
                case 'spattack':
                    if(this.image !==this.sprites.spattack.image){
                    this.image=this.sprites.spattack.image
                    this.framemax=this.sprites.spattack.framemax
                    this.framecurrent=0    
                }
              
                break;
        
        
            default:
                break;
        }
    }
}
const background =new Sprite({
    position:{
        x:-200, //making x position to side 0
        y:0
    },imageSrc:'images/bg.jpg', scale:1.5, //scsle added for full
})
// const shop =new Sprite({
//     position:{
//         x:1000, //600 125
//         y:170
//     },imageSrc:'images/shop.png',
//     scale:2.75,
//     framemax:6
// })
const player = new fighter({     //velocity added changing the sprite
    position: {
        x: 200, y: 0
    },
    velocity: {
        x: 0,
        y: 0//if v change plyer box ony get +10
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc:'./images/narutostance.png',
    framemax:6,
    scale:2.5, //2
    offset:{
        x:60, //215
        y:200 //157
    } ,sprites:{
        idle:{
            imageSrc:'./images/narutostance.png',
            framemax:4,
        },
        idleback:{
            imageSrc:'./images/narutostanceback.png',
            framemax:4,
        },
        run:{
            imageSrc:'./images/narutorun.png',
            framemax:6,
            // image:new Image()
        },runback:{
            imageSrc:'./images/narutorunback.png',
            framemax:6,
            // image:new Image()
        },jump:{
            imageSrc:'./images/narutojumpback1.png',
            framemax:1,
            // image:new Image()
        }
        ,jumpback:{
            imageSrc:'./images/narutojumpback1.png',
            framemax:1,
            // image:new Image()
        }, attack:{
            imageSrc:'./images/narutopunch.png',
            framemax:6,
        },attackback:{
            imageSrc:'./images/narutopunchback.png',
            framemax:6,
        }, attacked:{
            imageSrc:'./images/narutoattacked.png',
            framemax:2,
        },
         death:{
            imageSrc:'./images/narutodead.png',
            framemax:3,
        }, spattack:{
            imageSrc:'./images/kurama.png',
            framemax:5,
        }
    }
})
// player.draw()//first called to see the position now comment bcz update also called the draw function
const enemy = new fighter({     //velocity added changing the sprite
    position: {
        x: 500, y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    
    offset:{
        x: 0,
        y:0
    }
    ,imageSrc:'./images/sasukestanceback.png'
    ,framemax:6,
    scale:2.5, //2
    offset:{
        x:0, //215
        y:190 //157
    } ,sprites:{
        idle:{
            imageSrc:'./images/sasukestance.png',
            framemax:4,
        },
        idleback:{
            imageSrc:'./images/sasukestanceback.png',
            framemax:4,
        },
        run:{
            imageSrc:'./images/sasukerunback.png',
            framemax:6,
            // image:new Image()
        },runback:{
            imageSrc:'./images/sasukerun.png',
            framemax:6,
            // image:new Image()
        },jump:{
            imageSrc:'./images/sasukejump2.png',
            framemax:1,
            // image:new Image()
        }
        ,jumpback:{
            imageSrc:'./images/sasukejumpback2.png',
            framemax:1,
            // image:new Image()
        }, attack:{
            imageSrc:'./images/sasukepunchback.png',
            framemax:4,
        }, attackback:{
            imageSrc:'./images/sasukepunch.png',
            framemax:4,
        },
        attacked:{
            imageSrc:'./images/sasukettacked.png',
            framemax:2,
        },
        death:{
            imageSrc:'./images/sasukedead.png',
            framemax:3,
        }, win:{
            imageSrc:'./images/sasukewin.png',
            framemax:3,
        }, spattack:{
            imageSrc:'./images/beastsasuke.png',
            framemax:5,
        }
    }
    
   
})

// x and y are properties of the position object passed to the constructor of the Sprite class. They represent the coordinates of the sprite's position in a two-dimensional space.
// n the context of the player instance, player.position.x represents the horizontal coordinate, and player.position.y represents the vertical coordinate of the sprite's position.
const keys = {
    a: {
        pressed: false //default  false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: true
    }
}

function determination({player,enemy,timerid}){
    clearTimeout(timerid)
    document.querySelector("#text").style.display='flex'
    if(player.health==enemy.health){
        
        
        document.querySelector("#text").innerHTML="tie"
    }
    else if(player.health>enemy.health){
      
      const ko='<img src="./images/ko.gif" alt="" width="700px">'
      document.querySelector("#text").innerHTML=ko
    }
    else{
      
      const ko='<img src="./images/ko.gif" alt="" width="700px">'

        document.querySelector("#text").innerHTML=ko
    }
}
let timer=60
let timerid
function dectimer(){
   if(timer>0) {
  timerid= setTimeout(dectimer,1000)

    timer--
    document.querySelector("#timer").innerHTML=timer
}
if (timer==0) {
    
    
determination({player,enemy,timerid})
}
}
dectimer()


let lastkey //when holding d and a a only happens so giving condition with last key
function animate() {
    window.requestAnimationFrame(animate)
    //  ('go');
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.height, canvas.width)
    background.update()
    // shop.update()
    player.update()
    enemy.update()
    player.velocity.x = 0
    enemy.velocity.x = 0//stop moving
    //player movemnt
  
    if (keys.a.pressed && player.lastkey === 'a') { // while pressing changed to true by switch and change values 
         (player.position.x)
         if(player.position.x>=-20){
            player.velocity.x = -10
         }
        
      
        // player.image=player.sprites.runback.image
      player.switchsprite('runback')
    //   enemy.switchsprite('runback')


    } else if (keys.d.pressed && player.lastkey === 'd') {
        if(player.position.x<=1350){
            player.velocity.x = 10
         }
        
        // player.image=player.sprites.run.image
        player.switchsprite('run')
        

    }
    else{
        player.switchsprite('idle')
        // enemy.switchsprite('idle')
    }
    if(player.velocity.y<0){
        // player.image=player.sprites.jump.image
        player.switchsprite('jump')
       
        // player.framemax=player.sprites.jump.framemaxw
        // player.framemax=0ww
    }

      
    // enemy movemnt
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') { // while pressing changed to true by switch and change values 
        if(enemy.position.x>=-20){
            enemy.velocity.x = -10
         }
        // enemy.velocity.x = -10
        enemy.switchsprite('run')

    } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        if(enemy.position.x<=1350){
            enemy.velocity.x = 10
         }
        enemy.switchsprite('runback')
    }
    else {
       
        enemy.switchsprite('enidle')
    }
    if(enemy.velocity.y<0){
        // player.image=player.sprites.jump.image
        enemy.switchsprite('enjump')
       
        // player.framemax=player.sprites.jump.framemaxw
        // player.framemax=0ww
    }
   

    //detect for collision

    if (player.attackbox.position.x + player.attackbox.width >= enemy.position.x && 
        player.attackbox.position.x<=enemy.position.x+enemy.width &&
        player.attackbox.position.y+player.attackbox.height>=enemy.position.y&&
        player.attackbox.position.y<=enemy.position.y+enemy.height &&
       player.isAttacking ) {
       
        //no width for player and enemy so adding width in sprite
        //if attackbox of the player=enemy body when i go beyond the enemy it detect as collison
        //so if the left side of attck box i less than the right side of the enry
        //whlle jumpin in the collison area also collison detect without touching body so bottom of the attckbox lees than or equal to top of the enemy
       
        enemy.attacked()
        player.isAttacking=false 
        
        //to make one hit
        // enemy.health -= 20
        // document.querySelector('#enemyhealth').style.width=enemy.health+'%'
        gsap.to('#enemyhealth',{
           width:enemy.health+'%'
        })
        
    }
    if (enemy.attackbox.position.x + enemy.attackbox.width >= player.position.x && 
        enemy.attackbox.position.x<=player.position.x+player.width &&
        enemy.attackbox.position.y+enemy.attackbox.height>=player.position.y&&
        enemy.attackbox.position.y<=player.position.y+player.height &&
        enemy.isAttacking ) {
            player.attacked()
        // player.health -= 20
            document.querySelector('#playerhealth').style.width=player.health+'%'
       enemy.isAttacking=false //to make one hit
       gsap.to('#playerhealth',{
        width:player.health+'%'
     })
       
    }
  //end game health
  if(enemy.health<=0||player.health<=0){

    determination({player,enemy,timerid})
  }

}
animate()

// move char with event listener
window.addEventListener('keydown', (event) => {

    if(!player.dead){
    switch (event.key) {
        case 'd':
            keys.d.pressed = true //change the default values
            player.lastkey = 'd'
            break
        case 'a':
            player.lastkey = 'a'
            
            keys.a.pressed = true
            break
        case 'w':
             (player.velocity.y );
                
                if(player.velocity.y == 0 ){
                    player.velocity.y = -25 
                }
                
            // player.velocity.y = -20 //after jump always come down bcz of gravity
            
        
            break
            case 's':
            player.attack()
            
            break
            case 'z':
                player.spattack()
                
                
                break
        // case 'ArrowRight':
        //     keys.ArrowRight.pressed = true //change the default values
        //     enemy.lastkey = 'ArrowRight'
        //     break
        // case 'ArrowLeft':
        //     enemy.lastkey = 'ArrowLeft'
        //     keys.ArrowLeft.pressed = true
        //     break
        // case 'ArrowUp':
        //     if(enemy.velocity.y == 0 ){
        //         enemy.velocity.y = -20 
        //     } //after jump always come down bcz of gravity
        //     // keys.w.pressed = true
        //     break
        //     case 'ArrowDown':
                
        //         enemy.attack()//after jump always come down bcz of gravity
        //     // keys.w.pressed = true
        //     break
        }
    }
    if(!enemy.dead){
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true //change the default values
                enemy.lastkey = 'ArrowRight'
                break
            case 'ArrowLeft':
                enemy.lastkey = 'ArrowLeft'
                keys.ArrowLeft.pressed = true
                break
            case 'ArrowUp':
                if(enemy.velocity.y == 0 ){
                    enemy.velocity.y = -25 
                } //after jump always come down bcz of gravity
                // keys.w.pressed = true
                break
                case 'ArrowDown':
                    
                    enemy.attack()//after jump always come down bcz of gravity
                // keys.w.pressed = true
                break
                case '/':
                    enemy.spattack()
                    break
        }
    }
    
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false //to stop moving after lift up
            break
        case 'a':
            keys.a.pressed = false//to stop moving after lift up
            break

    }
    //enemy
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false //to stop moving after lift up
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false//to stop moving after lift up
            break

    }

   
})
// arr=['ArrowRight','ArrowLeft','ArrowUp','ArrowDown']
 
// while(!enemy.dead){
//     randomIndex = Math.floor(Math.random() * arr.length);


// }
// enemy.comkey = arr[randomIndex];
// if(!enemy.dead){
//     switch (enemy.comkey) {
//         case 'ArrowRight':
//             keys.ArrowRight.pressed = true //change the default values
//             enemy.lastkey = 'ArrowRight'
//             break
//         case 'ArrowLeft':
//             enemy.lastkey = 'ArrowLeft'
//             keys.ArrowLeft.pressed = true
//             break
//         case 'ArrowUp':
//             if(enemy.velocity.y == 0 ){
//                 enemy.velocity.y = -20 
//             } //after jump always come down bcz of gravity
//             // keys.w.pressed = true
//             break
//             case 'ArrowDown':
                
//                 enemy.attack()//after jump always come down bcz of gravity
//             // keys.w.pressed = true
//             break
//     }
// }



           