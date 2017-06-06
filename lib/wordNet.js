var express = require ('express');
var util = require ('util');
var wordNetM = require( 'wordnet-magic');
var wn = wordNetM(null, false );
var inputArray = ["hair", "face", "image"];
var emptyArray1 = [];
var emptyArray2 = [];
var emptyArray3 = [];
var hypernymAmount;
hypernymAmount = [];
module.exports =
    {
        configureNodeFromLabel : configureNodeFromLabel,
        configureNodeFromSynset : configureNodeFromSynset,
        configureUpperNodes :configureUpperNodes,
        configureUpperNodeIDs: configureUpperNodeIDs,
        func1 : function()
        {
            console.log("hello");
        }
    }


function configureNodeFromLabel(inputArray)
{
    return new Promise(function (resolve)
    {
        var wordsArray = inputArray.map(function (item)
        {
            return newWord1 = new wn.Word(item, 'n');;
        });
        wordsArray[0].getSynsets().then(function(Synsets)
        {
            chosenSynset = Synsets[0];
            configureNodeFromSynset(chosenSynset)
                .then(function(result)
                {
                    //result:[lemmas,inputSynset, hyponyms, hypernymsTree[0], synsetID, hypernymsIDArray]
                    resolve(result);
                })
        })
    });
}

function configureUpperNodeIDs(inputArray)
{
    var emptyArrayA = [];
    return new Promise(function (resolve)
    {
        var wordsArray = inputArray.map(function (item)
        {
            return newWord1 = new wn.Word(item, 'n');;
        });
        wordsArray[0].getSynsets().then(function(Synsets)
        {
            chosenSynset = Synsets[0]
            //push ID of chosenSynset into Array at first place
            //emptyArrayA.push(chosenSynset.synsetid); --> no sense, no IDS
            chosenSynset.getHypernymsTree().then(function(hypernymsTree)
            {
                //console.log(hypernymsTree[0]);
                //push all Hypernyms of chosensynset into empyAeeayA, which has only one element
                var hypernymArray = configureUpperNodes(hypernymsTree[0], emptyArrayA);
                //console.log(hypernymArray);
                var hypernymIDArray = hypernymArray.map(function(hypernym)
                {
                    return hypernym.synsetid;
                })
                //console.log(hypernymIDArray);

                resolve(hypernymIDArray);
            });

        })
    });
}
//not forget to resolve!



function configureNodeFromSynset(inputSynset)
{
    return new Promise(function(resolve)
        {
            var lemmas = inputSynset.words;
            var synsetID = inputSynset.synsetid;
            var hyponymsIDArray = [];
            inputSynset.getHypernymsTree().then(function(hypernymsTree)
            {
                //get synsetIDs of all hyponyms
                var hypernymID;
                if(hypernymsTree[0] === undefined)
                {
                    hypernymID = null;
                    hypernymsTree[0] = null;
                    //should codeWord be stored in those?
                }
                else
                {
                    hypernymID = hypernymsTree[0].synsetid;
                }
                inputSynset.getHyponyms()
                    .then(function(hyponyms)
                    {
                        hyponymsIDArray = hyponyms.map(function(hyponym)
                        {
                            return hyponym.synsetid;
                        })
                        return [hyponyms, hyponymsIDArray]
                    })
                    .then(function(resultArray)
                    {
                        //result: [lemmas,inputSynset, hyponyms, hypernym, synsetID, hypoNymsIDArray, hypernymID]
                        resolve([lemmas,inputSynset, resultArray[0], hypernymsTree[0], synsetID, resultArray[1], hypernymID]
                        );
                    })

            })
        }
    )

}

//input: node.upperNode, emptyArray
//return: hypernymsArray WITHOUT the calling lowest synset
var count = 1;
function configureUpperNodes(hypernym, hypernymArray)
{
    console.log("configureUpperNodes was called");

    //check for hypernym.hypernym[0] -> there might be multiple upperNodes
    if (hypernym.hypernym[0] === undefined)
    {
        //console.log("this should be entity");
        //console.log(hypernym);
        hypernymArray.push(hypernym);
        return hypernymArray;
    }
    hypernymArray.push(hypernym);
    return configureUpperNodes(hypernym.hypernym[0], hypernymArray)
}




function calculateWord(wordsArray)
{
    return new Promise(function(resolve)
    {
        var chosenSynset;
        wordsArray[0].getSynsets
        (function (err, data)
        {
            chosenSynset = data[0];
            chosenSynset.getHypernymsTree().then(function(hypernymsTree)
            {
                chosenSynset.getHyponyms().then(function(hyponyms)
                {
                    console.log([chosenSynset, hyponyms, hypernymsTree]);
                    resolve([chosenSynset, hyponyms, hypernymsTree[0]]
                    );
                })

            })

        });
    });
}

