import * as R from "@src/allFiles";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <R.CommonRouter />
      <ToastContainer limit={1} />
    </>
  );
};

export default App