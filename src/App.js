import List from "./containers/List";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark border-bottom border-white">
        <a href="/" className="navbar-brand">
          MovieApp
        </a>
      </nav>
      <main className="bg-dark">
        <div className="container">
          <List />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
