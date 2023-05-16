import Head from "next/head";
import { useState } from "react";

export default function Home() {
  // get result from the API using fetch
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");

  console.log(
    "summarise the text in 50 sentences\n\n" + "'" + text + "'"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/summarise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "summarise the text in brief\n\n" + text,
        }),
      });
      console.log(res);
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      setResult(json.name);
      console.log(json);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Summariser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen container mx-auto px-4 sm:px-8">
        <Navbar />

        <div className="text-center">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="w-full mt-16 mb-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="px-4 py-2 bg-white rounded-t-lg">
                {/* <label htmlFor="comment" className="sr-only">
                  Your comment
                </label> */}
                <textarea
                  id="comment"
                  rows="8"
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:outline-none"
                  placeholder="Enter text to summarise"
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-600 rounded-lg group bg-gradient-to-br from-purple-400 to-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  type="submit"
                  disabled={loading}
                >
                  <span className="relative md:px-6 px-3 py-1.5 transition-all ease-in duration-75 bg-white rounded-md w-full">
                    {loading ? (
                      <>
                        <svg
                          role="status"
                          className="inline mr-3 w-4 h-4 text-purple-500 animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Summarising
                      </>
                    ) : (
                      "Summarise"
                    )}
                  </span>
                </button>
                <div className="flex pl-0 space-x-1 sm:pl-2">
                  <div className="flex items-center mr-4">
                    <input
                      id="inline-radio"
                      type="radio"
                      checked
                      value=""
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="inline-radio"
                      className="ml-2 text-sm font-medium text-gray-600"
                    >
                      Text
                    </label>
                  </div>
                  <div className="flex items-center mr-4">
                    <input
                      id="inline-2-radio"
                      type="radio"
                      value=""
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="inline-2-radio"
                      className="ml-2 text-sm font-medium text-gray-600"
                    >
                      URL
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {result && (
            <blockquote className="text-sm md:text-base font-normal text-left pt-20 text-gray-900">
              <svg
                aria-hidden="true"
                className="w-10 h-10 text-gray-400"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <p>{result}</p>
            </blockquote>
          )}
        </div>
      </main>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" />
        </a>
      </footer> */}
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex justify-center md:justify-between items-center py-4">
      <h2 className="text-3xl bg-white rounded-lg font-semibold leading-tight animate-gradient bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent tracking-widest md:tracking-wider">
        Summariser
      </h2>
      <h2 className="text-3xl font-semibold leading-tight text-zinc-300  tracking-widest md:tracking-wider hidden md:flex">
        OpenAI GPT-3
      </h2>
    </div>
  );
}
