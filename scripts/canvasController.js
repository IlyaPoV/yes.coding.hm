(function(){
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    const curentEx = (+document.querySelector('.container').getAttribute('data-task'))-1;
    let itemNow;
    let runStack;
    const startCoord = [{
        turtleStartX: 190,
        turtleStartY: 337,
        targetStartX: 185.5,
        targetStartY: 82.5
    }]

    canvas.width =400;
    canvas.height= 400;

    ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
 
    

    let turtle={
        posX: startCoord[curentEx].turtleStartX,
        posY: startCoord[curentEx].turtleStartY,
        drowing: ()=>{
            ctx.fillStyle = "#b3d43f"
            ctx.fillRect(turtle.posX, turtle.posY, 40,40);
        },
        clearPos: ()=>{
            turtle.posX=startCoord[curentEx].turtleStartX;
            turtle.posY=startCoord[curentEx].turtleStartY;
            turtle.drowing()
        },
        moveUp: (cb)=>{
            setTimeout(()=>{
                placeDrowing()
                turtle.posY-=50;
                turtle.drowing();
                itemNow++
                if(cb){
                    cb(runStack[itemNow])
                }
            }, 500)             
        },
        moveRight:  (cb)=>{
            setTimeout(()=>{
                placeDrowing()
                turtle.posX+=50;
                turtle.drowing();
                itemNow++
                if(cb){
                    cb(runStack[itemNow])
                }
            }, 500) 
        },
        moveLeft: (cb)=>{
            setTimeout(()=>{
                placeDrowing()
                turtle.posX-=50;
                turtle.drowing();
                itemNow++
                if(cb){
                    cb(runStack[itemNow])
                }
            }, 500)  
        },
        moveDown: (cb)=>{
            setTimeout(()=>{
                placeDrowing()
                turtle.posY+=50;
                turtle.drowing();
                itemNow++
                if(cb){
                    cb(runStack[itemNow])
                }
            }, 500)   
        }
        
    }

    clear();

    document.addEventListener('keydown',(e)=>{
        if(e.keyCode == 13){
            let parent = document.querySelector("#parent");
            let resultArr = [];
            let checking = parent.querySelectorAll('.checher');
            resultArr.splice(0, resultArr.length)
            checking.forEach((elem)=>{
                resultArr.push(elem.getAttribute('data-info'))
            })
            count = resultArr.length;
            clear();
            runStack=[];
            itemNow=1;
            resultArr.forEach((elem)=>{
                if(elem = 'fwd'){
                    runStack.push(turtle.moveUp)
                }
                //desription for all actions
            })           
            runStack[0](runStack[1])       
    }})

    function clear(){
        ctx.lineWidth = 7;
        ctx.strokeStyle ="#696969"
        ctx.strokeRect(30.5, 30.5, 350, 350);
        ctx.strokeStyle ="#262626"
        ctx.strokeRect(32.5, 32.5, 346, 346);
        placeDrowing();
        
        turtle.clearPos();
    
    }
    
    function placeDrowing(){
        ctx.fillStyle = "#228B22";
        ctx.fillRect(34.5, 34.5, 342, 342);
        gridDrowing();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#DB7093";
        ctx.strokeRect(startCoord[curentEx].targetStartX,startCoord[curentEx].targetStartY, 50,50);
    }   

    function gridDrowing(){
        for(let x=85; x<375; x+=50){
            ctx.moveTo(x,34.5);
            ctx.lineTo(x,376.7);
        }

        for(let y=82.5;y<375; y+=50){
            ctx.moveTo(34.5,y);
            ctx.lineTo(376.7,y);
        }
        ctx.lineWidth=3;
        ctx.strokeStyle = "#888";
        ctx.stroke();
    } 
}())