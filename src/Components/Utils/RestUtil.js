export const postRequest =(action,data,onDataReceive) =>{
    console.log("called from rest utils");
    fetch(new Request("http://localhost:8083"+action),
    {
      headers:{
        'Content-Type': 'application/json',
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
    onDataReceive(data);
  });
}