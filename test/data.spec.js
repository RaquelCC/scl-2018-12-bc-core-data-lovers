global.window = window;
global.assert = require("chai").assert;
require('../src/data.js');
require('../src/data/lol/lol.js');
require('./data.spec.js');

describe('championManage.sortData', () => {
  it('championManage.sortData debería ser una función', () => {
    expect(typeof window.championManage.sortData).toBe('function');
  });

  it('Debería devolver el champion "Annie" para championManage.sortData(championData, "key", "ascending")[0]', () => {
    window.assert.deepEqual(window.championManage.sortData(window.championsTest(), "key", "ascending")[0].name, "Annie")
  });

  it('Debería devolver el champion "Bard" para championManage.sortData(championData, "key", "ascending")[133]', () => {
    window.assert.deepEqual(window.championManage.sortData(window.championsTest(), "key", "ascending")[133].name, "Bard")
  });  

  it('Debería devolver el champion "Bard" para championManage.sortData(championData, "key", "descending")[0]', () => {
    window.assert.deepEqual(window.championManage.sortData(window.championsTest(), "key", "descending")[0].name, "Bard")
  });

  it('Debería devolver el champion "Annie" para championManage.sortData(championData, "key", "descending")[133]', () => {
    window.assert.deepEqual(window.championManage.sortData(window.championsTest(), "key", "descending")[133].name, "Annie")
  });

  it('Debería devolver el champion "Aatrox" para championManage.sortData(championData, "name", "ascending")[0]', () => {
    window.assert.deepEqual(window.championManage.sortData(window.championsTest(), "name", "ascending")[0].name, "Aatrox")
  });

  it('Debería devolver el champion "Zyra" para championManage.sortData(championData, "name", "descending")[0]', () => {
    window.assert.deepEqual(window.championManage.sortData(window.championManage.sortData(window.championsTest(), "key", "ascending"), "name", "descending")[0].name, "Zyra")
  });

  
  
});

