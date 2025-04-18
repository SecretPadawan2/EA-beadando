function SzamlaloApp() {
    const [szamlalo, setSzamlalo] = React.useState(0);

    const novelSzamlalo = () => {
        setSzamlalo(szamlalo + 1);
    };

    const csokkentSzamlalo = () => {
        setSzamlalo(szamlalo - 1);
    };

    const randomSzamGenerator = () => {
        const min = -1000;
        const max = 5000;
        const randomSzam = Math.floor(Math.random() * (max - min + 1)) + min;
        setSzamlalo(randomSzam);
    };

    return (
        React.createElement('div', null,
            React.createElement('h2', null, 'Számláló Alkalmazás'),
            React.createElement('p', null, 'Aktuális érték: ', React.createElement('strong', null, szamlalo)),
            React.createElement('button', { onClick: novelSzamlalo }, 'Növel'),
            React.createElement('button', { onClick: csokkentSzamlalo }, 'Csökkent'),
            React.createElement('button', { onClick: randomSzamGenerator }, 'Random Szám')
        )
    );
}