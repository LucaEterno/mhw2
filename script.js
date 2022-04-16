const answer ={};

const boxList = document.querySelectorAll('.choice-grid div');
for(let item of boxList){
    item.addEventListener('click', selected);
}

function selected(event){
    const box=event.currentTarget;
    const qid= box.dataset.questionId;
    const cid= box.dataset.choiceId;
    const boxList= document.querySelectorAll('.choice-grid div');
    
    for (let item of boxList){
        if(item.dataset.questionId===qid){
            item.classList.add('overlay');
            const check=item.querySelector('.checkbox');
            check.src='images/unchecked.png';
        }
    }
    
    box.classList.remove('overlay');
    box.classList.add('selected');
    const check=box.querySelector('.checkbox');
    check.src="images/checked.png";
    if (answer[qid]){
        delete answer[qid];
    }
    answer[qid]=cid;
    stampa();
    stopListening();
}

function stampa(){
    for (let key in answer){
        console.log(key + ': ' + answer[key]);
    }
}

function stopListening(){
        if(answer.one && answer.two && answer.three){
            const boxList = document.querySelectorAll('.choice-grid div');
            for(let item of boxList){
                item.removeEventListener('click', selected);
            }
            getResult();
        } 
}

/*
function getResult(){
    const resultSection= document.querySelector('#result');
    
    const title = document.createElement('h1');
    title.textContent = RESULTS_MAP[result()].title;
    resultSection.appendChild(title);

    const content = document.createElement('p');
    content.textContent = RESULTS_MAP[result()].contents;
    resultSection.appendChild(content);

    const button = document.createElement('button');
    button.textContent = 'Ricomincia il quiz!';
    resultSection.appendChild(button);
}
*/

function getResult(){
    const resultSection= document.querySelector('#result');

    const title=resultSection.querySelector('h1');
    title.textContent = RESULTS_MAP[result()].title;;

    const content=resultSection.querySelector('p');
    content.textContent = RESULTS_MAP[result()].contents;;

    resultSection.classList.remove('hidden');
}

function result(){
    if(answer.two===answer.three){
        return answer.two;
    }
    else {
        return answer.one;
    }
}

const button = document.querySelector('button');
button.addEventListener('click', restart);

function restart(){
    hiddenResult();
    clearMap();
    removeOverlay();
    startListening();
}

function hiddenResult(){
    const resultContainer= document.querySelector('#result');
    resultContainer.classList.add('hidden');
}

function clearMap(){
    for (let key in answer){
        delete answer[key];
    }
}

function removeOverlay(){
    const boxList= document.querySelectorAll('.choice-grid div');
    for (let item of boxList){
        item.classList.remove('overlay');
        item.classList.remove('selected');
        const check=item.querySelector('.checkbox');
        check.src='images/unchecked.png';
    }
}

function startListening(){
    const boxList = document.querySelectorAll('.choice-grid div');
    for(let item of boxList){
        item.addEventListener('click', selected);
    }
}