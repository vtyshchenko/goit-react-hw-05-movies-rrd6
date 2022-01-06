import { Link } from 'react-router-dom';

import styles from './MovieInfo.module.scss';

export default function MovieInfo({ item, locate, url }) {
  const path = `${locate ? locate.pathname : url}/${item.id}`;
  const state = locate ? { from: locate } : null;

  return (
    <li className={styles.movieItem} key={item.id}>
      <Link to={path} state={state}>
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title}
        ></img>
        <div className={styles.info}>
          {item.title}
          <p>
            {item.vote_average} / {item.vote_count}
          </p>
        </div>
      </Link>
    </li>
  );
}