describe('championManage.filterData', () => {
  it('championManage.filterData debería ser una función', () => {
    expect(typeof window.championManage.filterData).toBe('function');
  });    

  it('Debería devolver a los champions "Aatrox, Ahri, Akali, Alistar, Amumu, Anivia, Annie, Ashe, Aurelion Sol, Azir" para championManage.filterData(championData, ["A"])', () => {
    let champsA = window.championManage.filterData(window.championsTest(), ["A"]);
    window.assert.deepEqual([champsA[0].name, champsA[1].name, champsA[2].name, champsA[3].name, champsA[4].name, champsA[5].name, champsA[6].name, champsA[7].name, champsA[8].name, champsA[9].name], ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "Aurelion Sol", "Azir"])
  });

  it('Debería devolver a los champions "Bard, Blitzcrank, Brand, Braum" para championManage.filterData(championData, ["B"])', () => {
    let champsB = window.championManage.filterData(window.championsTest(), ["B"]);
    window.assert.deepEqual([champsB[0].name, champsB[1].name, champsB[2].name, champsB[3].name], ["Bard", "Blitzcrank", "Brand", "Braum"])
  });

  it('Debería devolver a los champions "Ahri, Akali, Ekko, Evelynn, Fiora, Fizz, Irelia, Jax, Jhin, Kassadin, Katarina, Kayn, Kha\'Zix, LeBlanc, Lee Sin, Malzahar, Master Yi, Nidalee, Nocturne, Pantheon, Riven, Rengar, Shaco, Talon, Teemo, Tristana, Tryndamere, Twitch, Vayne, Vi, Xerath, Xin Zhao, Yasuo, Zed" para championManage.filterData(championData, ["Assassin"])', () => {
    let champsAssa = () => {
      let namesArray = [];
      window.championManage.filterData(window.championsTest(), ["Assassin"]).forEach(champ => {
        namesArray.push(champ.name)
      });
      return namesArray;
    }
    window.assert.deepEqual(champsAssa(),["Ahri", "Akali", "Ekko", "Evelynn", "Fiora", "Fizz", "Irelia", "Jax", "Jhin", "Kassadin", "Katarina", "Kha'Zix", "LeBlanc", "Lee Sin", "Malzahar", "Master Yi", "Nidalee", "Nocturne", "Pantheon", "Rengar","Riven", "Shaco", "Talon", "Teemo", "Tristana", "Tryndamere", "Twitch", "Vayne", "Vi", "Xerath", "Xin Zhao", "Yasuo", "Zed"] )
  });

  // test con 2 filtros
  //arreglar este test para que la función reciba un arreglo en vez de string
  it('Debería devolver a los champions "Ahri, Evelynn, Kassadin, Katarina, LeBlanc, Malzahar, Xerath" para championManage.filterData(championData, ["Assassin", "Mage"])', () => {
    let champsAssa = () => {
      let namesArray = [];
      window.championManage.filterData(window.championsTest(), ["Assassin", "Mage", "Ranged"]).forEach(champ => {
        namesArray.push(champ.name)
      });
      return namesArray;
    }
    window.assert.deepEqual(champsAssa(),["Ahri", "LeBlanc", "Malzahar", "Xerath"])
  });

  it('Debería devolver a los champions "Alistar, Amumu, Blitzcrank" para championManage.filterData(championData, ["MP", "Melee]', () => {
    let champsAssa = () => {
      let namesArray = [];
      window.championManage.filterData(window.championsTest(), ["MP", "Melee"]).forEach(champ => {
        namesArray.push(champ.name)
      });
      return namesArray;
    }
    window.assert.deepEqual([champsAssa()[0], champsAssa()[1], champsAssa()[2]],["Alistar", "Amumu", "Blitzcrank"])

  });

  // test con 3 filtros
  //arreglar este test para que la función reciba un arreglo en vez de string
  it('Debería devolver a los champions "Ahri, LeBlanc, Malzahar, Xerath" para championManage.filterData(championData, ["Assassin", "Mage", "Ranged")]', () => {
    let champsAssa = () => {
      let namesArray = [];
      window.championManage.filterData(window.championsTest(), ["Assassin", "Mage"]).forEach(champ => {
        namesArray.push(champ.name)
      });
      return namesArray;
    }
    window.assert.deepEqual(champsAssa(),["Ahri", "Evelynn", "Kassadin", "Katarina", "LeBlanc", "Malzahar", "Xerath"] )
  });

  it('Debería devolver a los champions "Aatroz, Akali, Dr. Mundo" para championManage.filterData(championData, ["Other"]', () => {
    let champsAssa = () => {
      let namesArray = [];
      window.championManage.filterData(window.championsTest(), ["Other"]).forEach(champ => {
        namesArray.push(champ.name)
      });
      return namesArray;
    }
    window.assert.deepEqual([champsAssa()[0], champsAssa()[1], champsAssa()[2]],["Aatrox", "Akali", "Dr. Mundo"] )
  });
  

it('Debería devolver a los champions "Aatroz, Akali, Dr. Mundo" para championManage.filterData(championData, ["Other"]', () => {
  let champsAssa = () => {
    let namesArray = [];
    window.championManage.filterData(window.championsTest(), ["Other"]).forEach(champ => {
      namesArray.push(champ.name)
    });
    return namesArray;
  }
  window.assert.deepEqual([champsAssa()[0], champsAssa()[1], champsAssa()[2]],["Aatrox", "Akali", "Dr. Mundo"])
  });

  it('Debería devolver a los champions "Alistar, Amumu, Blitzcrank" para championManage.filterData(championData, ["MP", "Melee]', () => {
    let champsAssa = () => {
      let namesArray = [];
      window.championManage.filterData(window.championsTest(), ["MP", "Melee"]).forEach(champ => {
        namesArray.push(champ.name)
      });
      return namesArray;
    }
    window.assert.deepEqual([champsAssa()[0], champsAssa()[1], champsAssa()[2]],["Alistar", "Amumu", "Blitzcrank"])
    });
});  

describe('championManage.averageStats', () => {
  it('championManage.averageStats debería ser una función', () => {
    expect(typeof window.championManage.filterData).toBe('function');
  }); 
  
  it('Debería devolver el promedio de HP de todos los champions al aplicar championManage.averageStats(championData), valor de 550.1820895522388', () => {
    window.assert.deepEqual(window.championManage.averageStats(window.championsTest()).hp, 550.1820895522388)
  });

  // calculo con filtros a la data
  it('Debería devolver el promedio de HP de todos los champions tipo "Mage" al aplicar championManage.averageStats(championManage.filterData(championData), valor de 528.3900000000001)', () => {
    window.assert.deepEqual(window.championManage.averageStats(window.championManage.filterData(window.championsTest(), ["Mage"])).hp, 528.3900000000001)
  });

  // test para la funcion search
  it('Debería devolver al champion "Xerath" al aplicar la funcion window.championManage.searchChamp(championData, "xerath")', () => {
    window.assert.deepEqual(window.championManage.searchChamp(window.championsTest(), "xerath")[0].name, "Xerath")
  });
  
 // test para la funcion search
 it('Debería devolver al champion "Xerath" al aplicar la funcion window.championManage.searchChamp(championData, "xerath")', () => {
   window.assert.deepEqual(window.championManage.searchChamp(window.championsTest(), "xerath")[0].name, "Xerath")
 });

});
