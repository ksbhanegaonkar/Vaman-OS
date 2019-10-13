export const postRequest =(data,onDataReceive) =>{
    console.log("called from rest utils");
    fetch(new Request("http://localhost:8083/onaction"),
    {
      headers:{
        'Content-Type': 'text/plain',
       // ,'Access-Control-Allow-Origin':"*",
        'Authorization':localStorage.getItem("jwtToken")
      },
       method: 'POST', // or 'PUT'
       //mode:"no-cors",
       body: JSON.stringify(data) // data can be `string` or {object}!
      
    }
       )

  .then((res)=>res.json())
  .then(data=>{
    data.dataloding=false;
    onDataReceive(data);
  });
}