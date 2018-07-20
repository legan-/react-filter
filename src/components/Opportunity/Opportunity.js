import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Icon,
} from 'semantic-ui-react';

const Opportunity = ({ opportunity }) => {
  const {
    company,
    tradingActive,
    averageInvestment,
    totalRaised,
    eis,
    seis
  } = opportunity;

  const icon = state => {
    const iconName = state ? 'check' : 'times';
    return <Icon name={ iconName } size='small' />;
  }

  return (
    <Table.Row>
      <Table.Cell>
        { company }
      </Table.Cell>
      <Table.Cell textAlign='center'>
        { icon(tradingActive) }
      </Table.Cell>
      <Table.Cell>
        £{ averageInvestment }
      </Table.Cell>
      <Table.Cell>
        £{ totalRaised }
      </Table.Cell>
      <Table.Cell textAlign='center'>
        { icon(eis) }
      </Table.Cell>
      <Table.Cell textAlign='center'>
        { icon(seis) }
      </Table.Cell>
    </Table.Row>
  )
}

Opportunity.propTypes = {
  opportunity: PropTypes.shape({
    company:            PropTypes.string.isRequired,
    tradingActive:      PropTypes.bool.isRequired,
    averageInvestment:  PropTypes.number.isRequired,
    totalRaised:        PropTypes.number.isRequired,
    eis:                PropTypes.bool.isRequired,
    seis:               PropTypes.bool.isRequired
  })
}

export default Opportunity;