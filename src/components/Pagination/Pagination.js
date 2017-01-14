import React, { Component, PropTypes } from 'react';
import Wrapper from './index';

function Children({ renderRow, data }) {
  console.log('children data', data)
  return Object.keys(data).map((item, index) => renderRow(item, index));
}

function Pagination() {
  return (
    <Wrapper
      {...props}
    >
      <Children onCellClick={onCellClick} renderRow={renderRow} />
    </Wrapper>
  );
}
