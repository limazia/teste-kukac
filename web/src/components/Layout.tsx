import { Link, Outlet } from "react-router-dom";

import { AnimatedOutlet } from "@components/AnimatedOutlet";

export function Layout() {
  return (
    <div className="container h-100">
      <div className="row mt-5 pb-5 justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <h1>
                <Link to="/">DESAFIO KUKAC</Link>
              </h1>
              <small className="text-muted">
                <a href="https://limazia.dev/" target="_blank" rel="noreferrer">
                  Criado por Acacio de Lima
                </a>
              </small>
            </div>
          </div>
          <div className="mt-4 pb-4">
            <AnimatedOutlet>
              <Outlet />
            </AnimatedOutlet>
          </div>
        </div>
      </div>
    </div>
  );
}
