// fetch local
fetch('data/lol/lol.json')
    .then(data => data.json())
    .then (data => {
    for (let champ in data.data) {
        window.championData.push(data.data[champ]);
        }
        window.ImageMap('img[usemap]'); 
        showChampsData();
    })


// preloader
window.addEventListener("load", () => {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("root").className = "";
})

// inicializador del select materialize
document.addEventListener('DOMContentLoaded', function() {
    window.M.AutoInit();
  });

// funcion que me crea las tarjetidas de cada champ, para version desktop y mobile
function showChamps (data) {
    document.getElementById("champ-container").innerHTML = "";
    document.getElementById("champ-container-mobile").innerHTML = "";
    data.forEach(champ => {
        document.getElementById("champ-container").innerHTML += `
        <div id="${champ.id}" class="card col s3 card-big">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="responsive-img img-champion" src="${champ.splash}">
            </div>
            <div class="card-content">
                <span class="card-title activator">${champ.name}<i class="material-icons right">more_vert</i></span>
                <p class="champ-title">${champ.title}</p>
            </div>
            <div class="card-reveal">
                <span class="card-title">${champ.name}<i class="material-icons right">close</i></span>
                <canvas class="champion-chart"></canvas>
            </div>
        </div>
        `
    })
    data.forEach(champ => {
        document.getElementById("champ-container-mobile").innerHTML += `
        <div id="${champ.id}2" class="col s3 m2 card-small">
            <div class="card mobile-version">
                <div class="card-image">
                    <img src="${champ.img}" class="champ-sprite">
                </div>
                <div class="card-content mobile-version">
                ${champ.name}
                </div>
            </div>
        </div>
        `
    })
    document.getElementById("champ-container").innerHTML += `
    <div id="container-button3" class="col s12 center-align"><br><a href="#header" class="waves-effect waves-light btn" id="button3">Subir</a>
        </div>
    `
}

// HTMLCollection con los canvases y array para guardar los gráficos que van al otro lado de las
// tarjetidas de cada champ
let championGraphsCanvases = document.getElementsByClassName("champion-chart");
let championCharts = [];

