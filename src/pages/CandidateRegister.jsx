import { useContext } from "react";
import PropTypes from "prop-types";
import CandidateDisplay from "../components/CandidateDisplay";
//import { WalletContext } from "../components/Wallet";
import Navigation from "../components/Navigation";
import { WalletContext } from "../components/Wallet";
const CandidateRegister=({account})=>{
    const {contract}=useContext(WalletContext)
    const candidateRegistration = async(event)=>{
        event.preventDefault();
        const name = document.querySelector("#name").value;
        const gender = document.querySelector("#gender").value;
        const party = document.querySelector("#party").value;
        const age = document.querySelector("#age").value;
        try{
            await contract.methods.candidateRegister(name,party,age,gender).send({from:account,gas:480000})
            alert("Registration successful");
        }catch(error){
            console.error(error)
        }
    }
    return (
        <>
         
          <Navigation/>
        <form className="form" onSubmit={candidateRegistration}>
        <label className="label1" htmlFor="name">
          Name:
        </label>
        <input className="innerBoxCand" type="text" id="name"></input>

        <label className="label1" htmlFor="party">
          Party:
        </label>
        <input className="innerBoxCand" type="text" id="party"></input>

        <label className="label1" htmlFor="age">
          Age:
        </label>
        <input className="innerBoxCand" type="text" id="age"></input>

        <label className="label1" htmlFor="gender">
          Gender:
        </label>
        <input className="innerBoxCand" type="text" id="gender"></input>

        <button className="regBtn" type="submit">
          Register
        </button>
      </form>
      <CandidateDisplay/>
         </>
         
     )
}
CandidateRegister.propTypes = {
    account: PropTypes.node.isRequired,
  };
export default CandidateRegister;