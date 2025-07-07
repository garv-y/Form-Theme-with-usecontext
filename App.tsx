import { ThemeProvider } from "./context/ThemeContext";
import FormBuilder from "./Components/FormBuilder";
import "./app.css";

function App() {
  return (
    <ThemeProvider>
      <FormBuilder />
    </ThemeProvider>
  );
}

export default App;
