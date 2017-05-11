import React from 'react'
import classes from './PaginationControl.scss'
import {Link} from 'react-router'
import range from 'lodash/range'
import cx from 'classnames'

export const PaginationControl = ({className, query, pathname, maxPages}) => {
  const {page, ...nextQuery} = query;
  const currPage = parseInt(page || 1);
  let start = 1;
  let end = maxPages;
  if (maxPages > 5) {
    start = Math.max(1, currPage - 2);
    end = Math.min(maxPages, currPage + 2);
    if (end - start !== 4) {
      if (start === 1) {
        end = 5;
      }
      else {
        start = maxPages - 4;
      }
    }
  }
  const pagesToShow = range(start, end + 1);
  return (
    <div className={cx(classes.pagination_bar, className)}>
      <TurnBtn show={start !== 1} direction={<i className="material-icons">first_page</i>} pathname={pathname}
               nextQuery={nextQuery}
               num={1}/>
      <TurnBtn show={currPage !== 1} direction={<i className="material-icons">navigate_before</i>} pathname={pathname}
               nextQuery={nextQuery}
               num={Math.max(1, currPage - 1)}/>
      {pagesToShow.map(num => <PageBtn key={num} num={num} pathname={pathname} nextQuery={nextQuery}
                                       active={num === currPage}/>)}
      <TurnBtn show={currPage !== maxPages} direction={<i className="material-icons">navigate_next</i>}
               pathname={pathname} nextQuery={nextQuery}
               num={Math.min(maxPages, currPage + 1)}/>
      <TurnBtn show={end !== maxPages} direction={<i className="material-icons">last_page</i>} pathname={pathname}
               nextQuery={nextQuery}
               num={maxPages}/>
    </div>
  )
};

const TurnBtn = ({direction, pathname, nextQuery, num, show}) =>
  <span>
    {show ?
      <Link className={classes.nav_btn} to={{pathname, query: {...nextQuery, page: num}}}>
        {direction}
      </Link> :
      <span className={classes.nav_btn}/>
    }
  </span>;

const PageBtn = ({num, pathname, nextQuery, active}) =>
  <Link className={cx(classes.nav_btn, {[classes.active_btn]: active})}
        to={{pathname, query: {...nextQuery, page: num}}}>
    <strong>{num}</strong>
  </Link>;

export default PaginationControl




