import { useState } from "react";
import AuthForm from "./components/AuthForm";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
