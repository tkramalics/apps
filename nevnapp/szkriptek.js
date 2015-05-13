var telefonkonyv = [];
var forditas;
var forditas_def = false;
var maiNevnap;
var holnapiNevnap;
var maString ="Mai névnaposok:";
var holnapString ="Holnapi névnaposok:";

function addOneItem(pItem, nap, megforditas) {
    var txt = "";
    if (pItem.familyName != null && megforditas == false)
        txt += pItem.familyName + " ";
    if (pItem.givenName != null)
        txt += pItem.givenName;
    if (pItem.familyName != null && megforditas == true)
        txt += " " + pItem.familyName;
    if (txt == "")
        txt = pItem.name;
    var node = document.createElement("li");
    var nodea = document.createElement("a");
    nodea.setAttribute("tel", pItem.id);
    node.appendChild(nodea);
    var nodep = document.createElement("P");
    nodep.innerHTML = txt;
    node.appendChild(nodep);
    document.getElementById(nap).appendChild(node);
}

function initContactsList() {
    var sort = {sortBy: ['familyName', 'firstName'],
        sortOrder: "descending"
    };
    var request = window.navigator.mozContacts.getAll(sort);
    request.onsuccess = function () {
        if (this.result) {

            telefonkonyv.push(this.result);
            Eloszures("ma", this.result, forditas);
            Eloszures("holnap", this.result, forditas);
            this.continue();
        }
    }
    request.onerror = function (err) {
        console.log('Something goes wrong!' + err);
    }
}

