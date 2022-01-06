import PropTypes from 'prop-types';
import styles from './views.module.scss';
import NoFotoMale from '../images/no-foto-male.jpg';

export default function ReviewsView({ review }) {
  return review.length > 0 ? (
    <ul className={styles.reviewList}>
      {review.map(item => {
        const avatar_path = item.author_details.avatar_path
          ? item.author_details.avatar_path.substring(1)
          : NoFotoMale;
        return (
          <li
            key={`${item.author}_${item.created_at}`}
            className={styles.reviewInfo}
          >
            <img
              className={styles.reviewAvatar}
              src={avatar_path}
              alt={item.author}
              width={'100px'}
              height={'100px'}
            ></img>
            <div className={styles.castsData}>
              <p className={styles.castsText}>
                <span className={styles.isBold}>name: </span>
                {item.author} (created: {item.created_at})
              </p>

              <p className={styles.castsText}>{item.content}</p>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <p className={styles.reviewList}>We don't have any review</p>
  );
}

ReviewsView.propTypes = {
  review: PropTypes.arrayOf(
    PropTypes.shape({
      author_details: PropTypes.object.isRequired,
      author: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),
};
