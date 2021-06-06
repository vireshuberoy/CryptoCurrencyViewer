import Homepage from "./components/Homepage/Homepage";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Cryptocurrency from "./components/Cryptocurrency/Cryptocurrency";
import NavBar from "./components/NavBar/NavBar";
import Top5 from "./components/Top5/Top5.jsx";
import Top30 from "./components/Top30/Top30";
import News from "./components/News/News.jsx";
import MarketCrash from "./components/MarketCrash/MarketCrash";
import Footer from "./components/Footer/Footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div
      className="App"
    >
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/signin" component={SignIn} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/cryptocurrency/:id" component={Cryptocurrency} exact />
          <Route path="/top5" component={Top5} exact />
          <Route path="/top30" component={Top30} exact />
          <Route path="/news" component={News} exact />
          <Route path="/marketcrash" component={MarketCrash} exact />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
