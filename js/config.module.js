export function delPreload() {
    document.querySelector('.preload').parentElement.remove();
    const layout = document.querySelector('.mdl-layout__container');
    layout.style.display = 'block';
    layout.style.height = '100%';
}

export function city(escolhidos) {
    const select = document.querySelector('#city');
    const ul = document.querySelector('.mdl-list');
    const li = document.createElement('li');
    li.className = 'mdl-list__item';
    const span = document.createElement('span');
    span.className = 'mdl-list__item-primary-content';
    span.textContent = select.value;
    const buttonRemove = document.createElement('button');
    buttonRemove.className = 'remove';
    buttonRemove.textContent = 'Remover';

    buttonRemove.addEventListener('focus', function() {
        setTimeout(function() {
            const item = buttonRemove.parentElement;
            for (let i = 0; i < escolhidos.length; i++) {
                if (escolhidos[i] === item.firstChild.textContent) {
                    escolhidos.splice(i, 1);
                    break;
                }
            }
            item.remove();
        }, 500);
    });
    li.appendChild(span);
    li.appendChild(buttonRemove);
    ul.appendChild(li);
}
export function createColumn(escolhidos, dates) {
    const cidade = escolhidos[escolhidos.length - 1];
    const taxas = findTaxas(cidade, dates);
    const color = randomColor();
    for (const i of taxas) {
        const columnOfPlot = document.querySelector('#y' + i[0]);
        const column = document.createElement('div');
        column.className = cidade;
        column.style.backgroundColor = color;
        column.style.height = ((i[1]*100) / 50) + '%';
        console.log(column);
    }
}

function findTaxas(cidade, dates) {
    const taxas = [];
    let year = null;
    for (let i=0; i<dates.length; i++) {
        if (dates[i].ibge === 'ibge') {
            year = dates[i].taxa.substring(30, 34);
        }
        if (dates[i].municipio === cidade) {
            taxas.push([parseInt(year), parseFloat(dates[i].taxa)]);
        }
    }

    taxas.sort(function(a, b) {
        return a[0] - b[0];
    });

    return taxas;
}

function randomColor() {
    const red = parseInt(Math.random(1) * 255);
    const green = parseInt(Math.random(1) * 255);
    const blue = parseInt(Math.random(1) * 255);

    return `rgb(${red},${green},${blue})`;
}
