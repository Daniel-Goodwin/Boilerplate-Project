import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';

import Wrapper from 'components/Pagination';

// TODO pass other table props down.. nicer way to do it?
function Children({ fields, headers, tableProps, tableBodyProps, tableHeaderProps, onRowClick, data }) {
  return (
    <Table
      {...tableProps}
      onCellClick={(index) => {
        if (onRowClick) {
          onRowClick(data[index], index);
        }
      }}
    >
      <TableHeader {...tableHeaderProps}>
        <TableRow>
          {Object.keys(fields).map((field) => {
            return (
              <TableHeaderColumn style={{ overflow: 'hidden', width: 32, padding: '0 6px', textAlign: 'center' }} key={field}>
                {headers[field] || field}
              </TableHeaderColumn>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody {...tableBodyProps}>
        {data.map((item, index) => {
          return (
            <TableRow key={`row_${index}`} className={!!onRowClick ? 'hover' : ''}>
              {Object.keys(fields).map((key, index) => {
                let result = item[key];
                const transformer = fields[key];

                if (typeof transformer === 'function') {
                  result = transformer(result);
                }

                return (
                  <TableRowColumn
                    key={`column_${index}`}
                    data-title={headers[key] || key}
                    style={{textAlign: 'center'}}
                  >
                    {result}
                  </TableRowColumn>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function TableWrapper({ fields, headers, tableProps, tableBodyProps, tableHeaderProps, onRowClick, ...props }) {
  return (
    <Wrapper
      {...props}
    >
      <Children
        fields={fields}
        headers={headers || {}}
        tableProps={tableProps}
        tableBodyProps={tableBodyProps}
        tableHeaderProps={tableHeaderProps}
        onRowClick={onRowClick}
      />
    </Wrapper>
  );
}

function select(state) {
  return {
    isDesktop: state.window.isDesktop,
  }
}

export default connect(select)(TableWrapper);
