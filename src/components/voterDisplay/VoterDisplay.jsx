import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../wallet/Wallet";
import "./VoterDisplay.css";

const VoterDisplay = () => {
  return (
    <div className="table-container">
      <table className="voter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  );
};

export default VoterDisplay;
