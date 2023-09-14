import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Link to="/palindromos">Palindromos</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Link to="/troco">Troco</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Link to="/veiculos">Veiculo</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Link to="/ceps">Ceps</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
