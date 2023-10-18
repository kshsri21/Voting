import { useContext } from "react";
import { WalletContext } from "../wallet/Wallet";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import "./Vote.css";

const Vote = ({account}) => {
  const {contract} = useContext(WalletContext);
  const voting = async(e)=>{
    e.preventDefault();
    const voterId  = document.querySelector("#voterId").value;
    const candidateId = document.querySelector("#candidateId").value;
    try{
      await contract.methods.vote(voterId,candidateId).send({from:account,gas:480000})
      toast.success("Vote Successful")
    }catch (error) {
      toast.error("Vote Failed");
    }
  }
  return (
    <div>
      <form className="vote-form" onSubmit={voting}>
        <h1>Vote Here</h1>
        <label htmlFor="start">Voter Id:</label>
        <input type="text" id="voterId"></input>

        <label htmlFor="end">Candidate Id:</label>
        <input type="text" id="candidateId"></input>

        <button className="regBtn" type="submit">
          Vote
        </button>
      </form>
    </div>
  );
};
Vote.propTypes = {
  account: PropTypes.node.isRequired,
};
export default Vote;
