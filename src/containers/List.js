import React from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
const API = `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_MOVIE_KEY}`;

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      db: [],
      searchTerm: "",
      error: "",
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await fetch(`${API}&s=robot`);
    const resJSON = await res.json();
    console.log(resJSON);
    this.setState({ db: resJSON.Search, loading: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    if (!this.state.searchTerm) {
      return this.setState({
        error: "Por favor escribe un texto valido",
        loading: false,
      });
    }

    let urlSearched = `${API}&s=${this.state.searchTerm}`;
    let res = await fetch(urlSearched);
    let data = await res.json();
    console.log(data);

    if (!data.Search) {
      return this.setState({ error: "No hay resultados", loading: false });
    }

    this.setState({
      db: data.Search,
      error: "",
      searchTerm: "",
      loading: false,
    });
  }

  render() {
    const { db, loading } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-md-4 offset-md-4 p-4">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar"
                autoComplete="off"
                autoFocus
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                value={this.state.searchTerm}
              />
            </form>
            <p className="text-white">
              {this.state.error ? this.state.error : ""}
            </p>
            {loading && <Loader />}
          </div>
        </div>
        <div className="row">
          {db.map((movie) => {
            return <Card key={movie.imdbID} movie={movie} />;
          })}
        </div>
      </div>
    );
  }
}

export default List;
