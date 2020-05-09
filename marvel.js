// you will also have to setup the referring domains on your marvel developer portal
let PRIV_KEY = ''
let PUBLIC_KEY = ''

// let PRIV_KEY = "7d77b9c0a9404bdbfe88eb7b5452aaa3b12e80ae";
// let PUBLIC_KEY = "92da424c5839281f9cb8d15b3849c2cf";

let url = 'http://gateway.marvel.com/v1/public/characters';
var ts = new Date().getTime();
var characterId = '1009718'; // wolverine     
var next = 100

//Dados Personagens
let personagensMarvel

function searchKeyInMemory () {
 let keys =  localStorage.getItem('chaves')
 if (keys != null) {
   let jsonKeys =  JSON.parse(keys)
   PRIV_KEY = jsonKeys.chavePrivada
   PUBLIC_KEY = jsonKeys.chavePublic
   getMarvelResponse(0)
 }
}

function loadForKeys () {
    let public = document.querySelector('#publicApi').value
    let private = document.querySelector('#privateApi').value

    PUBLIC_KEY = public
    PRIV_KEY = private

    var recKey = {chavePublic:public,chavePrivada:private}
    var reckeyString =  JSON.stringify(recKey)
    localStorage.setItem('chaves', reckeyString);

    getMarvelResponse(0)
}

function pagination (number) {
    return next =  number + 100
}
 
function getMarvelResponse(numberPage) {
    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();


  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    limit:100,
    offset:numberPage
    })
    .done(function(data) {
        $('#Personagens').html('')
        var personagens = data.data.results
        //console.log(data)
        for (let p of personagens) {
           // console.log(p)
            let name = p.name
            let image = p.thumbnail.path
            let ext = p.thumbnail.extension
            personagensMarvel = `   
            <div class="person">
                <h3>${name}</h3>
                <img src=${image}.${ext} />
            </div>`,
            $('#Personagens').append(personagensMarvel)
        }
    })
    .fail(function(err){
      console.log(err);
    });
};


function nextChar () {
    pagination(next)
    getMarvelResponse(next) 
}

function openForm () {
    let form = document.querySelector('.form_api')
    form.classList.add('open')
}


searchKeyInMemory()





