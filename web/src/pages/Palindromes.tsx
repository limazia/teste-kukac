import { useState } from "react";
import { toast } from "react-toastify";

import { getPalindromes } from "utils/services/api";
import { Palindrome as PalindromeResponse } from "utils/interfaces";

import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";

export function Palindromes() {
  const [response, setResponse] = useState<PalindromeResponse | null>(null);
  const [startNumber, setStartNumber] = useState<string>("");
  const [endNumber, setEndNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      loadPalindromes();

      setLoading(false);
    } catch (error) {
      toast.error("Tente novamente mais tarde");
    }
  }

  const loadPalindromes = async () => {
    const { results, error } = await getPalindromes(startNumber, endNumber);

    if (error) {
      toast.error(error);
    } else {
      setResponse(results);
    }
  };

  const isValid = () => loading || !startNumber || !endNumber;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Palíndromos</h5>

        <form onSubmit={handleSubmit}>
          <div className="row mt-4">
            <div className="col-md-6">
              <Input.Root>
                <label htmlFor="startNumber">Número 1</label>
                <Input.Content
                  type="number"
                  id="startNumber"
                  disabled={loading}
                  value={startNumber}
                  onChange={(e) => setStartNumber(e.target.value)}
                />
              </Input.Root>
            </div>
            <div className="col-md-6">
              <Input.Root>
                <label htmlFor="endNumber">Número 2</label>
                <Input.Content
                  type="number"
                  id="endNumber"
                  disabled={loading}
                  value={endNumber}
                  onChange={(e) => setEndNumber(e.target.value)}
                />
              </Input.Root>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <Button
                type="submit"
                className="btn btn-send btn-block"
                disabled={isValid()}
                loading={loading}
              >
                Palíndromos
              </Button>
            </div>
          </div>
        </form>

        {response && (
          <div className="row mt-4">
            <div className="col-md-12">
              <span>Números Palíndromos</span>

              <ul className="list-group mt-3">
                {response?.results.map((number) => (
                  <li key={`palindrome-${number}`} className="list-group-item">
                    {number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
