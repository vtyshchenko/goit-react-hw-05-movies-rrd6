import { Pagination, Stack, PaginationItem } from '@mui/material';

import { useSearchParams } from 'react-router-dom';
import styles from './FilmPagination.module.scss';

export default function FilmPagination({ pageTotal, page, setPage }) {
  const [searchParams, setsearchParams] = useSearchParams();
  return (
    <>
      <Stack spacing={2}>
        <Pagination
          className={styles.pagination}
          count={pageTotal}
          page={Number(page)}
          color={'primary'}
          onChange={(e, value) => {
            setPage(value);
            const text = searchParams.get('query') || null;
            const params = {};
            if (text) {
              params.query = text;
            }
            params.page = value;

            setsearchParams(params);
          }}
        >
          <PaginationItem selected={true} /> ;
        </Pagination>
      </Stack>
      ;
    </>
  );
}
