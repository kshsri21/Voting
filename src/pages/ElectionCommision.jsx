import { useContext,useState } from "react";
import Navigation from "../components/Navigation";
import PropTypes from "prop-types";
import { WalletContext } from "../components/Wallet";

const ElectionCommision=({account})=>{
    const [winner,setWinner]=useState("No Winner Yet");
    const {contract}=useContext(WalletContext)
    const votingTime = async(event)=>{
       event.preventDefault();
       const startTime = document.querySelector("#start").value;
       const endTime = document.querySelector("#end").value;
       try{
           await contract.methods.voteTime(startTime,endTime).send({from:account,gas:480000})
           alert("Voting Started");
       }catch(error){
        console.error(error);
       }
    }
    const emergency = async()=>{
        try{
            await contract.methods.emergency().send({from:account,gas:480000})
            alert("Emergency Declared");
        }catch(error){
         console.error(error);
        }
    }
    const result = async()=>{
        try{
            await contract.methods.result().send({from:account,gas:480000})
            const winCandidate = await contract.methods.winner().call();
            setWinner(winCandidate)
            alert("Result Out");
        }catch(error){
         console.error(error);
        }
    }
    return (
        <>
        <div>
       <Navigation></Navigation>
        <h2>Winner is: {winner} </h2>
        <form className="form" onSubmit={votingTime}>
          <label className="label2" htmlFor="start">
            Start Time:
          </label>
          <input className="innerBoxVote" type="text" id="start"></input>

          <label className="label2" htmlFor="end">
            End Time:
          </label>
          <input className="innerBoxVote" type="text" id="end"></input>

          <button className="regBtn" type="submit">
            Voting Start
          </button>
        </form>
      </div>
      <div className="space">
        <button className="emerBtn" onClick={emergency}>
          Emergency
        </button>
        <button className="resBtn" onClick={result}>
          Result
        </button>
      </div>
         </>
     )
}
ElectionCommision.propTypes = {
    account: PropTypes.node.isRequired,
  };
export default ElectionCommision;