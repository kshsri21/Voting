import { useContext } from "react";
import PropTypes from "prop-types";

import { WalletContext } from "./Wallet";
const Vote=({account})=>{
    const {contract}=useContext(WalletContext)
    const submitVote = async(event)=>{
        event.preventDefault();
        const candidateId = document.querySelector("#candidateId").value;
        const voterId = document.querySelector("#voterId").value;
        try{
            await contract.methods.vote(voterId,candidateId).send({from:account,gas:480000})
            alert("You have voted successfully");
        }catch(error){
         console.error(error);
        }
      }
      return (
        <div>
    
        <form className="form" onSubmit={submitVote}>
          <label className="label2" htmlFor="start">
           Voter Id:
          </label>
          <input className="innerBoxVote" type="text" id="voterId"></input>
    
          <label className="label2" htmlFor="end">
            Candidate Id:
          </label>
          <input className="innerBoxVote" type="text" id="candidateId"></input>
    
          <button className="regBtn" type="submit">
            Vote
          </button>
      </form>
      </div>
      )
}
Vote.propTypes = {
    account: PropTypes.node.isRequired,
  };
export default Vote;