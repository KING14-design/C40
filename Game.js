class Game{
    constructor()
    {}
    getState(){
        var gameref=database.ref("gameState")
        gameref.on("value",function(data){
            gameState=data.val()
        })
    }
    update(state){
        database.ref("/").update({
            gameState:state
        })
    }
    async start(){
        if(gameState===0){
            player=new Player()
            var playerref=await database.ref("playerCount").once("value")
            if(playerref.exists()){
                playerCount=playerref.val()
                player.getCount()
            }
            
            form=new Form()
            form.display()
        }
        car1=createSprite(100,200)
        car2=createSprite(300,200)
        car3=createSprite(500,200)
        car4=createSprite(700,200)
        car1.addImage(carimage1)
        car2.addImage(carimage2)
        car3.addImage(carimage3)
        car4.addImage(carimage4)
        
        cars=[car1,car2,car3,car4]
    }
    play(){
        form.hide()
        text("gameStart",100,100)
        Player.getplayerinfo()
        player.getFinishedPlayers()
        console.log(allPlayers)
        if(allPlayers!==undefined){
            background(groundimage)
            image(trackimage,0,-displayHeight*4,displayWidth,displayHeight*5)
var index=0
var x=150
var y=0
            var position=130
            for(var plr in allPlayers){
                index=index+1
                x=x+200
                y=displayHeight-allPlayers[plr].distance
                cars[index-1].x=x
                cars[index-1].y=y
                if(index===player.index){
                    fill("red")
                    ellipse(x,y,70,70)
                    cars[index-1].shapeColor="red"
                    camera.position.x=displayWidth/2
                    camera.position.y=cars[index-1].y
                }
                text(allPlayers[plr].Name + ":"+allPlayers[plr].distance,cars[index-1].x-20,cars[index-1].y+70)
                position+=40
            }
        }
        if(keyIsDown(UP_ARROW) && player.index!==null&&passFinished===false){
player.distance += 15
player.update()
        }
        if(player.distance>=4140&finishedPlayers<=4&&passFinished===false){
           Player.updateFinishedPlayers()
           player.rank=finishedPlayers
           player.update()
           passFinished=true
        }
        drawSprites()
    }
    end(){
        console.log("gameEnd")
        background(bg1)
        textSize(18)
        fill("green")
        strokeWeight(4)
        stroke("black")
        camera.position.x=0
        camera.position.y=0
        Player.getplayerinfo()
        for(var plr in allPlayers){
            if(allPlayers[plr].rank===1){
                text("first rank:"+allPlayers[plr].Name,displayWidth/4-200,displayHeight/9)
            }
            else if(allPlayers[plr].rank===2){
                text("second rank:"+allPlayers[plr].Name,displayWidth/4-200,displayHeight/9+80)
            }
            else if(allPlayers[plr].rank===3){
                text("Third rank:"+allPlayers[plr].Name,displayWidth/4-200,displayHeight/9+160)
            }
            else if(allPlayers[plr].rank===4){
                text("fourth rank:"+allPlayers[plr].Name,displayWidth/4-200,displayHeight/9+240)
            }
        }
    }
}