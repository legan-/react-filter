import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Icon
} from 'semantic-ui-react';

import Opportunity from '../Opportunity/';


const List = ({ opportunities, sort, onSortBtnClick }) => {

  const sortIcon = (type, order) => {
    const sortType = sort.type === type ? sort.isDesc ? 'sort down' : 'sort up' : 'sort';

    return <Icon name={ sortType } />;
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Company Name</Table.HeaderCell>
          <Table.HeaderCell>Actively trading</Table.HeaderCell>
          <Table.HeaderCell onClick={ () => onSortBtnClick('averageInvestment') }>Average Investment { sortIcon('averageInvestment') }</Table.HeaderCell>
          <Table.HeaderCell onClick={ () => onSortBtnClick('totalRaised') }>Funds Raised { sortIcon('totalRaised') }</Table.HeaderCell>
          <Table.HeaderCell>EIS</Table.HeaderCell>
          <Table.HeaderCell>SEIS</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          opportunities.map( (opportunity, id) => (
            <Opportunity
              key={ id }
              opportunity={ opportunity }
            />
          ))
        }
      </Table.Body>
    </Table>
  );
}

List.propTypes = {
  opportunities:  PropTypes.array.isRequired,
  sort:           PropTypes.shape({
    isDesc:       PropTypes.bool.isRequired,
    type:         PropTypes.string.isRequired
  }),
  onSortBtnClick: PropTypes.func.isRequired
}

export default List;