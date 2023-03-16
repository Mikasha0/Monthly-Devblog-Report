import {Link} from '@remix-run/react';
import homeStyles from '~/styles/home.css';

export default function Index() {
  return (
    <main id='content'>
      <h1>Why not use an app to manage your blogs better?</h1>
      <p>Try our early beta and never loose track of your blogs.</p>
      <p id='cta'>
        <Link to='/blog'>Getting Started!</Link>
      </p>
    </main>
  );
}

export function links(){
  return [{rel:'stylesheet', href:homeStyles}]
}
