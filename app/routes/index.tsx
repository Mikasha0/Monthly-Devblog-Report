import {Link} from '@remix-run/react';

export default function Index() {
  return (
    <main id='content'>
      <h1>A better way to keeping track of your todos.</h1>
      <p>Try our early beta and never loose track of your todos.</p>
      <p id='cta'>
        <Link to='/toDoList'>Try Now!</Link>
      </p>
    </main>
  );
}
