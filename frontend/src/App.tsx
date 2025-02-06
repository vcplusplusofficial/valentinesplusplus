import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import FetchComponent from "./FetchComponent";
import Card1 from "./cards/card1/Card1";
import DynamicRouteHandler from "./DynamicRouteHandler";

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* Use <Routes> instead of <Switch> */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />

          <Route path="*" element={<DynamicRouteHandler />} />
        </Routes>

      </div>
    </Router>
  );
}

function Home() {
  return ( 
  <div> 
     <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/steven2">steven2</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
    <FetchComponent /> 
  </div>
  );
}

function About() {
  return (
    <>
      {/* <Card1 /> */}
    </>
  );
}

function Users() {
  return <h2>Users</h2>;
}