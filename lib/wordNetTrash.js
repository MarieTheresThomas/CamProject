/*
function configureNode(inputArray)
{
    //maybe: set variables inside here!
    var wordsArray = inputArray.map(function (item)
    {
        var newWord = new wn.Word(item, 'n');
        //console.log(newWord);
        return newWord;
    });
    console.log(util.inspect(wordsArray));
    wordsArray[0].getPolysemyCount('n', function (err, data)
    {
        //console.log("the word has " + data + " meanings");
        //if data >1, then compare received synsets to other tagging elements
    });
    var firstWordwnm = wordsArray[0].getSynsets(function (err, data)
    {
        synsets = util.inspect(data, null, 3);

        //console.log(synsets);
    });



    semCloseness(wordsArray[0], wordsArray[1], inputArray[0], inputArray[1]);
    //console.log("called semcloseness");
}
//get hypernym tree of first three synsets, compare hypernim-trees-synset ids of
function semCloseness(wordA, wordB, Aword, Bword)
{
    var synsetA;
    var synsetB;
    var HypernymsTreeA;
//utilA = util.inspect(wordA);
//console.log("semantic closeness" + utilA);
/*wn.fetchSynset(Aword + '.n.1', function (err, synset)
 {
 synset.getHypernymsTree(function (err, data)
 {
 console.log("hyperA" + util.inspect(data, null, 3));
 HypernymsTreeA = util.inspect(data, null, 3);

 wn.fetchSynset(Bword + '.n.1', function (err, synset)
 {
 synset.getHypernymsTree(function (err, data)
 {
 console.log("hyperB" + util.inspect(data, null, 3));
 HypernymsTreeB = util.inspect(data, null, 3);
 });
 });
 });

 });

 var synsetIDA = [];
 var synsetIDB = [];
 console.log("hypertree");
 wn.fetchSynset(Aword + '.n.1').then(function (synsetArray)
 {
 synsetArray.getHypernymsTree().each(function forEach(hypernymA)
 {
 synsetIDA.push(hypernymA.synsetid);
 wn.fetchSynset(Bword + '.n.1').then(function (synsetArray)
 {
 synsetArray.getHypernymsTree().each(function forEach(hypernymB)
 {

 synsetIDB.push(hypernymB.synsetid);

 var output = hypernymA.synsetid;

 console.log("hypernymA");
 console.log();
 console.log(hypernymA);
 console.log(hypernymB);
 })

 });
 })
 console.log(synsetIDA);
 console.log(synsetIDB);
 });
 }



 wordA.getSynsets(function (err, data)
 {
 synsetA = util.inspect(data, null, 3);
 //console.log(synsetA);
 }).then(function(data)
 {

 });
 console.log(synsetA);



 wordB.getSynsets(function (err, data)
 {
 synsetB = util.inspect(data, null, 3);
 //console.log(synsets);
 });

 console.log("this is syn a" + synsetA);
 //console.log(synsetB);
 }
 configureNode(inputArray);

 newWord.getPolysemyCount('n', function (err, data)
 {
 console.log(data);
 //if data >1, then compare received synsets to other tagging elements
 });
 newWord.getSynsets(function (err, data)
 {
 synsets = util.inspect(data, null, 3);
 console.log(synsets);
 });
 newWord.getPolysemyCount( 'n', function( err, data ) {
 console.log( data );
 });*/


//get synsets of all elements of wordsArray
//get synset with most familiarity of all synsets
//get element of highest likelyhood
//compare which word.domains are used the most in the top-synsets

//familiarity: number f different senses (synsets?) a word has
/*newWord.getPolysemyCount( 'n', function( err, data ) {
 console.log( data );
 //if data >1, then compare received synsets to other tagging elements
 });
 newWord.getSynsets(function(err, data)
 {
 synsets = util.inspect( data, null, 3 );
 console.log(synsets);
 });
 }

 configureNode(wordsArray);
 //find out words nearest
 /*function generateNode(word)
 {
 var newWord = new wordnet.Word(word, 'n');
 newWord.getSynsets(function (err, data){
 synset =
 })
 }

 var kiss = new wn.Word( 'dog', 'v' );
 kiss.getSynsets( function( err, data ) {
 console.log( data);
 console.log( util.inspect( data, null, 3 ) );
 });

 // the synset king.n.10 is: king - (chess) the weakest but the most important piece
 wn.fetchSynset( 'king.n.10' ).then( function( synset ) {
 synset.getHypernyms().then( function( hypernym ) {
 console.log( util.inspect( hypernym, null, 3 ) );
 });
 })*//**
 * Created by marie on 28.05.2017.
 */
/**
 * Created by marie on 28.05.2017.
 */
module.exports =
    {

        function1 : function()
        {
            console.log("hey this is graph")
            return;
        },
        function2 : function()
        {
            return;
        }
    }
