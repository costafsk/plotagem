document.addEventListener('DOMContentLoaded', function() {
    'http://dados.fee.tche.br/ckan-download/fee-1999-mun-taxa-de-reprovacao-estadual-102566.csv';
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
        console.table(dates);
    }
});


