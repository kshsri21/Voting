import { useState,useEffect,useContext } from "react";
import { WalletContext } from "./Wallet";
const VotingStatus = () => {

    const {contract}=useContext(WalletContext);
    const [voteStatus,setvoteStatus]=useState("");

    useEffect(() =>{
        
        const checkVotingStatus = async()=>{
            const status = await contract.methods.votingStatus().call();
            setvoteStatus(status);
        }
        contract && checkVotingStatus();
    },[contract])

  return (
    <div>Vote Status: {voteStatus}</div>
  )
}
export default VotingStatus;