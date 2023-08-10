import { useContext } from "react";
import PropTypes from "prop-types";
import Navigation from "../components/Navigation";
import { WalletContext } from "../components/Wallet";
import VoterDisplay from "../components/VoterDisplay";
import Vote from "../components/Vote";
import VotingStatus from "../components/VotingStatus";

const VoterRegister=({account})=>{
  const {contract}=useContext(WalletContext)
  const voterRegistration = async(event)=>{
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const gender = document.querySelector("#gender").value;
    const age = document.querySelector("#age").value;
    try{
        await contract.methods.voterRegister(name,age,gender).send({from:account,gas:480000})
        alert("Voter Registration successful");
    }catch(error){
        console.error(error)
    }
}
    return (
        <>
          <Navigation/>
          <form className="form" onSubmit={voterRegistration}>
          <label className="label2" htmlFor="name">
            Name:
          </label>
          <input className="innerBoxVote" type="text" id="name"></input>

          <label className="label2" htmlFor="age">
            Age:
          </label>
          <input className="innerBoxVote" type="text" id="age"></input>

          <label className="label2" htmlFor="gender">
            Gender:
          </label>
          <input className="innerBoxVote" type="text" id="gender"></input>

          <button className="regBtn" type="submit">
            Register
          </button>
        </form>
        <Vote account={account}/>
        <VotingStatus/>
        <VoterDisplay/>
       
         </>

     )
}
VoterRegister.propTypes = {
    account: PropTypes.node.isRequired,
  };
export default VoterRegister;