import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/Auth/auth.reducer";

function Login() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const validateInput = () => {
    if (isNaN(input)) return false;
    if (input.length !== 10) return false;
    return true;
  };

  return (
    <div className="container justify-center w-3/4 max-w-xs mx-auto flex flex-col">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Mobile Number"
        className="bg-color-white max-w-xs px-2 rounded-md my-3 mx-auto py-2 border border-slate-300"
      />
      <button
        disabled={!validateInput()}
        onClick={() => dispatch(login(input))}
        className="bg-green-500 disabled:bg-slate-400 disabled:text-slate-600 drop-shadow-md py-2 mx-auto mt-3 w-min px-7 rounded-md font-semibold hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  );
}

export default Login;
