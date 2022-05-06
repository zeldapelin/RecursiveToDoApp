import '../styles/globals.css';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
      <div className="h-screen bg-red-200 text-blue-500">
        <Component {...pageProps} />
      </div>
      
  );
}

export default MyApp;
