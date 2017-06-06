//something broken here, it does not work the way it is supposed to!
//takes in three words( the first three labels retreived from the GoogleVisionAPI) as Wordnet-words
//choses the synset of the first three synsets of the firstword, whih has the lowest semantic distance to one of the
// first two synsets of the other two words
//returns the correct synset
function determineWord(wordsArray, inputArray)
{
    //get all synsets of first word
    wordsArray[0].getSynsets(function (err, data)
    {
        var synsets1 = data;
        //console.log("this are synsets 1 " + synsets);
        //get all synsets of sec word
        wordsArray[1].getSynsets(function (err, data)
        {
            var synsets2 = data;
            //console.log("this are synsets 2 " + synsets);
            //get all synsets of third word
            wordsArray[2].getSynsets(function (err, data)
            {
                var synsets3 = data;
                //LCS with first synset of three labels
                var WUObject = {}//{ 000:'a', 011:'b', 010:'c', 001:'d',
                // 100:'a',111:'b',110:'c',101:'d',200:'a',211:'b',210:'c',201:'d'};
                LCS(synsets1[0], emptyArray1, synsets2[0], emptyArray2, synsets3[0], emptyArray3,compare)
                //compare all retreived wu addings
                    .then(function(data000)
                    {
                        LCS(synsets1[0], emptyArray1, synsets2[1], emptyArray2, synsets3[1], emptyArray3,compare)
                            .then(function(data011)
                            {
                                LCS(synsets1[1], emptyArray1, synsets2[0], emptyArray2, synsets3[0], emptyArray3,compare)
                                    .then(function(data100)
                                    {
                                        LCS(synsets1[1], emptyArray1, synsets2[1], emptyArray2, synsets3[1], emptyArray3,compare)
                                            .then(function(data111)
                                            {
                                                LCS(synsets1[2], emptyArray1, synsets2[0], emptyArray2, synsets3[0], emptyArray3,compare)
                                                    .then(function(data200)
                                                    {

                                                        LCS(synsets1[2], emptyArray1, synsets2[1], emptyArray2, synsets3[1], emptyArray3,compare)
                                                            .then(function(data211)
                                                            {
                                                                getAddedWU(data000, data011, WUObject, 0);
                                                                getAddedWU(data100, data111, WUObject, 1);
                                                                getAddedWU(data200, data211, WUObject, 2);
                                                                calculatedWUArray = [];
                                                                for (var item in WUObject) {
                                                                    calculatedWUArray.push(WUObject[item]);
                                                                }
                                                                var lowestWU = Math.min.apply(Math, calculatedWUArray);
                                                                for (var key in WUObject) {
                                                                    if (WUObject[key] === lowestWU)
                                                                    {
                                                                        /*console.log("true key" + key);
                                                                         console.log("true keyfirst" + key.charAt(0));
                                                                         console.log("The output" +
                                                                         " is" +
                                                                         util.inspect(synsets1[key.charAt(0)]),
                                                                         null, 3);*/

                                                                        return synsets1[key.charAt(0)];
                                                                        //returns the first number of the key of the
                                                                        // keyValuePair in objectWU with the lowest
                                                                        // value (= lowest semantic difference
                                                                        // between labels)
                                                                        //-> first number can be used as index for
                                                                        // the synset1 - Array to retreive the
                                                                        // chosen synset (which has, according to
                                                                        // all calculations, the lowest sem.distance
                                                                        // to the other labels)
                                                                        //-> synset1[key.charAt(0)]
                                                                    }
                                                                }
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })

            });
        });
    });
}
function getAddedWU(dataX00, dataX11, WUObject, synsetNum)
{
    console.log("This is the returned LCS data000 " + util.inspect(dataX00, null, 3));
    console.log("This is the returned LCS data 011 " + util.inspect(dataX11, null, 3));
    //dataxxx[WUdist, LCsynset iD]
    WUObject[synsetNum + '00'] = dataX00[0] + dataX00[1];

    WUObject[synsetNum + '11'] = dataX11[0] + dataX11[1];
    WUObject[synsetNum + '01'] = dataX00[0] + dataX11[1];
    WUObject[synsetNum + '10'] = dataX11[0] + dataX00[1] ;
    /* console.log("addedWU000", WUObject[synsetNum + '00']);
     console.log("addedWU011", WUObject[synsetNum + '11']);
     console.log("addedWU001", WUObject[synsetNum + '01']);
     console.log("addedWU010", WUObject[synsetNum + '10']);*/
}


/*
 function configureSynset(wordsArray)
 {
 var keyWord; //TODO: return keyword!
 var firstWord = wordsArray[0].getSynsets(function (err, data)
 {
 synsets = util.inspect(data, null, 3);
 console.log("this are synsets" + synsets);
 });
 }*/
//
// getHyperTree("dog", emptyArray); //returns HypernymtreeArray
//console.log(HypernymTree);
function LCS (synset1, hypernymsArray1,synset2, hypernymsArray2, synset3, hypernymsArray3, compare)
{
    return new Promise(function (resolve)
    {
        {
            //getHyperTree: returns Promise
            getHyperTree(synset1, hypernymsArray1)
                .then(function (hyperArray1)
                {
                    //console.log(util.inspect(hyperArray1, null, 3));
                    return hyperArray1;
                })
                .then(function (hyperArray1)
                {
                    getHyperTree(synset2, hypernymsArray2)
                        .then(function (hyperArray2)
                        {
                            //console.log("hyperArray2");
                            //console.log(util.inspect(hyperArray2, null, 3));
                            //var WuDistance =
                            return [hyperArray1, hyperArray2];
                        })
                        //hyperArray12 = [hyperArray1, hyperArray2]
                        .then(function(hyperArray12)
                        {
                            getHyperTree(synset3, hypernymsArray3)
                                .then(function (hyperArray3)
                                {

                                    //console.log("hyperArray1");
                                    //console.log(util.inspect(hyperArray1, null, 3));
                                    var WU1 = compare(hyperArray12[0], hyperArray12[1]);
                                    var WU2 = compare(hyperArray12[0], hyperArray3);
                                    var addedWU = WU1[0] + WU2[0];
                                    //console.log("This is Wu1 " + WU1);
                                    //console.log("This is Wu2 " + WU2);
                                    //console.log("added WU " + addedWU);
                                    //resolves: [[WU1dist, LCsynset ID], [WU2dist, LCsynset ID]]
                                    //console.log("WU1:" + WU1  + " WU2 " + WU2);
                                    resolve([WU1, WU2]);
                                })
                        })

                });

        }
    })
}



/*var LCScomparison(sense1Array, sense2Array, sense3Array )
 {
 console.log(sense1Array);
 }*/


function compare(hyperArray1, hyperArray2)
{
    var currentEqual = 0;
    var length1 = hyperArray1.length;
    var length2 = hyperArray2.length;
    //TODO: use loger length? prob: shorther array undefined
    for(var i = 1; i < length1; i++)
    {
        //console.log("Asynid " +hyperArray1[length1  - i].synsetid);
        // console.log("Bsynid " +hyperArray2[length2  - i].synsetid);
        if (hyperArray1[length1  - i].synsetid === hyperArray2[length2 -i ].synsetid)
        {
            currentEqual = i;
            //console.log("equal");
            // console.log("AA  " +hyperArray1[length1  - i].synsetid);
            // console.log("BB  " + hyperArray2[length2  - i].synsetid);
        }
        else
        {
            //return LCS
            //console.log("currentEqual " + currentEqual)
            //console.log ("notEqual " + hyperArray1[length1 - currentEqual].synsetid);
            //WU:   2* N / N1 + N2
            //console.log("wu distance " + (2 * (i-1) / ((length1 -1) + (length2 - 1))));

            return  (2 * (i-1) / ((length1 -1) + (length2 - 1))) ;
            //return [(2 * (i-1) / ((length1 -1) + (length2 - 1))), hyperArray1[length1 - currentEqual].synsetid]
            // return: WU-dist, sinsetid
        }
    }

    //console.log("array1 ");
    // console.log(util.inspect(hyperArray1, null, 3));
    //console.log("array2 ");
    //console.log(util.inspect(hyperArray2, null, 3));
}

/**
 * Created by marie on 04.06.2017.
 */



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

        wordsArray[0].getSynsets().then(function(chosenSynset)
        {

        })
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
        //delete
        calculateWord(wordsArray)
        //returns
            .then(function(resultArray)
            {
                //console.log([lemma, resultArray[0], resultArray[1],resultArray[2]]);
                resolve([lemma, resultArray[0], resultArray[1],resultArray[2]]);
            })
    });
}


function configureNodeFromSynset(inputSynset)
{
    return new Promise(function(resolve)
        {
            var lemmas = inputSynset.words;
            console.log("lemmas: " + lemmas);
            //console.log(inputSynset);
            console.log("getHyperTree");
            inputSynset.getHypernymsTree().then(function(hypernymsTree)
            {
                inputSynset.getHyponyms().then(function(hyponyms)
                {

                    resolve([lemmas,inputSynset, hyponyms, hypernymsTree]
                    );
                })

            })
        }
    )

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
