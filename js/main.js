import {addCity} from './config.module.js';

document.addEventListener('DOMContentLoaded', init());

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
        for (let i=2; i<rows.length -1; i++) {
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
        options(dates);
    }
    
    const select = document.querySelector('#city');
    function options(dates) {
        for (let i=0; i<dates.length; i++) {
            const newOption = document.createElement('option');
            newOption.textContent = dates[i].municipio;
            newOption.value = newOption.textContent;
            select.appendChild(newOption);  
        }
    }
    
    const button = document.querySelector('.mdl-button');
    
    button.addEventListener('click', function(event) {
        event.preventDefault();
        addCity();
    });
};
