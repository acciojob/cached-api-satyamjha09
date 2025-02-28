import React, { useState } from "react";
import CachedAPI from "./CachedAPI";

const App = () => {
  const [userId, setUserId] = useState(1);

  return (
    <div>
      <h1>Cached API Demo</h1>
      <button onClick={() => setUserId(userId === 1 ? 2 : 1)}>
        Switch User
      </button>
      <CachedAPI userId={userId} />
    </div>
  );
};

export default App;
