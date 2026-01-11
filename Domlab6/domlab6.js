
const samochody = [
    {
        rok: 1932,
        przebieg: 10000,
        cena_wyjsciowa: 5000,
        cena_koncowa: 7000
    }
];

const kontener = document.getElementById('samochody');
const tabela = document.createElement('table');

// Template literal (`) — pozwala wstawiać zmienne ${}
tabela.innerHTML = ` 
    <thead> 
        <tr> 
            <th>Rok</th>  
            <th>Przebieg</th>
            <th>Cena wyjściowa</th>
            <th>Cena końcowa</th>
        </tr>
    </thead>
    <tbody> 
        <tr>
            <td>${samochody[0].rok}</td> 
            <td>${samochody[0].przebieg}</td> 
            <td>${samochody[0].cena_wyjsciowa}</td> 
            <td>${samochody[0].cena_koncowa}</td>
        </tr>
    </tbody>
`;

kontener.appendChild(tabela);




class Ocena {
    constructor(przedmiot, wartosc) {
        this.przedmiot = przedmiot;
        this.wartosc = wartosc;
    }
}

class Student {
    constructor(imie, nazwisko) {
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.ocenyTab = [];
        this.sredniaOcen = 0;
    }

    // Prywatna metoda do liczenia średniej
    _przeliczSrednia() {
        if (this.ocenyTab.length === 0) {
            this.sredniaOcen = 0;
            return;
        }

        const suma = this.ocenyTab.reduce(
            (acc, ocena) => acc + ocena.wartosc,
            0
        );

        this.sredniaOcen = (suma / this.ocenyTab.length).toFixed(2);
    }


    set oceny(nowaOcena) {
        if (nowaOcena instanceof Ocena) {
            this.ocenyTab.push(nowaOcena);
            this._przeliczSrednia();
        } else {
            console.error("Niepoprawny typ oceny");
        }
    }


    get oceny() {
        if (this.ocenyTab.length === 0) return "Brak ocen.";
        return this.ocenyTab
            .map(o => `${o.przedmiot}: ${o.wartosc}`)
            .join(", ");
    }
}




const student1 = new Student("Anna", "Kowalska");
const student2 = new Student("Marek", "Nowak");

student1.oceny = new Ocena("Matematyka", 5);
student1.oceny = new Ocena("Informatyka", 4);
student2.oceny = new Ocena("Matematyka", 3);
student2.oceny = new Ocena("Informatyka", 2);

const listaStudentow = [student1, student2];



const kontenerStudentow = document.getElementById('samochody');
kontenerStudentow.innerHTML = "";

listaStudentow.forEach(s => {
    const studentDiv = document.createElement('div');
    studentDiv.className = "student-container";

    studentDiv.innerHTML = ` 
        <div class="student-header" 
             style="background: #ccc; cursor: pointer; padding: 10px; border: 1px solid #000;">
            ${s.imie} ${s.nazwisko}
        </div>

        <div class="student-details" 
             style="display: none; padding: 10px; border: 1px solid #ccc;">
            <ul>
                ${s.ocenyTab.map(o => `<li>${o.przedmiot}: ${o.wartosc}</li>`).join("")}
            </ul>
            <p><strong>Średnia: ${s.sredniaOcen}</strong></p>
        </div>
    `;

    const header = studentDiv.querySelector('.student-header');
    const details = studentDiv.querySelector('.student-details');

    header.addEventListener('click', () => {
        details.style.display = details.style.display === "none" ? "block" : "none";
    });

    kontenerStudentow.appendChild(studentDiv);
});
