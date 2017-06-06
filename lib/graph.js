/**
 * Created by marie on 26.05.2017.
 */

//create comprehensive Json file of nodes and edges:
//node: underlying layer of conneced nodes
//node id

//insertion: get label, get hypernym of label -> check existing nodes for a match with that hypernym
//iterate through list of connedted subnodes of hypernym, check if any of the subnodes is a synonym of inputLabel
//(check if inputLabel and subnode are in the same syonyid
// either: create a new node & append pic or append the pic to an exiting node
// store new node of pic in Json

//for JSON- storing: store upper/lower nodes ID, store own ID in each node
    //store images in nodes as strings
    //store references to ower/upper nodes in graph -> refresh the set references each time you parse the JSON ->
    // search by ID !
var express = require ('express');
var util = require ('util');
var wordNet = require('./wordNet')
console.log("graph.js initialized");
var synsets = [];
var subnodes;
var uppernodes;
var nodeStorageArray = [];
var inputArray1 = ["cat", "dog"];
var inputArray2 = ["banana"];
var emptyArray1 = [];
//find out which word is the right one: cmpare
//setNode(inputArray);

function createNode(_lemma,_synset, _lowerNodes, _upperNode, _synsetID, _lowerNodesID, _upperNodeID)
{
    var node = {};
    node.lemma = _lemma;
    node.synset = _synset; //JS-Obj: reference
    node.synsetID = _synsetID; //JSON-obj

    node.upperNode = _upperNode;
    node.upperNodeID =_upperNodeID; //JSON-obj
    node.upperNodeRef = null; //JS-Obj: reference

    node.lowerNodes = _lowerNodes;
    node.lowerNodesID = _lowerNodesID; //JSON-Obj
    node.lowerNodesRefArray = []; //JS-Obj: reference

    node.imageArray = [];
    return node;
}
function setNode(labelsArray)
{
    return new Promise(function (resolve)
    {
        var input = labelsArray;
        wordNet.configureNodeFromLabel(input)
        //resultArray: [lemmas,inputSynset, hyponyms, hypernym, synsetID, hypoNymsIDArray, hypernymID]
            .then(function(resultArray)
            {
                newNode = createNode(resultArray[0], resultArray[1], resultArray[2], resultArray[3], resultArray[4], resultArray[5], resultArray[6]);
                console.log("newNode");
                console.log(newNode);
                console.log("newNode end");
                resolve(newNode);
            })
    });

}

//createFirstNode(inputArray);
function createFirstNode(inputArray)
{
    console.log("createFirstNode initiated");
    setNode(inputArray)
        .then(function(newNode)
        {
            console.log("setNode was called");
            console.log(newNode);
            createNodesfromHyperTree(newNode, emptyArray1)
            //hyperTreeNodes: array of interconnected Nodes of TreeHierarchy
            //after ".then" is called, hyperTreeNodes is filled with all values
            //storeNodesArray[0] = entity; storeNodesArray[storeNodesArray.length -1] = hyper of curr node
                .then(function(hyperTreeNodes)
                {
                    //push newNode into array of hyperTreeNodes, interconnect last ele of HTN with newNode
                    newNode.upperNodeRef = hyperTreeNodes[hyperTreeNodes.length -1];
                    hyperTreeNodes[hyperTreeNodes.length -1].lowerNodesRefArray.push(newNode);
                    hyperTreeNodes.push(newNode);
                    console.log("nodeStorageArray");
                    console.log(util.inspect(hyperTreeNodes, null, 3));
                    console.log(hyperTreeNodes.length);

                    //push HyperTreeNodes into NodeStorage
                    nodeStorageArray.push(hyperTreeNodes);
                });
        });

}
function createNodesfromHyperTree(newNode, emptyArray)
{
    return new Promise(function(resolve)
    {
        var storeNodesArray = [];
        var upperNodesArray = wordNet.configureUpperNodes(newNode.upperNode, emptyArray); //UNA
        console.log("upperNodesArray");
        console.log(upperNodesArray);
        var UNALength = upperNodesArray.length
        var lastUpperNode = null;
        for (var i = UNALength -1; i >-1; i--)
        {
            //console.log(i);
            //console.log(upperNodesArray[i]);
            wordNet.configureNodeFromSynset(upperNodesArray[i])
                    .then(function (resultArray)
                    {
                        newNode = createNode(resultArray[0], resultArray[1], resultArray[2], resultArray[3], resultArray[4], resultArray[5], resultArray[6]);
                        newNode.upperNodeRef = lastUpperNode;
                        if (lastUpperNode !== null)
                        {
                            lastUpperNode.lowerNodesRefArray.push(newNode);
                        }
                        //push into NodeStorage
                        //console.log("pushed in Nodestorage");
                        //console.log(i);
                        storeNodesArray.push(newNode);
                        //set variables for next iteration
                        lastUpperNode = newNode;
                        //only exit when all Nodes were pushed into storeNodesArray
                        if (storeNodesArray.length === UNALength)
                        {
                            //console.log("resolve will be called");
                            resolve(storeNodesArray);
                            //storeNodesArray[0] = entity
                        }
                    })
        }
    });
}

insertNode(inputArray2);
function insertNode(inputArray)
{
    //maybe don't need to create any nodes at all!
    //configure firstNode through configureNodeFromLabel
    wordNet.configureUpperNodeIDs(inputArray)
    //upperNodeIDArray: all IDs of upperNodes, NOT the ID of the current node
        .then(function(upperNodeIDArray)
        {
            console.log(upperNodeIDArray);
        })
    //compare all the Ids with the already existing Ids , starting with NodeStorage[0] -> This SHOULD always e
    // entity!!!!
    //

}
//createFirstNode(["hair"]);

/*
 newNode.upperNodes.forEach(function(synset, index, array)
 {
 //question: are the synsets perceived as normal synsets as they contan further infrmaion, ec. upper
 // nodes ?
 console.log("array " + index);
 console.log(synset);
 //need to be abe to create a node from a synset, only first node should be created by word -<
 // otherwhise, a node could be created with the same lemma, but another sense(another synsetID

 //Promise
 wordNet.configureNodeFromSynset(synset)
 .then(function(result)
 {
 console.log("in Promise");
 //console.log(result);
 });


 //result: resolve([lemmas,inputSynset, hyponyms, hyperArray]);
 });
 */