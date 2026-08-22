var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const KLIPY_API_KEY = "GblaAUO3H2fVadJMh2BBPfeNpoAcdpI0TQKEx7HGN2GDeCVNpLY9CgEB10yhcnZb";
let url =  new URL(`https://api.klipy.com/api/v1/${KLIPY_API_KEY}/gifs/search`);
url.searchParams.set("q", "Harry Potter");
url.searchParams.set("page",1);
url.searchParams.set("per_page",10);
fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));