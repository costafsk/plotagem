
export function city() {
    const select = document.querySelector('#city');
    const ul = document.querySelector('.mdl-list');
    const li = document.createElement('li');
    li.className = 'mdl-list__item';
    const span = document.createElement('span');
    span.className = 'mdl-list__item-primary-content';
    span.textContent = select.value;
    const button = document.createElement('button');
    button.className = 'remove';
    button.textContent = 'Remover';
    button.style.backgroundColor = '#ff6565';
    button.style.color = 'white';
    button.style.outline = 'none';
    button.style.border = 'none';
    button.style.borderRadius = '3px';
    button.style.fontWeight = 'bold';
    button.style.fontSize = '1em';
    button.style.padding = '4px';
    button.style.cursor = 'pointer';
    button.style.transition = '0.3s background-color';
    button.addEventListener('focus', function() {
        button.style.color = '#ff6565';
        button.style.backgroundColor = 'white';
        setTimeout(function() {
            button.parentElement.remove();
        }, 500);
    })
    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
}

export function delPreload() {
    document.querySelector('.preload').parentElement.remove();
    const layout = document.querySelector('.mdl-layout__container');
    layout.style.display = 'block';
    layout.style.height = '100%';
}