// funcion que iniciliza los gráficos que van en las tarjetas de los champs
function initializeCharts (data) {
    championCharts = [];
    for (let i = 0; i<championGraphsCanvases.length; i++) {
        championCharts[i] = new window.Chart(championGraphsCanvases[i], {
            type: 'horizontalBar',
        data: {
            labels: ["Attack", "Defense", "Magic", "Difficulty"],
            datasets: [{
                data: [data[i].info.attack, data[i].info.defense, data[i].info.magic, data[i].info.difficulty],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            legend: {
                display: false
            }
        }
        })
    }
}

// función que le asigna a cada imagen una función que genera la página individual del champion
let championImages = document.getElementsByClassName("img-champion");
let championSprites = document.getElementsByClassName("champ-sprite");

function champIndividualDiv(data, img) {
    window.ImageMap('img[usemap]'); 
    for (let i= 0; i<img.length; i++) {
        img[i].addEventListener("click", () => {
            let champFetch;
            //fetch api...
            fetch("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/"+data[i].id+".json")
                .then(dataFetch => dataFetch.json())
                .then(dataFetch => {
                    champFetch = dataFetch["data"][data[i].id];
                    window.location.href = "#header";
                    document.getElementById("filters").style.display = "none";
                    // document.getElementById("order-and-search").style.display = "none";
                    // document.getElementById("champ-container").style.display = "none";
                    // document.getElementById("champ-container-mobile").style.display = "none";
                    document.getElementById("general-champ-container").style.display = "none";
                    document.getElementById("individual-champs").style.display = "block";
                    document.getElementById("individual-champs").innerHTML = `            
                    <div id="champ-name-title" class="col s12 center-align">
                        <p id="champ-name">${data[i].name}</p>
                        <p id="champ-title">${data[i].title}</p><br><br>
                    </div>
                    <div class="col s12">
                        <img src="${data[i].splash}" alt="${data[i].name}" class="responsive-img">
                        <p><h5 class="center-align">Roles: ${data[i].tags.join(" - ")}</h5></p>
                    </div>
                    <div class="col s12">
                    <h3 class="center">Habilidades</h3>
                    <table class="skills-table">
                        <thead>
                            <tr class="centered">
                               <th><h6>Sprite</h6></th>
                               <th><h6>Name</h6></th>
                               <th><h6>Description</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/passive/${champFetch.passive.image.full}"></td>
                            <td>${champFetch.passive.name}<br>(Passive)</td>
                            <td>${champFetch.passive.description}</td>
                        </tr>
                        <tr>
                            <td><img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${champFetch.spells[0].image.full}"></td>
                            <td>${champFetch.spells[0].name}</td>
                            <td>${champFetch.spells[0].description}</td>
                        </tr>
                        <tr>
                            <td><img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${champFetch.spells[1].image.full}"></td>
                            <td>${champFetch.spells[1].name}</td>
                            <td>${champFetch.spells[1].description}</td>
                        </tr>
                        <tr>
                            <td><img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${champFetch.spells[2].image.full}"></td>
                            <td>${champFetch.spells[2].name}</td>
                            <td>${champFetch.spells[2].description}</td>
                        </tr>
                        <tr>
                            <td><img src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${champFetch.spells[3].image.full}"></td>
                            <td>${champFetch.spells[3].name}</td>
                            <td>${champFetch.spells[3].description}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="col s12 m6">
                        <table class="centered">
                            <thead>
                                <tr>
                                    <th>Stat</th>
                                    <th>Base (a lvl 1)</th>
                                    <th>Growth per lvl</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                <tr>
                                <td>HP</td>
                                <td>${data[i].stats.hp}</td>
                                <td>${data[i].stats.hpperlevel}</td>
                                </tr>
                                <tr>
                                <td>${data[i].partype}</td>
                                <td>${data[i].stats.mp}</td>
                                <td>${data[i].stats.mpperlevel}</td>
                                </tr>
                                <tr>
                                <td>Movement Speed</td>
                                <td>${data[i].stats.movespeed}</td>
                                <td>-</td>
                                </tr>
                                <tr>
                                <td>Armor</td>
                                <td>${data[i].stats.armor}</td>
                                <td>${data[i].stats.armorperlevel}</td>
                                </tr>
                                <tr>
                                <td>Spellblock</td>
                                <td>${data[i].stats.spellblock}</td>
                                <td>${data[i].stats.spellblockperlevel}</td>
                                </tr>
                                <tr>
                                <td>Attack Range</td>
                                <td>${data[i].stats.attackrange}</td>
                                <td>-</td>
                                </tr>
                                <tr>
                                <td>HP Regen</td>
                                <td>${data[i].stats.hpregen}</td>
                                <td>${data[i].stats.hpregenperlevel}</td>
                                </tr>
                                <tr>
                                <td>MP Regen</td>
                                <td>${data[i].stats.mpregen}</td>
                                <td>${data[i].stats.mpregenperlevel}</td>
                                </tr>
                                <tr>
                                <td>Crit</td>
                                <td>${data[i].stats.crit}</td>
                                <td>${data[i].stats.critperlevel}</td>
                                </tr>
                                <tr>
                                <td>Attack Damage</td>
                                <td>${data[i].stats.attackdamage}</td>
                                <td>${data[i].stats.attackdamageperlevel}</td>
                                </tr>
                                <tr>
                                <td>Attack Speed</td>
                                <td>${data[i].stats.attackspeedoffset}</td>
                                <td>${data[i].stats.attackspeedperlevel}</td>
                                </tr>
                            </tbody>
                            </table>                  
                    </div>
                    <div>
                    <div class="col s6 offset-s3" id="compare center-align">
                            <p>Comparar con promedio de:</p>
                            <select id="compare-filters" multiple>
                            <option value="" disabled>Todos los Champions</option>
                            <option value="Assassin">Assassin</option>
                            <option value="Fighter">Fighter</option>
                            <option value="Tank">Tank</option>
                            <option value="Mage">Mage</option>
                            <option value="Marksman">Marksman</option>
                            <option value="Support">Support</option>
                            <option value="Melee">Melee</option>
                            <option value="Ranged">Ranged</option>
                            </select>
                            
                    </div>
                    <div>
                    <div class="col s12" id="compare-chart-container">
                        <canvas id="compare-chart">
                        
                        </canvas>
                    </div>     
                    `;
                    //inicializa select de esta pagina
                    window.M.AutoInit();
                    // función que altera gráfico de comparación en base a los filtros que se apliquen
                    let champChart;
                    document.getElementById("compare-filters").addEventListener("change", () => {
                        let compareFilters = [];
                        for (let i = 0; i<document.getElementById("compare-filters").selectedOptions.length; i++) {
                            compareFilters.push(document.getElementById("compare-filters").selectedOptions[i].value);
                        }
                        let averageChampion = window.championManage.averageStats(window.championManage.filterData(window.championData, compareFilters));
                        champChart.data.datasets[1].data = [averageChampion.hp, averageChampion.hpperlevel, averageChampion.mp, averageChampion.mpperlevel, averageChampion.movespeed, averageChampion.armor, averageChampion.armorperlevel, averageChampion.spellblock, averageChampion.spellblockperlevel, averageChampion.attackrange, averageChampion.hpregen, averageChampion.hpregenperlevel, averageChampion.mp, averageChampion.mpregenperlevel, averageChampion.crit, averageChampion.critperlevel, averageChampion.attackdamage, averageChampion.attackdamageperlevel, averageChampion.attackspeedoffset, averageChampion.attackspeedperlevel];
                        champChart.update();
                        
                    })
                    // función que inicializa chart con gráfico comparativo
                    function initializeCompare(data) {
                        let averageChampion = window.championManage.averageStats(data);
                        let compareCanvas = document.getElementById("compare-chart").getContext('2d');
                        champChart = new window.Chart(compareCanvas, {
                            type: 'bar',
                            data: {
                                labels: ["HP", "HP per lvl", "MP", "MP per lvl", "Movement Speed", "Armor", "Armor per lvl", "Spellblock", "Spellblock per lvl", "Attack Range", "HP Regen", "HP Regen per lvl", "MP Regen", "MP Regen per lvl", "Crit", "Crit per lvl", "Attack Damage", "Attack Damage per lvl", "Attack Speed", "Attack Speed per lvl"],
                                datasets: [{
                                    label: data[i].name,
                                    data: [data[i].stats.hp, data[i].stats.hpperlevel, data[i].stats.mp, data[i].stats.mpperlevel, data[i].stats.movespeed, data[i].stats.armor, data[i].stats.armorperlevel, data[i].stats.spellblock, data[i].stats.spellblockperlevel, data[i].stats.attackrange, data[i].stats.hpregen, data[i].stats.hpregenperlevel, data[i].stats.mp, data[i].stats.mpregenperlevel, data[i].stats.crit, data[i].stats.critperlevel, data[i].stats.attackdamage, data[i].stats.attackdamageperlevel, data[i].stats.attackspeedoffset, data[i].stats.attackspeedperlevel],
                                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Champ Promedio',
                                    data: [averageChampion.hp, averageChampion.hpperlevel, averageChampion.mp, averageChampion.mpperlevel, averageChampion.movespeed, averageChampion.armor, averageChampion.armorperlevel, averageChampion.spellblock, averageChampion.spellblockperlevel, averageChampion.attackrange, averageChampion.hpregen, averageChampion.hpregenperlevel, averageChampion.mp, averageChampion.mpregenperlevel, averageChampion.crit, averageChampion.critperlevel, averageChampion.attackdamage, averageChampion.attackdamageperlevel, averageChampion.attackspeedoffset, averageChampion.attackspeedperlevel],
                                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                                    borderWidth: 1
                                }
                            ],
                                
                            },
                            options: {
                                tooltips: {
                                    intersect: false
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            stepSize: 50
                                        }
                                    }]
                                }
                            }
                        }
            
            
                        )
        
                    }
                    initializeCompare(data);
                })


            
        })
    }

}

