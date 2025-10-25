import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RevenuePage from "./pages/RevenuePage";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen  bg-white ">
        <Header />
        <Sidebar />
        <main className="ml-8 md:ml-20 pt-20">
          <RevenuePage />
        </main>
      </div>
    </Provider>
  );
}

export default App;
