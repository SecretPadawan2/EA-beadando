function SzinvalasztoApp() {
    const [szin, setSzin] = React.useState('lightblue');

    const valasztottSzinMegjelenitese = (esemeny) => {
        setSzin(esemeny.target.value);
    };

    const randomSzinGenerator = () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        setSzin(randomColor);
    };

    const szinKodMasolasa = () => {
        navigator.clipboard.writeText(szin);
        alert(`A színkód (${szin}) a vágólapra másolva!`);
    };

    return (
        React.createElement('div', null,
            React.createElement('h2', null, 'Színválasztó Alkalmazás'),
            React.createElement('div', { className: 'color-display', style: { backgroundColor: szin } },
                React.createElement('p', null, 'A kiválasztott szín: ', React.createElement('strong', null, szin))
            ),
            React.createElement('label', { htmlFor: 'szinInput' }, 'Válassz egy színt: '),
            React.createElement('input', { type: 'color', id: 'szinInput', value: szin, onChange: valasztottSzinMegjelenitese }),
            React.createElement('button', { onClick: randomSzinGenerator }, 'Random Szín'),
            React.createElement('button', { onClick: szinKodMasolasa }, 'Másol')
        )
    );
}