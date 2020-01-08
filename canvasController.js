(function(){
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    let turtlePosX;
    let turtlePosY;

    canvas.width =400;
    canvas.height= 400;

    ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
      
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
            let stepsUp=0;
            resultArr.forEach((elem)=>{
                if(elem = 'fwd'){
                    stepsUp++;
                }
            })
            turtle.moveUp(stepsUp);
            
    }})

    function clear(){
        ctx.lineWidth = 7;
        ctx.strokeStyle ="#696969"
        ctx.strokeRect(30.5, 30.5, 350, 350);
        ctx.strokeStyle ="#262626"
        ctx.strokeRect(32.5, 32.5, 346, 346);
        placeDrowing();
    
        turtlePosX = 165;
        turtlePosY = 300;
        ctx.fillStyle = "#b3d43f"
        ctx.fillRect(turtlePosX, turtlePosY, 50,50);
    
    }
    
    function placeDrowing(){
        ctx.fillStyle = "#228B22";
        ctx.fillRect(34.5, 34.5, 342, 342);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#DB7093";
        ctx.strokeRect(165.5,100.5, 50,50);
    }   

let turtle={
    moveUp: (times)=>{
        let iters=0;
        setInterval(()=>{
            iters++;
            if(times < iters){
                clearInterval(this);
                return;
            }
            placeDrowing()
            turtlePosY-=25;
            ctx.fillStyle = "#b3d43f";
            ctx.fillRect(turtlePosX, turtlePosY, 50,50);},100)      
    }
}

}())