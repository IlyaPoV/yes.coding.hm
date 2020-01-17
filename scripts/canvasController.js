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
            targetStartY: 32.5,
            finishAtX: 188,
            finishAtY: 35,
        },
        {//6
            turtleStartX: 88,
            turtleStartY: 335,
            targetStartX: 335.5,
            targetStartY: 32.5,
            finishAtX: 338,
            finishAtY: 35,
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

    canvas.width = 400;
    canvas.height = 400;

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
        allRight = state.howMuch("rep") == state.howMuch("end") && state.howMuch("rep") == state.howMuch("do");  
        if(allRight){
            let expectNum = ()=>{
                let check = true;
                state.forEach((el,i)=>{
                    if(el=="rep"){
                        if(!Boolean(parseInt(state[i+1]))){
                            check =false
                        }
                    }
                })
                return check;
            }
            allRight = expectNum()
        }
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
        ctx.strokeRect(30.5, 30.5, 355, 355);
        ctx.strokeStyle ="#262626"
        ctx.strokeRect(32.5, 32.5, 351, 351);
        ctx.drawImage(leaves, 34.5, 34.5, 347, 347);
        gridDrowing();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#DB7093";
        ctx.strokeRect(startCoord[curentEx].targetStartX,startCoord[curentEx].targetStartY, 48,48);
    }   

    function gridDrowing(){
        for(let x=85; x<375; x+=50){
            ctx.moveTo(x,35);
            ctx.lineTo(x,381.7);
        }

        for(let y=82.5;y<375; y+=50){
            ctx.moveTo(35,y);
            ctx.lineTo(381.7,y);
        }
        ctx.lineWidth=3;
        ctx.strokeStyle = "#888";
        ctx.stroke();
    }

    function stuckToRun(firstArr){
    let StuckBeforeRun = firstArr;
    let middleStuck=[];
        while(checkNumber(StuckBeforeRun) ||StuckBeforeRun.indexOf("rep")>=0 || StuckBeforeRun.indexOf("do")>=0 || StuckBeforeRun.indexOf("end")>=0){
            for(let idx = 0; idx<StuckBeforeRun.length; idx++){
                let el = StuckBeforeRun[idx];
                if(el == 'end'|| el == 'do'){
                    throw new Error("Ошибка в синтаксисе цикла");
                }else if(parseInt(el)){
                    throw new Error("Цифра в пустом месте");
                }else if(el == 'fwd'|| el =='right' || el == 'left'|| el == 'dwn'){
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

    Array.prototype.howMuch = function(item){
        let idx = this.indexOf(item);
        let indices=[]
        while (idx != -1) {
            indices.push(idx);
                idx = this.indexOf(item, idx + 1);
            }
        return indices.length
    }

    function checkNumber(arr){
        let result = false
        arr.forEach(el=>{
            if(Boolean(parseInt(el))){
                result = true;
            }
        })
        return result;
    }



    // Run app
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