function Eloszures(nap, pItem, megforditas)
{
    var txt = "";
    if (pItem.familyName != null && megforditas == true)
    {
        txt = pItem.familyName;
    }
    if (pItem.givenName != null && txt == "")
    {
        txt = pItem.givenName;
    }
    if (nap == "ma")
    {
        for (var i = 0; i < maiNevnap.length; i++) {
            if (txt == maiNevnap[i])
            {
                addOneItem(pItem, nap, megforditas);
            }
        }
    }
    else
    {
        for (var i = 0; i < holnapiNevnap.length; i++) {
            if (txt == holnapiNevnap[i])
            {
                addOneItem(pItem, nap, megforditas);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    kezdes();
});

function ListaTorles()
{
    document.getElementById("ma").innerHTML = "<li>"+maString+"</li>";
    document.getElementById("holnap").innerHTML = "<li>"+holnapString+"</li>";
}
function Telefonkonyv_import()
{
    ListaTorles();
    initContactsList();
}

function telefonkonyv_betoltes()
{
    ListaTorles();
    if (telefonkonyv.length != 0)
    {
        for (var i = 0; i < telefonkonyv.length; i++) {
            Eloszures("ma", telefonkonyv[i], forditas);
            Eloszures("holnap", telefonkonyv[i], forditas);
        }
    }
}

function ToogleForditasGraph()
{
    if (forditas == true)
    {
        document.getElementById("forditas").className = "bekapcsolt";
    }
    if (forditas != true)
    {
        document.getElementById("forditas").className = "kikapcsolt";
    }
}

function ToogleForditas()
{
    forditas = !forditas;
    ToogleForditasGraph();
    SaveSettingsToDB();
    telefonkonyv_betoltes();
}

function kezdes()
{
    Telefonkonyv_import();
    ReadSettingsFromDB();

    document.getElementById("forditas").onclick = function () {
        ToogleForditas();
    };
    document.getElementById("tel_import").onclick = function () {
        Telefonkonyv_import();
    };
    document.getElementById("save_settings").onclick = function () {
        SaveSettingsToDB();
    };

    telefonkonyv_betoltes();
}

function ReadSettingsFromDB()
{
    var tomb = JSON.parse(localStorage.getItem("1.1"));
    if (tomb == null)
    {
        console.log("Névnapok létrehozása");
        NevnapokLetrehozasa();
    }
    var today = new Date();
    var honap = today.getMonth();
    var nap = today.getDate();
    honap += 1;
    var mainap = honap + "." + nap;
    today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    honap = today.getMonth();
    nap = today.getDate();
    honap += 1;
    var holnapinap = honap + "." + nap;
    maiNevnap = JSON.parse(localStorage.getItem(mainap));
    holnapiNevnap = JSON.parse(localStorage.getItem(holnapinap));
    forditas = JSON.parse(localStorage.getItem("forditas"));
    if (forditas == null)
    {
        forditas = forditas_def;
    }

    ToogleForditasGraph();
}

/*function openDB() {
 req = window.indexedDB.open(DB_NAME, DB_VERSION);
 req.onerror = function(evt) {
 console.error("req.onerror:", evt.target.error.message);
 };
 
 req.onupgradeneeded = function(evt) {
 open_result = evt.currentTarget.result;
 console.log("openDb.onupgradeneeded1");
 open_result.createObjectStore(TABLE_BEALLITASOK,{keyPath: "id"});
 };
 
 req.onsuccess = function(evt) {
 open_result = this.result;        
 console.log("succes open db");
 ReadSettingsFromDB();
 };
 
 }*/

function SaveSettingsToDB()
{
    localStorage.setItem("forditas", JSON.stringify(forditas));
}

function getObjectStore(store_name, mode) {
    var tx = open_result.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

function NevnapokLetrehozasa()
{
    localStorage.setItem("1.1", JSON.stringify(["Fruzsina"]));
    localStorage.setItem("1.2", JSON.stringify(["Ábel"]));
    localStorage.setItem("1.3", JSON.stringify(["Benjámin", "Genovéva"]));
    localStorage.setItem("1.4", JSON.stringify(["Leóna", "Titusz"]));
    localStorage.setItem("1.5", JSON.stringify(["Simon"]));
    localStorage.setItem("1.6", JSON.stringify(["Boldizsár"]));
    localStorage.setItem("1.7", JSON.stringify(["Attila", "Ramóna"]));
    localStorage.setItem("1.8", JSON.stringify(["Gyöngyvér"]));
    localStorage.setItem("1.9", JSON.stringify(["Marcell"]));
    localStorage.setItem("1.10", JSON.stringify(["Melánia"]));
    localStorage.setItem("1.11", JSON.stringify(["Ágota"]));
    localStorage.setItem("1.12", JSON.stringify(["Ernõ"]));
    localStorage.setItem("1.13", JSON.stringify(["Veronika"]));
    localStorage.setItem("1.14", JSON.stringify(["Bódog"]));
    localStorage.setItem("1.15", JSON.stringify(["Lóránd", "Lóránt"]));
    localStorage.setItem("1.16", JSON.stringify(["Gusztáv"]));
    localStorage.setItem("1.17", JSON.stringify(["Antal", "Antónia"]));
    localStorage.setItem("1.18", JSON.stringify(["Piroska"]));
    localStorage.setItem("1.19", JSON.stringify(["Márió", "Sára"]));
    localStorage.setItem("1.20", JSON.stringify(["Fábián", "Sebestyén"]));
    localStorage.setItem("1.21", JSON.stringify(["Ágnes"]));
    localStorage.setItem("1.22", JSON.stringify(["Artúr", "Vince"]));
    localStorage.setItem("1.23", JSON.stringify(["Rajmund", "Zelma"]));
    localStorage.setItem("1.24", JSON.stringify(["Timót"]));
    localStorage.setItem("1.25", JSON.stringify(["Pál"]));
    localStorage.setItem("1.26", JSON.stringify(["Paula", "Vanda"]));
    localStorage.setItem("1.27", JSON.stringify(["Angelika"]));
    localStorage.setItem("1.28", JSON.stringify(["Karola", "Károly"]));
    localStorage.setItem("1.29", JSON.stringify(["Adél"]));
    localStorage.setItem("1.30", JSON.stringify(["Martina"]));
    localStorage.setItem("1.31", JSON.stringify(["Gerda", "Marcella"]));
    localStorage.setItem("2.1", JSON.stringify(["Ignác"]));
    localStorage.setItem("2.2", JSON.stringify(["Aida", "Karolina"]));
    localStorage.setItem("2.3", JSON.stringify(["Balázs"]));
    localStorage.setItem("2.4", JSON.stringify(["Csenge", "Ráhel"]));
    localStorage.setItem("2.5", JSON.stringify(["Ágota", "Ingrid"]));
    localStorage.setItem("2.6", JSON.stringify(["Dóra", "Dorottya"]));
    localStorage.setItem("2.7", JSON.stringify(["Rómeó", "Tódor"]));
    localStorage.setItem("2.8", JSON.stringify(["Aranka"]));
    localStorage.setItem("2.9", JSON.stringify(["Abigél", "Alex"]));
    localStorage.setItem("2.10", JSON.stringify(["Elvira"]));
    localStorage.setItem("2.11", JSON.stringify(["Bertold", "Marietta"]));
    localStorage.setItem("2.12", JSON.stringify(["Lídia", "Lívia"]));
    localStorage.setItem("2.13", JSON.stringify(["Ella", "Linda"]));
    localStorage.setItem("2.14", JSON.stringify(["Bálint", "Valentin"]));
    localStorage.setItem("2.15", JSON.stringify(["Georgina", "Kolos"]));
    localStorage.setItem("2.16", JSON.stringify(["Julianna", "Lilla"]));
    localStorage.setItem("2.17", JSON.stringify(["Donát"]));
    localStorage.setItem("2.18", JSON.stringify(["Bernadett"]));
    localStorage.setItem("2.19", JSON.stringify(["Zsuzsanna"]));
    localStorage.setItem("2.20", JSON.stringify(["Aladár", "Álmos"]));
    localStorage.setItem("2.21", JSON.stringify(["Eleonóra"]));
    localStorage.setItem("2.22", JSON.stringify(["Gerzson"]));
    localStorage.setItem("2.23", JSON.stringify(["Alfréd"]));
    localStorage.setItem("2.24", JSON.stringify(["Mátyás"]));
    localStorage.setItem("2.25", JSON.stringify(["Géza"]));
    localStorage.setItem("2.26", JSON.stringify(["Edina"]));
    localStorage.setItem("2.27", JSON.stringify(["Ákos", "Bátor"]));
    localStorage.setItem("2.28", JSON.stringify(["Elemér"]));
    localStorage.setItem("3.1", JSON.stringify(["Albin"]));
    localStorage.setItem("3.2", JSON.stringify(["Lujza"]));
    localStorage.setItem("3.3", JSON.stringify(["Kornélia"]));
    localStorage.setItem("3.4", JSON.stringify(["Kázmér"]));
    localStorage.setItem("3.5", JSON.stringify(["Adorján", "Adrián"]));
    localStorage.setItem("3.6", JSON.stringify(["Inez", "Leonóra"]));
    localStorage.setItem("3.7", JSON.stringify(["Tamás"]));
    localStorage.setItem("3.8", JSON.stringify(["Zoltán"]));
    localStorage.setItem("3.9", JSON.stringify(["Fanni", "Franciska"]));
    localStorage.setItem("3.10", JSON.stringify(["Ildikó"]));
    localStorage.setItem("3.11", JSON.stringify(["Szilárd"]));
    localStorage.setItem("3.12", JSON.stringify(["Gergely"]));
    localStorage.setItem("3.13", JSON.stringify(["Ajtony", "Krisztián"]));
    localStorage.setItem("3.14", JSON.stringify(["Matild"]));
    localStorage.setItem("3.15", JSON.stringify(["Kristóf"]));
    localStorage.setItem("3.16", JSON.stringify(["Henrietta"]));
    localStorage.setItem("3.17", JSON.stringify(["Gertrúd", "Patrik"]));
    localStorage.setItem("3.18", JSON.stringify(["Ede", "Sándor"]));
    localStorage.setItem("3.19", JSON.stringify(["Bánk", "József"]));
    localStorage.setItem("3.20", JSON.stringify(["Klaudia"]));
    localStorage.setItem("3.21", JSON.stringify(["Benedek"]));
    localStorage.setItem("3.22", JSON.stringify(["Beáta", "Izolda"]));
    localStorage.setItem("3.23", JSON.stringify(["Emõke"]));
    localStorage.setItem("3.24", JSON.stringify(["Gábor", "Karina"]));
    localStorage.setItem("3.25", JSON.stringify(["Irén", "Írisz"]));
    localStorage.setItem("3.26", JSON.stringify(["Emánuel"]));
    localStorage.setItem("3.27", JSON.stringify(["Hajnalka"]));
    localStorage.setItem("3.28", JSON.stringify(["Gedeon", "Johanna"]));
    localStorage.setItem("3.29", JSON.stringify(["Auguszta"]));
    localStorage.setItem("3.30", JSON.stringify(["Zalán"]));
    localStorage.setItem("3.31", JSON.stringify(["Árpád"]));
    localStorage.setItem("4.1", JSON.stringify(["Hugó"]));
    localStorage.setItem("4.2", JSON.stringify(["Áron"]));
    localStorage.setItem("4.3", JSON.stringify(["Buda", "Richárd"]));
    localStorage.setItem("4.4", JSON.stringify(["Izidor"]));
    localStorage.setItem("4.5", JSON.stringify(["Vince"]));
    localStorage.setItem("4.6", JSON.stringify(["Bíborka", "Vilmos"]));
    localStorage.setItem("4.7", JSON.stringify(["Herman"]));
    localStorage.setItem("4.8", JSON.stringify(["Dénes"]));
    localStorage.setItem("4.9", JSON.stringify(["Erhard"]));
    localStorage.setItem("4.10", JSON.stringify(["Zsolt"]));
    localStorage.setItem("4.11", JSON.stringify(["Leó", "Szaniszló"]));
    localStorage.setItem("4.12", JSON.stringify(["Gyula"]));
    localStorage.setItem("4.13", JSON.stringify(["Ida"]));
    localStorage.setItem("4.14", JSON.stringify(["Tibor"]));
    localStorage.setItem("4.15", JSON.stringify(["Anasztázia", "Tas"]));
    localStorage.setItem("4.16", JSON.stringify(["Csongor"]));
    localStorage.setItem("4.17", JSON.stringify(["Rudolf"]));
    localStorage.setItem("4.18", JSON.stringify(["Andrea", "Ilma"]));
    localStorage.setItem("4.19", JSON.stringify(["Emma"]));
    localStorage.setItem("4.20", JSON.stringify(["Tivadar"]));
    localStorage.setItem("4.21", JSON.stringify(["Konrád"]));
    localStorage.setItem("4.22", JSON.stringify(["Csilla", "Noémi"]));
    localStorage.setItem("4.23", JSON.stringify(["Béla"]));
    localStorage.setItem("4.24", JSON.stringify(["György"]));
    localStorage.setItem("4.25", JSON.stringify(["Márk"]));
    localStorage.setItem("4.26", JSON.stringify(["Ervin"]));
    localStorage.setItem("4.27", JSON.stringify(["Zita"]));
    localStorage.setItem("4.28", JSON.stringify(["Valéria"]));
    localStorage.setItem("4.29", JSON.stringify(["Péter"]));
    localStorage.setItem("4.30", JSON.stringify(["Katalin", "Kitti"]));
    localStorage.setItem("5.1", JSON.stringify(["Fülöp", "Jakab"]));
    localStorage.setItem("5.2", JSON.stringify(["Zsigmond"]));
    localStorage.setItem("5.3", JSON.stringify(["Irma", "Tímea"]));
    localStorage.setItem("5.4", JSON.stringify(["Flórián", "Mónika"]));
    localStorage.setItem("5.5", JSON.stringify(["Adrián", "Györgyi"]));
    localStorage.setItem("5.6", JSON.stringify(["Frida", "Ivett"]));
    localStorage.setItem("5.7", JSON.stringify(["Gizella"]));
    localStorage.setItem("5.8", JSON.stringify(["Mihály"]));
    localStorage.setItem("5.9", JSON.stringify(["Gergely"]));
    localStorage.setItem("5.10", JSON.stringify(["Ármin", "Pálma", "Mira"]));
    localStorage.setItem("5.11", JSON.stringify(["Ferenc"]));
    localStorage.setItem("5.12", JSON.stringify(["Pongrác"]));
    localStorage.setItem("5.13", JSON.stringify(["Imola", "Szervác"]));
    localStorage.setItem("5.14", JSON.stringify(["Bonifác"]));
    localStorage.setItem("5.15", JSON.stringify(["Szonja", "Zsófia"]));
    localStorage.setItem("5.16", JSON.stringify(["Botond", "Mózes"]));
    localStorage.setItem("5.17", JSON.stringify(["Paszkál"]));
    localStorage.setItem("5.18", JSON.stringify(["Alexandra", "Erik"]));
    localStorage.setItem("5.19", JSON.stringify(["Ivó", "Milán"]));
    localStorage.setItem("5.20", JSON.stringify(["Bernát", "Felícia"]));
    localStorage.setItem("5.21", JSON.stringify(["Konstantin"]));
    localStorage.setItem("5.22", JSON.stringify(["Júlia", "Rita"]));
    localStorage.setItem("5.23", JSON.stringify(["Dezsõ"]));
    localStorage.setItem("5.24", JSON.stringify(["Eliza", "Eszter"]));
    localStorage.setItem("5.25", JSON.stringify(["Orbán"]));
    localStorage.setItem("5.26", JSON.stringify(["Evelin", "Fülöp"]));
    localStorage.setItem("5.27", JSON.stringify(["Hella"]));
    localStorage.setItem("5.28", JSON.stringify(["Csanád", "Emil"]));
    localStorage.setItem("5.29", JSON.stringify(["Magdolna"]));
    localStorage.setItem("5.30", JSON.stringify(["Janka", "Zsanett"]));
    localStorage.setItem("5.31", JSON.stringify(["Angéla"]));
    localStorage.setItem("6.1", JSON.stringify(["Tünde"]));
    localStorage.setItem("6.2", JSON.stringify(["Anita", "Kármen"]));
    localStorage.setItem("6.3", JSON.stringify(["Klotild"]));
    localStorage.setItem("6.4", JSON.stringify(["Bulcsú"]));
    localStorage.setItem("6.5", JSON.stringify(["Fatime"]));
    localStorage.setItem("6.6", JSON.stringify(["Cintia", "Norbert"]));
    localStorage.setItem("6.7", JSON.stringify(["Róbert"]));
    localStorage.setItem("6.8", JSON.stringify(["Medárd"]));
    localStorage.setItem("6.9", JSON.stringify(["Félix"]));
    localStorage.setItem("6.10", JSON.stringify(["Gréta", "Margit"]));
    localStorage.setItem("6.11", JSON.stringify(["Barnabás"]));
    localStorage.setItem("6.12", JSON.stringify(["Villõ"]));
    localStorage.setItem("6.13", JSON.stringify(["Anett", "Antal"]));
    localStorage.setItem("6.14", JSON.stringify(["Vazul"]));
    localStorage.setItem("6.15", JSON.stringify(["Jolán", "Vid"]));
    localStorage.setItem("6.16", JSON.stringify(["Jusztin"]));
    localStorage.setItem("6.17", JSON.stringify(["Alida", "Laura"]));
    localStorage.setItem("6.18", JSON.stringify(["Arnold", "Levente"]));
    localStorage.setItem("6.19", JSON.stringify(["Gyárfás"]));
    localStorage.setItem("6.20", JSON.stringify(["Rafael"]));
    localStorage.setItem("6.21", JSON.stringify(["Alajos", "Leila"]));
    localStorage.setItem("6.22", JSON.stringify(["Paulina"]));
    localStorage.setItem("6.23", JSON.stringify(["Zoltán"]));
    localStorage.setItem("6.24", JSON.stringify(["Iván"]));
    localStorage.setItem("6.25", JSON.stringify(["Vilmos"]));
    localStorage.setItem("6.26", JSON.stringify(["János", "Pál"]));
    localStorage.setItem("6.27", JSON.stringify(["László"]));
    localStorage.setItem("6.28", JSON.stringify(["Irén", "Levente"]));
    localStorage.setItem("6.29", JSON.stringify(["Péter", "Pál"]));
    localStorage.setItem("6.30", JSON.stringify(["Pál"]));
    localStorage.setItem("7.1", JSON.stringify(["Annamária", "Tihamér"]));
    localStorage.setItem("7.2", JSON.stringify(["Ottó"]));
    localStorage.setItem("7.3", JSON.stringify(["Kornél", "Soma"]));
    localStorage.setItem("7.4", JSON.stringify(["Ulrik"]));
    localStorage.setItem("7.5", JSON.stringify(["Emese", "Sarolta"]));
    localStorage.setItem("7.6", JSON.stringify(["Csaba"]));
    localStorage.setItem("7.7", JSON.stringify(["Apollónia"]));
    localStorage.setItem("7.8", JSON.stringify(["Ellák"]));
    localStorage.setItem("7.9", JSON.stringify(["Lukrécia"]));
    localStorage.setItem("7.10", JSON.stringify(["Amália"]));
    localStorage.setItem("7.11", JSON.stringify(["Lili", "Nóra"]));
    localStorage.setItem("7.12", JSON.stringify(["Dalma", "Izabella"]));
    localStorage.setItem("7.13", JSON.stringify(["Jenõ"]));
    localStorage.setItem("7.14", JSON.stringify(["Örs", "Stella"]));
    localStorage.setItem("7.15", JSON.stringify(["Henrik", "Roland"]));
    localStorage.setItem("7.16", JSON.stringify(["Valter"]));
    localStorage.setItem("7.17", JSON.stringify(["Elek", "Endre"]));
    localStorage.setItem("7.18", JSON.stringify(["Frigyes"]));
    localStorage.setItem("7.19", JSON.stringify(["Emília"]));
    localStorage.setItem("7.20", JSON.stringify(["Illés"]));
    localStorage.setItem("7.21", JSON.stringify(["Dániel", "Daniella"]));
    localStorage.setItem("7.22", JSON.stringify(["Magdolna"]));
    localStorage.setItem("7.23", JSON.stringify(["Lenke"]));
    localStorage.setItem("7.24", JSON.stringify(["Kincsõ", "Kinga"]));
    localStorage.setItem("7.25", JSON.stringify(["Jakab", "Kristóf"]));
    localStorage.setItem("7.26", JSON.stringify(["Anikó", "Anna"]));
    localStorage.setItem("7.27", JSON.stringify(["Liliána", "Olga"]));
    localStorage.setItem("7.28", JSON.stringify(["Szabolcs"]));
    localStorage.setItem("7.29", JSON.stringify(["Flóra", "Márta"]));
    localStorage.setItem("7.30", JSON.stringify(["Judit", "Xénia"]));
    localStorage.setItem("7.31", JSON.stringify(["Oszkár"]));
    localStorage.setItem("8.1", JSON.stringify(["Boglárka"]));
    localStorage.setItem("8.2", JSON.stringify(["Lehel"]));
    localStorage.setItem("8.3", JSON.stringify(["Hermina"]));
    localStorage.setItem("8.4", JSON.stringify(["Dominika", "Domonkos"]));
    localStorage.setItem("8.5", JSON.stringify(["Krisztina"]));
    localStorage.setItem("8.6", JSON.stringify(["Berta", "Bettina"]));
    localStorage.setItem("8.7", JSON.stringify(["Ibolya"]));
    localStorage.setItem("8.8", JSON.stringify(["László"]));
    localStorage.setItem("8.9", JSON.stringify(["Emõd"]));
    localStorage.setItem("8.10", JSON.stringify(["Lõrinc"]));
    localStorage.setItem("8.11", JSON.stringify(["Tiborc", "Zsuzsanna"]));
    localStorage.setItem("8.12", JSON.stringify(["Klára"]));
    localStorage.setItem("8.13", JSON.stringify(["Ipoly"]));
    localStorage.setItem("8.14", JSON.stringify(["Marcell"]));
    localStorage.setItem("8.15", JSON.stringify(["Mária"]));
    localStorage.setItem("8.16", JSON.stringify(["Ábrahám"]));
    localStorage.setItem("8.17", JSON.stringify(["Jácint"]));
    localStorage.setItem("8.18", JSON.stringify(["Ilona"]));
    localStorage.setItem("8.19", JSON.stringify(["Huba"]));
    localStorage.setItem("8.20", JSON.stringify(["István"]));
    localStorage.setItem("8.21", JSON.stringify(["Hajna", "Sámuel"]));
    localStorage.setItem("8.22", JSON.stringify(["Menyhért", "Mirjam"]));
    localStorage.setItem("8.23", JSON.stringify(["Bence"]));
    localStorage.setItem("8.24", JSON.stringify(["Bertalan"]));
    localStorage.setItem("8.25", JSON.stringify(["Lajos", "Patrícia"]));
    localStorage.setItem("8.26", JSON.stringify(["Izsó"]));
    localStorage.setItem("8.27", JSON.stringify(["Gáspár"]));
    localStorage.setItem("8.28", JSON.stringify(["Ágoston"]));
    localStorage.setItem("8.29", JSON.stringify(["Beatrix", "Erna"]));
    localStorage.setItem("8.30", JSON.stringify(["Rózsa"]));
    localStorage.setItem("8.31", JSON.stringify(["Bella", "Erika"]));
    localStorage.setItem("9.1", JSON.stringify(["Egon", "Egyed"]));
    localStorage.setItem("9.2", JSON.stringify(["Dorina", "Rebeka"]));
    localStorage.setItem("9.3", JSON.stringify(["Hilda"]));
    localStorage.setItem("9.4", JSON.stringify(["Rozália"]));
    localStorage.setItem("9.5", JSON.stringify(["Lõrinc", "Viktor"]));
    localStorage.setItem("9.6", JSON.stringify(["Zakariás"]));
    localStorage.setItem("9.7", JSON.stringify(["Regina"]));
    localStorage.setItem("9.8", JSON.stringify(["Adrienn", "Mária"]));
    localStorage.setItem("9.9", JSON.stringify(["Adám"]));
    localStorage.setItem("9.10", JSON.stringify(["Hunor", "Nikolett"]));
    localStorage.setItem("9.11", JSON.stringify(["Teodóra"]));
    localStorage.setItem("9.12", JSON.stringify(["Mária"]));
    localStorage.setItem("9.13", JSON.stringify(["Kornél"]));
    localStorage.setItem("9.14", JSON.stringify(["Roxána", "Szeréna"]));
    localStorage.setItem("9.15", JSON.stringify(["Enikõ", "Melitta"]));
    localStorage.setItem("9.16", JSON.stringify(["Edit"]));
    localStorage.setItem("9.17", JSON.stringify(["Zsófia"]));
    localStorage.setItem("9.18", JSON.stringify(["Diána"]));
    localStorage.setItem("9.19", JSON.stringify(["Vilhelmina"]));
    localStorage.setItem("9.20", JSON.stringify(["Friderika"]));
    localStorage.setItem("9.21", JSON.stringify(["Máté", "Mirella"]));
    localStorage.setItem("9.22", JSON.stringify(["Móric"]));
    localStorage.setItem("9.23", JSON.stringify(["Tekla"]));
    localStorage.setItem("9.24", JSON.stringify(["Gellért", "Mercédesz"]));
    localStorage.setItem("9.25", JSON.stringify(["Eufrozina", "Kende"]));
    localStorage.setItem("9.26", JSON.stringify(["Jusztina", "Pál"]));
    localStorage.setItem("9.27", JSON.stringify(["Adalbert"]));
    localStorage.setItem("9.28", JSON.stringify(["Vencel"]));
    localStorage.setItem("9.29", JSON.stringify(["Mihály"]));
    localStorage.setItem("9.30", JSON.stringify(["Jeromos"]));
    localStorage.setItem("10.1", JSON.stringify(["Malvin"]));
    localStorage.setItem("10.2", JSON.stringify(["Petra"]));
    localStorage.setItem("10.3", JSON.stringify(["Helga"]));
    localStorage.setItem("10.4", JSON.stringify(["Ferenc"]));
    localStorage.setItem("10.5", JSON.stringify(["Aurél"]));
    localStorage.setItem("10.6", JSON.stringify(["Brúnó", "Renáta"]));
    localStorage.setItem("10.7", JSON.stringify(["Amália"]));
    localStorage.setItem("10.8", JSON.stringify(["Koppány"]));
    localStorage.setItem("10.9", JSON.stringify(["Dénes"]));
    localStorage.setItem("10.10", JSON.stringify(["Gedeon"]));
    localStorage.setItem("10.11", JSON.stringify(["Brigitta"]));
    localStorage.setItem("10.12", JSON.stringify(["Miksa"]));
    localStorage.setItem("10.13", JSON.stringify(["Ede", "Kálmán"]));
    localStorage.setItem("10.14", JSON.stringify(["Helén"]));
    localStorage.setItem("10.15", JSON.stringify(["Teréz"]));
    localStorage.setItem("10.16", JSON.stringify(["Gál"]));
    localStorage.setItem("10.17", JSON.stringify(["Hedvig"]));
    localStorage.setItem("10.18", JSON.stringify(["Lukács"]));
    localStorage.setItem("10.19", JSON.stringify(["Nándor"]));
    localStorage.setItem("10.20", JSON.stringify(["Vendel"]));
    localStorage.setItem("10.21", JSON.stringify(["Orsolya"]));
    localStorage.setItem("10.22", JSON.stringify(["Elõd"]));
    localStorage.setItem("10.23", JSON.stringify(["Gyöngyi"]));
    localStorage.setItem("10.24", JSON.stringify(["Salamon"]));
    localStorage.setItem("10.25", JSON.stringify(["Bianka", "Blanka"]));
    localStorage.setItem("10.26", JSON.stringify(["Dömötör"]));
    localStorage.setItem("10.27", JSON.stringify(["Szabina"]));
    localStorage.setItem("10.28", JSON.stringify(["Simon", "Szimonetta"]));
    localStorage.setItem("10.29", JSON.stringify(["Nárcisz"]));
    localStorage.setItem("10.30", JSON.stringify(["Alfonz"]));
    localStorage.setItem("10.31", JSON.stringify(["Farkas"]));
    localStorage.setItem("11.1", JSON.stringify(["Marianna"]));
    localStorage.setItem("11.2", JSON.stringify(["Achilles"]));
    localStorage.setItem("11.3", JSON.stringify(["Gyõzõ"]));
    localStorage.setItem("11.4", JSON.stringify(["Károly"]));
    localStorage.setItem("11.5", JSON.stringify(["Imre"]));
    localStorage.setItem("11.6", JSON.stringify(["Lénárd"]));
    localStorage.setItem("11.7", JSON.stringify(["Rezsõ"]));
    localStorage.setItem("11.8", JSON.stringify(["Zsombor"]));
    localStorage.setItem("11.9", JSON.stringify(["Tivadar"]));
    localStorage.setItem("11.10", JSON.stringify(["Réka"]));
    localStorage.setItem("11.11", JSON.stringify(["Márton"]));
    localStorage.setItem("11.12", JSON.stringify(["Jónás", "Renátó"]));
    localStorage.setItem("11.13", JSON.stringify(["Szilvia"]));
    localStorage.setItem("11.14", JSON.stringify(["Aliz"]));
    localStorage.setItem("11.15", JSON.stringify(["Albert", "Lipót"]));
    localStorage.setItem("11.16", JSON.stringify(["Ödön"]));
    localStorage.setItem("11.17", JSON.stringify(["Gergõ", "Hortenzia"]));
    localStorage.setItem("11.18", JSON.stringify(["Jenõ"]));
    localStorage.setItem("11.19", JSON.stringify(["Erzsébet"]));
    localStorage.setItem("11.20", JSON.stringify(["Jolán"]));
    localStorage.setItem("11.21", JSON.stringify(["Olivér"]));
    localStorage.setItem("11.22", JSON.stringify(["Cecília"]));
    localStorage.setItem("11.23", JSON.stringify(["Kelemen", "Klementina"]));
    localStorage.setItem("11.24", JSON.stringify(["Emma"]));
    localStorage.setItem("11.25", JSON.stringify(["Katalin"]));
    localStorage.setItem("11.26", JSON.stringify(["Virág"]));
    localStorage.setItem("11.27", JSON.stringify(["Virgil"]));
    localStorage.setItem("11.28", JSON.stringify(["Stefánia"]));
    localStorage.setItem("11.29", JSON.stringify(["Taksony"]));
    localStorage.setItem("11.30", JSON.stringify(["Andor", "András"]));
    localStorage.setItem("12.1", JSON.stringify(["Elza"]));
    localStorage.setItem("12.2", JSON.stringify(["Melinda", "Vivien"]));
    localStorage.setItem("12.3", JSON.stringify(["Ferenc", "Olívia"]));
    localStorage.setItem("12.4", JSON.stringify(["Barbara", "Borbála"]));
    localStorage.setItem("12.5", JSON.stringify(["Vilma"]));
    localStorage.setItem("12.6", JSON.stringify(["Miklós"]));
    localStorage.setItem("12.7", JSON.stringify(["Ambrus"]));
    localStorage.setItem("12.8", JSON.stringify(["Mária"]));
    localStorage.setItem("12.9", JSON.stringify(["Natália"]));
    localStorage.setItem("12.10", JSON.stringify(["Judit"]));
    localStorage.setItem("12.11", JSON.stringify(["Árpád"]));
    localStorage.setItem("12.12", JSON.stringify(["Gabriella"]));
    localStorage.setItem("12.13", JSON.stringify(["Luca", "Otília"]));
    localStorage.setItem("12.14", JSON.stringify(["Szilárda"]));
    localStorage.setItem("12.15", JSON.stringify(["Valér"]));
    localStorage.setItem("12.16", JSON.stringify(["Aletta", "Etelka"]));
    localStorage.setItem("12.17", JSON.stringify(["Lázár", "Olimpia"]));
    localStorage.setItem("12.18", JSON.stringify(["Auguszta"]));
    localStorage.setItem("12.19", JSON.stringify(["Viola"]));
    localStorage.setItem("12.20", JSON.stringify(["Teofil"]));
    localStorage.setItem("12.21", JSON.stringify(["Tamás"]));
    localStorage.setItem("12.22", JSON.stringify(["Zénó"]));
    localStorage.setItem("12.23", JSON.stringify(["Viktória"]));
    localStorage.setItem("12.24", JSON.stringify(["Adám", "Éva"]));
    localStorage.setItem("12.25", JSON.stringify(["Eugénia"]));
    localStorage.setItem("12.26", JSON.stringify(["István"]));
    localStorage.setItem("12.27", JSON.stringify(["János"]));
    localStorage.setItem("12.28", JSON.stringify(["Kamilla"]));
    localStorage.setItem("12.29", JSON.stringify(["Tamara", "Tamás"]));
    localStorage.setItem("12.30", JSON.stringify(["Dávid"]));
    localStorage.setItem("12.31", JSON.stringify(["Szilveszter"]));

}