document.addEventListener('DOMContentLoaded', init());

let fatchs = 0; 
let optionsFlag = true;

function init() {
    for (let i=99; i<113; i++) {
        let year = '19';
        i === 99 ? year += i : year = 20 + String(i).substring(1, 3);
        const url = `https://cors.io/?http://dados.fee.tche.br/ckan-download/fee-${year}-mun-taxa-de-reprovacao-estadual-102566.csv`;
        fetch(url).then(getText).then(process).catch(console.error);
    }
    function getText(response) {
        return response.text();
    }
    function process(text) {
        const rows = text.split('\n');
        const dates = [];
        fatchs++;
        fatchs === 14 ? delPreload() : null;
        for (let i=1; i<rows.length -1; i++) {
            const columns = rows[i].split(',');
            for (let j=0; j<columns.length; j++) {
                columns[j] = columns[j].replace('"', '');
                columns[j] = columns[j].replace('"', '');
            }
            // Armazenamento
            const date = {
                municipio: columns[0],
                ibge: columns[1],
                latitude: columns[2],
                longitude: columns[3],
                taxa: columns[4],
            };                
            dates.push(date);
        }

        optionsFlag ? options(dates) : null;
    }
    
    const select = document.querySelector('#city');

    function options(dates) {
        let flag = 0;
        for (let i=1; i<dates.length; i++) {
            const first = dates[0].municipio;
            if (dates[i].municipio === first) {
                flag++;
            }
            if (flag === 2) {
                optionsFlag = false;
                break;
            }   
            const newOption = document.createElement('option');
            newOption.textContent = dates[i].municipio;
            newOption.value = newOption.textContent;
            select.appendChild(newOption);
        }
    }

    const button = document.querySelector('.mdl-button');
    let escolhidos = [];
    button.addEventListener('click', function(event) {
        event.preventDefault();
        let flag = true;
        for (const i of escolhidos) {
            if (i === select.value) {
                flag = false;
            }
        }
        if (flag) {
            escolhidos.push(select.value);
            city();
        }
    });
    
    
    function city() {
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
        button.addEventListener('focus', function() {
            let flag;
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
            setTimeout(function() {
                flag = button.parentElement;
                for (let i=0; i<escolhidos.length; i++) {
                    if (escolhidos[i] === flag.firstChild.textContent) {
                        escolhidos.splice(i, 1);
                        break;
                    }
                }
                flag.remove();
            }, 500);
            
        })
        console.log(escolhidos);
        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);
    }

    function delPreload() {
        document.querySelector('.preload').parentElement.remove();
        const layout = document.querySelector('.mdl-layout__container');
        layout.style.display = 'block';
        layout.style.height = '100%';
    }
    
};
