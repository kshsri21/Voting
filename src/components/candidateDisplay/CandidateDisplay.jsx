import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../wallet/Wallet";
import "./CandidateDisplay.css";
const CandidateDisplay = () => {
  
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
      
        </tbody>
      </table>
    </div>
  );
};
export default CandidateDisplay;
