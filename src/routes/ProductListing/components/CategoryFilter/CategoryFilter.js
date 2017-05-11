import React from 'react'
import classes from './CategoryFilter.scss'
import {Link} from 'react-router'

export const CategoryFilter = ({activeCategories, toggleCategoryParams, pathname, query}) => {
  return (
    <div className={classes.filter_panel}>
      <strong>
        Categories
      </strong>
      {Object.keys(activeCategories).map(key =>
        <CategoryFilterItem
          categoryStr={toggleCategoryParams(key)}
          query={query}
          pathname={pathname}
          active={activeCategories[key]}
          key={key}
          categoryName={key}
        />
      )}
    </div>
  )
};

const CategoryFilterItem = ({categoryStr, query, pathname, active, categoryName}) =>{
  const {category, ...nextQuery} = query;
  return (
    <p style={{color: active ? 'green':'black', paddingLeft: '10px'}}>
      <strong>
        <Link to={{pathname, query: categoryStr.length > 0 ? {...nextQuery, category: categoryStr} : nextQuery}}>
          {categoryName}
        </Link>
      </strong>
    </p>
  )
};

export default CategoryFilter
