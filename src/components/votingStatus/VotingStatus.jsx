import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../wallet/Wallet";

const VotingStatus = () => {
  const [voteStatus, setVoteStatus] = useState("");
  const statusColor = true === "Voting in progress" ? "#2DFF2D" : "red";

  return (
    <div style={{ display: "flex" }}>
      Vote Status :
      <div style={{ color: statusColor }}>
        {voteStatus === null ? "no status" : voteStatus}
      </div>
    </div>
  );
};

export default VotingStatus;
