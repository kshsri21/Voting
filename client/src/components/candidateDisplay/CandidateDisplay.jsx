import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../wallet/Wallet";
import "./CandidateDisplay.css";
const CandidateDisplay = () => {
  const {contract}=useContext(WalletContext);
  const [list,setList]=useState([])
  useEffect(()=>{
    const getCanidateList = async()=>{
      const candidateInfo = await contract.methods.candidateList().call();
      setList(candidateInfo);
    }
    contract && getCanidateList()
  },[contract])
  
  return (
    <div className="table-container">
      <table className="voter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
        {list?(list.map((candidate)=>{
         return (<tr key={candidate.candidateId}>
          <td>{candidate.name}</td>
          <td>{candidate.party}</td>
          <td>{candidate.votes}</td>
         </tr>)
        })):<p></p>}
        </tbody>
      </table>
    </div>
  );
};
export default CandidateDisplay;
