import { useContext, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import PropTypes from "prop-types";
import { WalletContext } from "../../components/Wallet";
import "./ElectionCommision.css";
import { toast } from "react-hot-toast";

const ElectionCommision = ({ account }) => {
  const [winner, setWinner] = useState("No Winner Yet");
  const { contract } = useContext(WalletContext);

  const dateToSeconds = (dateTimeString) => {
    const date = new Date(dateTimeString);
    console.log("date", Math.floor(date.getTime() / 1000));
    return Math.floor(date.getTime() / 1000);
  };

  const votingTime = async (event) => {
    event.preventDefault();
    const startTime = document.querySelector("#start").value;
    const endTime = document.querySelector("#end").value;

    // converting time and date in seconds
    const startInSeconds = dateToSeconds(startTime);
    const endInSeconds = dateToSeconds(endTime);
    
    const timeData={
      startInSeconds,
      endInSeconds
    }
    try {
    const res = await fetch("http://localhost:3000/api/time-verify",{
       method:"POST",
       headers:{
        "content-type":"application/json"
       },
       body:JSON.stringify(timeData),
    })
    const data = await res.json()
    if(data.message==="Time is less than 24 hours"){
      await contract.methods
        .voteTime(startInSeconds, endInSeconds)
        .send({ from: account, gas: 480000 });
        toast.success("Voting Started");
    }else{
      throw new Error("Time is greater than 24 hours")
    } 
    } catch (error) {
      console.log(error)
      toast.error("Voting Initilization Failed");
    }
  };

  const emergency = async () => {
    try {
      await contract.methods.emergency().send({ from: account, gas: 480000 });
      toast("Emergency Declared", {
        icon: "🚨",
      });
    } catch (error) {
      toast.error("Emergency Declaration Failed");
    }
  };

  const result = async () => {
    try {
      await contract.methods.result().send({ from: account, gas: 480000 });
      const winCandidate = await contract.methods.winner().call();
      setWinner(winCandidate);
      toast.success("Result Out");
    } catch (error) {
      toast.error("Result Declaration Failed");
    }
  };

  return (
    <>
      <div>
        <Navigation account={account} />

        <div className="election-wrapper">
          <h2>
            Winner is: <br /> {winner}{" "}
          </h2>
          <form className="election-form" onSubmit={votingTime}>
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
          <button className="emerBtn" onClick={emergency}>
            Emergency
          </button>
          <button className="resultBtn" onClick={result}>
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
