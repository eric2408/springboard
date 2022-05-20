document.getElementById('container');
document.querySelector('#container');
document.querySelectorAll('.second');
document.querySelector('ol .third');

const contain = document.querySelector('#container');
contain.innerText = "Hello!";

const foot = document.querySelector('.footer');
foot.classList.add('main');

foot.classList.remove('main');

const newLi = document.createElement('li');

newLi.innerText = "four";

const unorganized = document.querySelector('ul');
unorganized.append(newLi);

const innerList = document.querySelectorAll('ol li');
for(let li of innerList){
    li.style.backgroundColor = 'green';
}


const footer = document.querySelector('.footer');
footer.remove();
