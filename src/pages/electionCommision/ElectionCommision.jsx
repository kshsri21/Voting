import { useContext, useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import PropTypes from "prop-types";
import { WalletContext } from "../../components/wallet/Wallet";
import "./ElectionCommision.css";
import { toast } from "react-hot-toast";

const ElectionCommision = ({account}) => {
  const {contract}=useContext(WalletContext);
  const [winner,setWinner]=useState("No Winner");
  const startVoting = async(e)=>{
    e.preventDefault()
    const startTime = document.querySelector("#start").value;
    const endTime = document.querySelector("#end").value;
    console.log(startTime,endTime)
    // await contract.methods.voteTime(startTime,endTime).send({from:account,gas:480000})
    // alert("Voting Started")
  }

  useEffect(()=>{
    const winnerInfo = async()=>{
      const winner = await contract.methods.winner().call();
      setWinner(winner);
    }
    contract && winnerInfo()
  },[contract])

  const resultDeclare =async()=>{
    await contract.methods.result().send({from:account});
    alert("Result Declared")
  }
  const emerygencyDeclared =async()=>{
    await contract.methods.emergency().send({from:account});
    alert("Emerygency Declared")
  }
  return (
    <>
      <div>
        <Navigation account={account} />
        <div className="election-wrapper">
          <h2>
            Winner is: {winner} <br />
          </h2>
          <form className="election-form" onSubmit={startVoting}>
            <label htmlFor="start">Start Time</label>
            <input type="datetime-local" id="start" required />

            <label htmlFor="end">End Time</label>
            <input type="datetime-local" id="end" required />

            <button className="regBtn" type="submit">
              Voting Start
            </button>
          </form>
        </div>
        <div className="admin-actions">
          <button className="emerBtn" onClick={emerygencyDeclared}>
            Emergency
          </button>
          <button className="resultBtn" onClick={resultDeclare}>
            Result
          </button>
        </div>
      </div>
    </>
  );
};

ElectionCommision.propTypes = {
  account: PropTypes.node.isRequired,
};

export default ElectionCommision;
