import { DecisionTree } from "./libraries/decisiontree.js"

function loadSavedModel() {
    fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}


function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)
    let blueKills = document.getElementById('blueKills')
    let redKills = document.getElementById('redKills')
    let blueDeaths = document.getElementById('blueDeaths')
    let redDeaths = document.getElementById('redDeaths')
    let blueAssists = document.getElementById('blueAssists')
    let redAssists = document.getElementById('redAssists')
    let blueDragons = document.getElementById('blueDragons')
    let redDragons = document.getElementById('redDragons')
    let blueHeralds = document.getElementById('blueHeralds')
    let redHeralds = document.getElementById('redHeralds')
    let blueTowersDestroyed = document.getElementById('blueTowersDestroyed')
    let redTowersDestroyed = document.getElementById('redTowersDestroyed')
    let blueAvgLevel = document.getElementById('blueAvgLevel')
    let redAvgLevel = document.getElementById('redAvgLevel')
    let blueTotalMinionsKilled = document.getElementById('blueTotalMinionsKilled')
    let redTotalMinionsKilled = document.getElementById('redTotalMinionsKilled')

    // test om te zien of het werkt
    let game = { blueKills: blueKills, redKills: redKills, 
        blueDeaths: blueDeaths, redDeaths: redDeaths, 
        blueAssists: blueAssists, redAssists: redAssists, 
        blueDragons: blueDragons, redDragons: redDragons, 
        blueHeralds: blueHeralds, redHeralds: redHeralds, 
        blueTowersDestroyed: blueTowersDestroyed, redTowersDestroyed: redTowersDestroyed, 
        blueAvgLevel: blueAvgLevel, redAvgLevel: redAvgLevel,
        blueTotalMinionsKilled: blueTotalMinionsKilled, redTotalMinionsKilled: redTotalMinionsKilled,
    }

        let prediction = decisionTree.predict(game)
        console.log("predicted " + prediction)
        if (prediction === "1") {
        document.getElementById("prediction").innerHTML = "You Win"
        } else if (prediction === "0") {
        document.getElementById("prediction").innerHTML = "You lose"
        }
        
}


loadSavedModel();
