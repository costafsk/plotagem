
export function addCity() {
    const select = document.querySelector('#city');
    const ul = document.querySelector('.mdl-list');
    const li = document.createElement('li');
    li.className = 'mdl-list__item';
    const span = document.createElement('span');
    span.className = 'mdl-list__item-primary-content';
    span.textContent = select.value;
    const button = document.createElement('button');
    button.textContent = 'Remover';
    button.style.backgroundColor = '#ff6565';
    button.style.color = 'white';
    button.style.outline = 'none';
    button.style.border = 'none';
    button.style.borderRadius = '3px';
    button.style.fontWeight = 'bold';
    button.style.fontSize = '1em';
    button.style.padding = '4px';
    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
}
