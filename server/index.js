const express = require('express')
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
const {Web3} = require("web3")
const ABI=require("./ABI");

const web3 = new Web3("HTTP://127.0.0.1:7545");
const contractAddress = "0xD0a2674a76fFb78F9209D58c8a4ebE52f1C98117";
      //to create contract instance - abi and contract address
const contract = new web3.eth.Contract(ABI, contractAddress);

const genderVerification =(gender)=>{
    const genderValue = gender.toLowerCase()
    if(genderValue==="male" || genderValue==="female" || genderValue==="others"){
        return true;
    }
    return false;
}

const partyClash=async(party)=>{
  const candidateList = await contract.methods.candidateList().call()
  const exists = candidateList.some((candidate)=>candidate.party.toLowerCase()===party.toLowerCase())
  return exists;
}

app.post("/api/time-verify",async(req,res)=>{
    const {startInSeconds,endInSeconds}=req.body;
    if(endInSeconds-startInSeconds<86400){
      res.status(200).json({message:"Time is less than 24 hours"})
    }else{
      res.status(403).json({message:"Time is greater than 24 hours"})
    }
})
app.post("/api/voter-verify",async(req,res)=>{
    const {gender}=req.body;
    const genderStatus = genderVerification(gender);
    if(genderStatus===true){
      res.status(200).json({message:"Registration Successfull"})
    }else{
      res.status(403).json({message:"Gender Value invalid"})
    }
})

app.post("/api/candidate-verify",async(req,res)=>{
   const {gender,party}=req.body;
   console.log(gender,party)
   const genderStatus = genderVerification(gender);
   const partyClashStatus = await partyClash(party);
   if(genderStatus===true){
    if(partyClashStatus===false){
        res.status(200).json({message:"Registration Successfull"})
    }else{
        res.status(403).json({message:"Party name clashes"})
    }
   }else{
    res.status(403).json({message:"Gender Value invalid"})
   }
})


app.listen(3000,()=>{
    console.log("Server is running at PORT 3000");
})