function showChampsData() {
    
    showChamps(window.championData);
    initializeCharts(window.championData);
    champIndividualDiv(window.championData, championImages);
    champIndividualDiv(window.championData, championSprites);
}

// funcion de interacción de usuario, cada vez que el usuario clickea un filtro, ordena o busca, se ejecuta esta funcion
// la función revisa todos los parametros que el usuario puede seleccionar y en base a eso muestra los champions
function userInteract () {
    if (document.getElementById("sort").value === ""){
        return;
    }
    let filtersActive = [];
    const filters = document.getElementsByClassName("filter");
    for (let i = 0; i<filters.length; i++) {
        if (filters[i].checked === true) {
            filtersActive.push(filters[i].value);
        }
    }
    let sortBy;
    let sortOrder;
    switch (document.getElementById("sort").value) {
        case "az":
            sortBy = "name";
            sortOrder = "ascending";
            break;
        case "za":
            sortBy = "name";
            sortOrder = "descending";
            break;
        case "oldest":
            sortBy = "key";
            sortOrder = "ascending";
            break;
        case "newest":
            sortBy = "key";
            sortOrder = "descending"
            break;
    }
    // colecciones HTML de las tarjetitas grandes y pequeñas
    let championCardsBig = document.getElementsByClassName("card-big");
    let championCardsSmall = document.getElementsByClassName("card-small");
    // ids de los champs luego de aplicar filtros, orden y busqueda, esto sirve para comparar con las ids de las tarjetas
    // y asi decidir cual mostrar y cual no
    let userChampNames = [];
    (window.championManage.searchChamp(window.championManage.sortData(window.championManage.filterData(window.championData, filtersActive), sortBy,sortOrder), document.getElementById("search-input").value)).forEach(champ => {
        userChampNames.push(champ.id);
    })
    for (let i = 0; i<userChampNames.length; i++) {
        // reordenar tarjetas para el sort
        document.getElementById(userChampNames[i]).style.order = i;
        document.getElementById(userChampNames[i]+"2").style.order = i;
    }
    // display de las tarjetas para el filter y search
    for (let i = 0; i<championCardsBig.length; i++) {
        if (userChampNames.indexOf(championCardsBig[i].id) === -1) {
            championCardsBig[i].style.display = "none";
            championCardsSmall[i].style.display = "none";
        }else if (userChampNames.indexOf(championCardsBig[i].id) !== -1) {
            championCardsBig[i].style.display = "block";
            championCardsSmall[i].style.display = "block";
        }
    }

}

