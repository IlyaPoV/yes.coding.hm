(function(){
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    const curentEx = (+document.querySelector('.container').getAttribute('data-task'))-1;
    let review = false;
    //imgs
    const leaves = document.querySelector('#leaves');
    const golang = document.querySelector('#golang');

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
                resolve()
            }, 300)             
        })},
        moveRight:  ()=>{
            return new Promise(resolve =>{
                setTimeout(()=>{
                    placeDrowing()
                    turtle.posX+=50;
                    turtle.drowing();
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

    function stuckToRun(firstArr){
    let StuckBeforeRun = firstArr;
    let middleStuck=[];
    while(StuckBeforeRun.indexOf("rep")>=0){
        for(let idx = 0; idx<StuckBeforeRun.length; idx++){
            let el = StuckBeforeRun[idx];
            if(el == 'fwd'|| el =='right' || el == 'left'|| el == 'dwn'){
                middleStuck.push(el)
            }else if(el=="rep"){
                if(!(repHandler(StuckBeforeRun))){
                    throw new Error("Ошибка в синтаксисе цикла")
                }
                let loopStuck = []
                let loopStart = idx+3;
                let loopTimes = parseInt(StuckBeforeRun[idx+1]);
                let endFind = 1;
                let i = 0;
                let elem;
                let elemEnd;
                while(endFind>0){
                    elemEnd = loopStart+i
                    elem = StuckBeforeRun[elemEnd];
                    i++;
                    if(elem == "rep"){
                        endFind++;
                    }
                    if(elem == "end"){
                        endFind--;
                    }
                    if(endFind>0||!(elem == "end")){
                        loopStuck.push(elem);
                    }
                }
                let endLoopStuck = [];
                for(let i = 0; i < loopTimes;i++){
                    endLoopStuck = endLoopStuck.concat(loopStuck);
                }
                let loopLenght= elemEnd-idx;
                endLoopStuck.forEach(el=>{
                    middleStuck.push(el);   
                })
                idx+=loopLenght;
            }
        }
    StuckBeforeRun = middleStuck;
    middleStuck = [];

    }
    return StuckBeforeRun;
    }

    clear();
    document.addEventListener('keydown',(e)=>{
        if(e.keyCode == 13){
            let parent = document.querySelector("#parent");
            let resultArr = [];
            let runStack=[];
            let checking = parent.querySelectorAll('.checher');
            checking.forEach((elem)=>{
                resultArr.push(elem.getAttribute('data-info'))
            })
            clear();
            let arrStackToRun = stuckToRun(resultArr)
            arrStackToRun.forEach((elem,i)=>{
                if(elem == 'fwd'){
                    runStack.push(turtle.moveUp)
                }
                else if(elem == 'right'){
                    runStack.push(turtle.moveRight)
                }
                else if(elem == 'left'){
                    runStack.push(turtle.moveLeft)
                }
                else if(elem == 'dwn'){
                    runStack.push(turtle.moveDown)
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

    
}())