let elemList = document.querySelectorAll('.checher')
let parent = document.querySelector('#parent')
let house = document.querySelector('#house')
let taskNum = +document.querySelector('.container').getAttribute('data-task')
let nextEx = document.querySelector('.next-ex');
let dragger;
let resultArr = []
let truthStore = [["fwd","fwd","fwd","fwd","fwd"],[],
["rep", "25", "do", "rep1"]];
let truth = truthStore[taskNum-1];
itemList = Array.from(elemList);
elemList.forEach(elem=> elem.setAttribute('draggable',true))

const swaping = function(e){
    let indexfind = 0;
    let indexDrag = 0;
    let indexDrop = 0;
    if(elemList.item(dragger)){         
        elemList.forEach((elem)=>{
            if(e.target == elem){
                indexDrop= indexfind
            }
            indexfind++
        })
        indexfind = 0;
        elemList.forEach((elem)=>{
            if(dragger == elem){
                indexDrag= indexfind
            }
            indexfind++
        })}
    elemList.forEach((elem)=>{
        if(e.target == elem){
            if(indexDrag!=indexDrop-1){
                e.target.before(dragger)    
            }else{
                e.target.after(dragger) 
            }
        }
    })
}

parent.addEventListener('dragover', (e)=>{
    e.preventDefault()})
house.addEventListener('dragover', (e)=>{
    e.preventDefault()
})

itemList.forEach((el)=>{
    el.addEventListener('dragstart', (e)=>{
        if(!e.target.getAttribute("draggable")){
            e.preventDefault();
        }
        dragger = e.target
    })
})

document.addEventListener('drop', (e)=>{
    e.preventDefault()
    elemList = document.querySelectorAll('.checher')
    if(e.target == parent || e.target.parentNode == parent && e.target != dragger){ 
        if(dragger!=house){e.target.appendChild(dragger)
        swaping(e)}
    }
    if(e.target == house || e.target.parentNode == house && e.target != dragger){
        e.preventDefault()
        elemList = document.querySelectorAll('.checher')
        resultArr.splice(resultArr.indexOf(dragger.getAttribute('data-info')),1)
        house.appendChild(dragger)
        swaping(e)
    }})

document.addEventListener('keydown',(e)=>{
    if(e.keyCode == 13){
        let checking = parent.querySelectorAll('.checher');
        resultArr.splice(0, resultArr.length)
        checking.forEach((elem)=>{
            resultArr.push(elem.getAttribute('data-info'))
        })
        let check = false;
        if(truth.length == resultArr.length){
            for(let i = 0; i<=truth.length-1; i++){
                check = truth[i]==resultArr[i]
                if(!check){
                    break
                }
            }
        }

        if(check){
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
})