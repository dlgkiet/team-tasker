import { Toaster } from "./components/ui/sonner";
import AppRoutes from "./routes";

function App() {
    return (
        <div id="app">
            <AppRoutes />
            <Toaster />
        </div>
    );
}

export default App;
