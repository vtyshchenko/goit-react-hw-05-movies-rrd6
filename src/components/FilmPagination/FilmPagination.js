import { Pagination, Stack, PaginationItem } from '@mui/material';
import PropTypes from 'prop-types';

import { useSearchParams } from 'react-router-dom';
import styles from './FilmPagination.module.scss';

export default function FilmPagination({ pageTotal, page, setPage }) {
  const hendlerSubmit = (e, value) => {
    setPage(value);
    const text = searchParams.get('query') || null;
    const params = {};
    if (text) {
      params.query = text;
    }
    params.page = value;

    setsearchParams(params);
  };

  const [searchParams, setsearchParams] = useSearchParams();
  return (
    <>
      <Stack spacing={2}>
        <Pagination
          className={styles.pagination}
          count={pageTotal}
          page={Number(page)}
          color={'primary'}
          onChange={hendlerSubmit}
        >
          <PaginationItem selected={true} /> ;
        </Pagination>
      </Stack>
      ;
    </>
  );
}

FilmPagination.propTypes = {
  pageTotal: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
