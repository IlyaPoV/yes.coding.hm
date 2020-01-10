(function(){
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    const curentEx = (+document.querySelector('.container').getAttribute('data-task'))-1;
    let review = false;
    //imgs
    const leaves = document.querySelector('#leaves');
    const golang = document.querySelector('#golang');

    let itemNow;
    let runStack;

    const startCoord = [
        {
            turtleStartX: 188,
            turtleStartY: 335,
            targetStartX: 185.5,
            targetStartY: 82.5,
            finishAtX: 188,
            finishAtY: 85
        },
        {
            turtleStartX: 88,
            turtleStartY: 335,
            targetStartX: 185.5,
            targetStartY: 82.5,
            finishAtX: 188,
            finishAtY: 85,
        }
    ]

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
            ctx.drawImage(golang, turtle.posX, turtle.posY, 45,45)
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
                }else{
                    reviewCheck()
                }
            }, 300)             
        },
        moveRight:  (cb)=>{
            setTimeout(()=>{
                placeDrowing()
                turtle.posX+=50;
                turtle.drowing();
                itemNow++
                if(cb){
                    cb(runStack[itemNow])
                }else{
                    reviewCheck()
                }
            }, 300) 
        },
        moveLeft: (cb)=>{
            setTimeout(()=>{
                placeDrowing()
                turtle.posX-=50;
                turtle.drowing();
                itemNow++
                if(cb){
                    cb(runStack[itemNow])
                }else{
                    reviewCheck()
                }
            }, 300)  
        },
        moveDown: (cb)=>{
            setTimeout(()=>{
                placeDrowing()
                turtle.posY+=50;
                turtle.drowing();
                itemNow++
                if(cb){
                    cb(runStack[itemNow])
                }else{
                    reviewCheck()
                }
            }, 300)   
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
                if(elem == 'fwd'){
                    runStack.push(turtle.moveUp)
                }
                else if(elem == 'right'){
                    runStack.push(turtle.moveRight)
                }
                //desription for all actions
            })      
            runStack[0](runStack[1])      
    }})

    function reviewCheck(){
        review = turtle.posX == startCoord[curentEx].finishAtX && turtle.posY == startCoord[curentEx].finishAtY;
        if(review){
            parent.classList.remove('false')
            parent.classList.add('truth')
            nextEx.classList.remove('none');
            let nexTask = taskNum+1;
            nextEx.setAttribute('href', `${nexTask}.html`)
        }else{
            parent.classList.remove('truth')
            parent.classList.add('false')
        } 
    }

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
        ctx.drawImage(leaves, 34.5, 34.5, 342, 342);
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