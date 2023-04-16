import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA
//
const csvFile = "./data/high_diamond_ranked_10min.csv"
const trainingLabel = "blueWins"  
const ignored = ["gameId", "blueWardsPlaced","blueWardsDestroyed", "redWardsPlaced","redWardsDestroyed", "blueFirstBlood","redFirstBlood","blueTotalJungleMinionsKilled", "redTotalJungleMinionsKilled", "blueTotalGold", "blueTotalExperience", "blueEliteMonsters", "blueGoldDiff", "blueExperienceDiff", "blueCSPerMin", "redCSPerMin", "blueGoldPerMin", "redTotalGold", "redTotalExperience", "redEliteMonsters", "redGoldDiff", "redExperienceDiff", "redGoldPerMin"]  
let amountCorrect = 0;
let winsAndWins = 0;
let winsAndLoss = 0;
let lossAndWins = 0;
let lossAndLoss = 0;

//
// laad csv data als json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)//console.log(results.data),   // gebruik deze data om te trainen
    })
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    // todo : splits data in traindata en testdata
    data.sort(() => (Math.random() - 0.5))
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    // maak het algoritme aan
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let json = decisionTree.toJSON()
    let visual = new VegaTree('#view', 2300, 1000, json)
    

    // todo : maak een prediction met een sample uit de testdata

    for (let i = 0; i < testData.length; i++) {
    
        let wins = testData[i]
        // kopie van passenger maken, zonder het label  
        const winsNoLabel = Object.assign({}, wins)
        delete winsNoLabel.blueWins
    
        // prediction
        let prediction = decisionTree.predict(winsNoLabel)
    
        // vergelijk de prediction met het echte label
        if (prediction == wins.blueWins) {
            console.log("Deze voorspelling is goed gegaan!")
            amountCorrect = amountCorrect + 1;
        }
    
        if (prediction == "1" && wins.blueWins == "1") {
            winsAndWins = winsAndWins + 1;
        }   else if (prediction == "1" && wins.blueWins == "0") {
            winsAndLoss = winsAndLoss + 1;
        }   else if (prediction == "0" && wins.blueWins == "0") {
            lossAndLoss = lossAndLoss + 1;
        }   else if (prediction == "0" && wins.blueWins == "1") {
            lossAndWins = lossAndWins + 1;
        }

        

    }

let totalAmount = testData.length;
let accuracy = amountCorrect / totalAmount * 100;
document.getElementById('accuracy').innerHTML = "The accuracy is " + accuracy + "%";

var confusionTable = document.getElementById("confusion");
confusionTable.rows[1].cells[1].textContent = winsAndWins;
confusionTable.rows[1].cells[2].textContent = winsAndLoss;
confusionTable.rows[2].cells[1].textContent = lossAndWins;
confusionTable.rows[2].cells[2].textContent = lossAndLoss;

let jsons = decisionTree.stringify()
    console.log(jsons)

}   


loadData()

