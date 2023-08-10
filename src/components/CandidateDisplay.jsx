import { useState,useEffect,useContext } from "react";
import { WalletContext } from "./Wallet";
const CandidateDisplay=()=>{
  const {contract}=useContext(WalletContext)
  const [candidates,setCandidates]=useState([])
  useEffect(()=>{
     const candidateInfo = async()=>{
         const candidates = await contract.methods.candidateList().call();
         setCandidates(candidates)
     }
     contract && candidateInfo();
  },[contract])
  return(<>
   {candidates.map((candidate)=>{
    return( 
    <ul key={candidate.party}>
     <li>{candidate.name}</li>
     <li>{candidate.party}</li>
     <li>{candidate.votes}</li>
     </ul>)
   })}
  </>)
}
export default CandidateDisplay;