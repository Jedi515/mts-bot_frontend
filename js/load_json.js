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
    retVal += '<div class="card-name">' + element.name + '</div>';
    retVal += '<div class="card-description">' + element.description + '</div>';
    retVal += '</div>';
  });
  $('.section').append(retVal);
}

let jedidata = "";
if (localStorage.jedi) {
  jedidata = localStorage.getItem("jedi");
  appendData(jedidata);
}
else{
  jedidata = getgit("JohnnyDevo", "mts-bot", "/data/jedi.json");
  Promise.resolve(jedidata).then(data =>
  {
    __ = JSON.stringify(data);
    localStorage.setItem("jedi", __);
    appendData(__);
  });
}