// checkboxes de filtro
document.getElementById("champion-filters").addEventListener("change", userInteract);
// select de sort
document.getElementById("sort").addEventListener("change", userInteract);

// función de la barra de busqueda
document.getElementById("search-input").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        userInteract();
       }
})

// boton "Sobre LOLApp"
document.getElementById("about-lolapp").addEventListener("click", () => {
    document.getElementById("root").style.display = "none";
    document.getElementById("preloader").style.display = "none";
    document.getElementById("flame-section").style.display = "none";
    document.getElementById("about-lolapp-section").style.display = "block";
})

// boton "Flame"
document.getElementById("flame").addEventListener("click", () => {
    document.getElementById("root").style.display = "none";
    document.getElementById("preloader").style.display = "none";
    document.getElementById("about-lolapp-section").style.display = "none";
    document.getElementById("flame-section").style.display = "block";
})

// funcion para los botones de regreso a los champs
function back() {
    // limpia filtros
    let filtersToClear = document.getElementsByClassName("filter");
    for (let i = 0; i<filtersToClear.length; i++) {
        filtersToClear[i].checked = false;
    }
    // para resetear el order
    document.getElementsByTagName("select")[0][1].selected = true;
    window.M.AutoInit(); // sin esto no cambiaba el display del select, solo el valor X_X
    // display reseteado
    userInteract()
    // los divs
    document.getElementById("preloader").style.display = "none";
    document.getElementById("about-lolapp-section").style.display = "none";
    document.getElementById("flame-section").style.display = "none";
    document.getElementById("individual-champs").style.display = "none";
    document.getElementById("filters").style.display = "block";
    document.getElementById("general-champ-container").style.display = "block";
    document.getElementById("root").style.display = "block";
}

// boton "champions"
document.getElementById("champions").addEventListener("click", back);

// botones de volver al inicio
document.getElementById("button1").addEventListener("click", back);
document.getElementById("button2").addEventListener("click", back);



// scl182041
// testeo dom