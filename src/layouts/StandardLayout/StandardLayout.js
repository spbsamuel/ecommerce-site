import React from 'react';
import '../../styles/core.scss';
import ThemeHolderLayout from '../ThemeHolderLayout'

export const StandardLayout = ({children}) => (
  <ThemeHolderLayout>
    {children}
  </ThemeHolderLayout>
);

export default StandardLayout
