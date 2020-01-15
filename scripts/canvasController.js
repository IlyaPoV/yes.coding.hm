(function(){
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    const curentEx = (+document.querySelector('.container').getAttribute('data-task'))-1;
    let review = false;
    //imgs
    const leaves = document.querySelector('#leaves');
    const golang = document.querySelector('#golang');

    let runStack;

    const startCoord = [
        {//1
            turtleStartX: 188,
            turtleStartY: 335,
            targetStartX: 185.5,
            targetStartY: 82.5,
            finishAtX: 188,
            finishAtY: 85
        },
        {//2
            turtleStartX: 88,
            turtleStartY: 335,
            targetStartX: 185.5,
            targetStartY: 82.5,
            finishAtX: 188,
            finishAtY: 85,
        },
        {//3
            turtleStartX: 88,
            turtleStartY: 335,
            targetStartX: 185.5,
            targetStartY: 82.5,
            finishAtX: 188,
            finishAtY: 85,
        },
        {//4
            turtleStartX: 88,
            turtleStartY: 335,
            targetStartX: 335.5,
            targetStartY: 82.5,
            finishAtX: 338,
            finishAtY: 85,
        },
        {//5
            turtleStartX: 88,
            turtleStartY: 335,
            targetStartX: 185.5,
            targetStartY: 82.5,
            finishAtX: 188,
            finishAtY: 85,
        },
        {//6
            turtleStartX: 88,
            turtleStartY: 335,
            targetStartX: 185.5,
            targetStartY: 82.5,
            finishAtX: 188,
            finishAtY: 85,
        },
        {//7
            turtleStartX: 88,
            turtleStartY: 335,
            targetStartX: 185.5,
            targetStartY: 82.5,
            finishAtX: 188,
            finishAtY: 85,
        },
        {//8
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
        moveUp: ()=>{
            return new Promise(resolve =>{
            setTimeout(()=>{
                placeDrowing()
                turtle.posY-=50;
                turtle.drowing();
                itemNow++
                resolve()
            }, 300)             
        })},
        moveRight:  ()=>{
            return new Promise(resolve =>{
                setTimeout(()=>{
                    placeDrowing()
                    turtle.posX+=50;
                    turtle.drowing();
                    itemNow++
                    resolve()
                }, 300) 
            })
        },
        moveLeft: (cb)=>{
            return new Promise(resolve =>{
                setTimeout(()=>{
                    placeDrowing()
                    turtle.posX-=50;
                    turtle.drowing();
                    itemNow++
                    resolve()
                }, 300)
            })  
        },
        moveDown: ()=>{
            return new Promise(resolve =>{
                setTimeout(()=>{
                    placeDrowing()
                    turtle.posY+=50;
                    turtle.drowing();
                    itemNow++
                    resolve();
                }, 300)
            })   
        }
    }
    

    function repHandler(state) {
        let sintaxArr =["rep","do","end"]
        let inState = -0.1;
        let allRight = true;
        sintaxArr.forEach((el)=>{
            inState < state.indexOf(el) ? inState = state.indexOf(el) :  allRight = false;
            inState = state.indexOf(el)
            if(inState ==-1||!allRight){
                return false;
            }
        })
        return allRight;
    }

    clear();
    let itemLoopStart;
    let itemLoopEnd;
    let loopTimes;
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
            itemLoopEnd = resultArr.indexOf('end') - resultArr.indexOf('rep') - 3;
            
            let loopStack = [];
            let loopTimes1;
            let countOfRepl;
            
            
            while(resultArr.indexOf("rep")>=0){
                if(repHandler(resultArr)){
                    itemLoopStart = resultArr.indexOf("rep");
                    itemLoopEnd = resultArr.indexOf("end");
                    loopTimes1 = parseInt(resultArr[itemLoopStart+1])
                    countOfRepl=itemLoopEnd-itemLoopStart;

                    for(let i = 0; i<loopTimes1;i++){
                        for(let i = itemLoopStart+2; i<itemLoopEnd-1; i++){
                            loopStack.push(resultArr[i+1]) 
                        } 
                    } 

                    resultArr.splice(itemLoopStart,countOfRepl+1)
                    loopStack.forEach((el,i)=>{
                    resultArr.splice(itemLoopStart+i,0,el)
                    })
                }else{
                    throw new Error("Ошибка в синтаксисе цикла");
                }
            }

            resultArr.forEach((elem,i)=>{
                if(elem == 'fwd'){
                    runStack.push(turtle.moveUp)
                }
                else if(elem == 'right'){
                    runStack.push(turtle.moveRight)
                }
                //desription for all actions
            })
    
            async function run(){
                for(let elem of runStack){
                   await elem(); 
                }
            }
            run().then(()=>reviewCheck());
            
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
        placeDrowing();
        turtle.clearPos();
    }
    
    function placeDrowing(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.lineWidth = 7;
        ctx.strokeStyle ="#696969"
        ctx.strokeRect(30.5, 30.5, 350, 350);
        ctx.strokeStyle ="#262626"
        ctx.strokeRect(32.5, 32.5, 346, 346);
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

// test new loop

    let textArr =['rep',"3","do",'rep','end','end','rep','end']
    for(const i of textArr){

        console.log(textArr.lastIndexOf('end',i))
    }
    
    Array.prototype.howMuch = function(item){
        let idx = this.indexOf(item);
        let indices=[]
        while (idx != -1) {
            indices.push(idx);
                idx = this.indexOf(item, idx + 1);
            }
        return indices.length
    }

    if(textArr.howMuch("rep")>1){
        let firstRep = textArr.indexOf("rep")+1
        let vlozh = textArr.indexOf("rep",firstRep)<textArr.indexOf("end",firstRep)    
        if(vlozh){
            let vlozhLvl = textArr.howMuch("rep");

            let trueEnd = textArr.indexOf("end")+vlozhLvl-1;
            let doubling = textArr.lastIndexOf()
            trueEnd = textArr.indexOf("end",trueEnd);

            console.log(trueEnd);
        }
    }
    


}())