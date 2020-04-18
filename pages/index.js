import Head from 'next/head';
import {useState} from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  return (
    <div className="container">
      <Head>
        <title>Kitspace Builds</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <button
          onClick={async () => {
            const res = await fetch('/api/trigger', {method: 'POST'}).then(r =>
              r.json(),
            );
            if (res['@type'] === 'error') {
              if (res.error_type === 'request_limit_reached') {
                setMessage(
                  `Error: reached limit of ${
                    res.max_requests
                  } re-build requests per ${res.per_second / 60} minutes.`,
                );
              } else {
                setMessage('Error: ' + res.error_message);
              }
            } else {
              setMessage(
                <>
                  Success, {res.remaining_requests} re-build requests left. View{' '}
                  <a href="https://travis-ci.org/github/kitspace/kitspace/branches">
                    build logs
                  </a>
                  .
                </>,
              );
            }
          }}>
          Trigger re-build
        </button>
        <div id="message">{message}</div>
      </main>

      <footer>
        <a href="https://kitspace.org">kitspace.org</a>
        <span>&nbsp;-&nbsp;</span>
        <a href="https://travis-ci.org/github/kitspace/kitspace/branches">
          build logs
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        #message {
          padding-top: 30px;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
