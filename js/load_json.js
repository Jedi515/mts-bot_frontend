async function getgit (owner, repo, path) { 
  // A function to fetch files from github using the api 
  
let data = await fetch (
  `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
)
  .then (d => d.json ())
  .then (d =>
    fetch (
      `https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`
    )
  )
  .then (d => d.json ())
  .then (d => JSON.parse (atob (d.content)));

return data;
}

async function appendData(stringData) {
  let data = JSON.parse(stringData).cards;
  var retVal = '';
  data.forEach(element => {
    retVal += '<div class="card ' + element.color + '">';
    // if (element.cost != "") {retVal += '<div class="energy">' + element.cost + '</div>';}
    retVal += '<div class="card-name rarity-' + element.rarity + '">' + element.name + '</div>';
    retVal += '<div class=type-' + element.type + '></div>';
    retVal += '<div class=tags><span>' + element.type + '</span></div>';
    retVal += '<div class="card-description">' + element.description + '</div>';
    retVal += '</div>';
  });
  $('.section').append(retVal);
}

let mts_data = "";
if (localStorage.basegame) {
  mts_data = localStorage.getItem("basegame");
  appendData(mts_data);
}
else{
  mts_data = getgit("JohnnyDevo", "mts-bot", "/data/basegame.json");
  Promise.resolve(mts_data).then(data =>
  {
    __ = JSON.stringify(data);
    localStorage.setItem("basegame", __);
    appendData(__);
  });
}