/*function calculateWord(wordsArray)
{
    return new Promise(function(resolve)
    {
        var chosenSynset;
        wordsArray[0].getSynsets
        (function (err, data)
        {
            chosenSynset = data[0];
            getHyperTree(chosenSynset, emptyArray1)
                .then(function (hyperArray)
                {
                    return hyperArray;
                })
                .then(function(hyperArray)
                {
                    chosenSynset.getHyponyms()
                        .then(function (hyponyms)
                        {
                            //console.log("hyponyms");
                            //console.log(hyponyms);
                            resolve([chosenSynset, hyponyms, hyperArray]);
                        })
                        .catch(function(err)
                        {
                            console.log("wrong");
                        })
                })
        });
    });
}


*/

//inputsynset: synset; hypernymsArray: empty array; returns hypernymsArray with hypernymTree as array stored
//Promise function: can only be consumed with '.then'
function getHyperTree(inputSynset, hypernymsArray) //word: "string". hypernymsArray: empty array
{
    //check if hypertree is undefined
    return  new Promise
    (function(resolve)
    {
        console.log("inputsy.set.synsetID");
        console.log(inputSynset.synsetid);
        console.log (JSON.stringify(inputSynset.synsetid));
        if(JSON.stringify(inputSynset.synsetid) !== JSON.stringify(100001740))
        {

        }
        var hypernymAmount = [];
        //push current synset into hypernymsAray as first element
        hypernymsArray.push(inputSynset); //TODO: redundant? called each time?
            inputSynset.getHypernymsTree().each(function forEach(hypernym)  //call getHypernym on each item!
            {
                var emptyArray = [];
                //create Object to store synset properties
                var newObject = {};
                newObject['synsetid'] = hypernym.synsetid;
                newObject["words"] = hypernym.words;
                newObject["definition"] = hypernym.definition;
                newObject["pos"] = hypernym.pos;
                newObject["lexdomain"] = hypernym.lexdomain;
                newObject["hypernym"] = hypernym.hypernym;

                //store each new hypernym in hypernymAmount
                hypernymAmount.push(newObject);

            }).then(function ()
            {
                recursiveTree(hypernymAmount[0], hypernymsArray);
                console.log("Hypernymsarray " + util.inspect(hypernymsArray, null, 3));
                resolve(hypernymsArray);
            });
    });

}

function recursiveTree(value, upperNodes)
{  /* console.log("the current value is " + value);
    console.log("hypernym is " )
    if (value.hypernym.length < 0)
    {
        console.log("value.hypernym.length < 0");
        return;
    }*/
    //catches the synset of highest anstraction ('entity)
    if (value.hypernym[0] === undefined)
    {
        console.log("this should be entity");
        console.log(value);
        upperNodes.push(value);
        return;
    }
    //console.log("tree functions! " +  util.inspect(value, null, 3)); //
    upperNodes.push(value);
    return recursiveTree(value.hypernym[0], upperNodes);
}



/*
 var compareHyperTrees = function(word, hypernymsArray, isfinished)
 {
 getHyperTree(word, hypernymsArray)
 .then(function(hyperArray)
 {
 console.log(hyperArray, null, 3);
 })
 }

 function getHyperTree(wordsArray, hypernymsArray) //word: "string". hypernymsArray: empty array  //returns
 // hypernymtreeArray
 {
 return  new Promise
 (function(resolve)
 {
 var hypernymAmount = [];
 wn.fetchSynset(word + ".n.1").then(function (singleSynset) //calculate semantiv closeness by google word2Vec
 {
 singleSynset.getHypernymsTree().each(function forEach(hypernym)  //call getHypernym on each item!
 {
 //console.log("this is the hyper"); //put all vales into one array?
 //console.log(util.inspect(hypernym, null, 3));
 var temp = util.inspect(hypernym, null, 3); //push all values of

 //create Object to store synset
 var newObject = {};
 newObject['synsetid'] = hypernym.synsetid;
 newObject["words"] = hypernym.words;
 newObject["definition"] = hypernym.definition;
 newObject["pos"] = hypernym.pos;
 newObject["lexdomain"] = hypernym.lexdomain;
 newObject["hypernym"] = hypernym.hypernym;

 hypernymAmount.push(newObject);
 hypernymsArray.push(singleSynset);
 }).then(function ()
 {

 //console.log("dooog" + util.inspect(singleSynset, null, 3));
 //console.log("hypernymAmount" + util.inspect(hypernymAmount, null, 3));
 //console.log("hypernymcalc" + util.inspect(hypernymAmount[0], null, 3));
 recursiveTree(hypernymAmount[0], hypernymsArray);
 //console.log("Hypernymsarray " + util.inspect(hypernymsArray, null, 3));
 resolve(hypernymsArray);
 });
 });
 });

 }

 function recursiveTree(value, upperNodes)
 {
 if (value.hypernym[0] === undefined)
 {
 upperNodes.push(value);
 return;
 }
 //console.log("tree functions! " +  util.inspect(value, null, 3)); //
 upperNodes.push(value);
 return recursiveTree(value.hypernym[0], upperNodes);
 }
 */