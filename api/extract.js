export default async function handler(req, res) {

if(req.method !== "POST"){
return res.status(405).send("Method not allowed");
}

const { text } = req.body;

if(!text){
return res.status(400).send("No text");
}

const webhook = process.env.WEBHOOK;

await fetch(webhook,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
content: "🎮 New Game Submission:\n" + text
})
});

res.status(200).json({status:"sent"});
}
