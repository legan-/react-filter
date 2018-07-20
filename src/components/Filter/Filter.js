import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Input,
} from 'semantic-ui-react';


const Filter = ({ searchFieldRef, onSearchChange, onClearSearchClick, onFilterClick, filterStates }) => {
  return (
    <div>
      <Input type='text' placeholder='Search...' action>
        <input onChange={ e => onSearchChange(e) } ref={ searchFieldRef }/>
        <Button basic onClick={ () => onClearSearchClick() }>Clear</Button>
      </Input>
      { ' ' }
      <Button.Group>
        <Button toggle active={ filterStates.tradingActive } onClick={ () => onFilterClick('tradingActive') }>
          Actively trading
        </Button>
        <Button toggle active={ filterStates.eis } onClick={ () => onFilterClick('eis') }>
          EIS
        </Button>
        <Button toggle active={ filterStates.seis } onClick={ () => onFilterClick('seis') }>
          SEIS
        </Button>
      </Button.Group>
    </div>
  );
}

Filter.propTypes = {
  searchFieldRef:     PropTypes.func.isRequired,
  onSearchChange:     PropTypes.func.isRequired,
  onClearSearchClick: PropTypes.func.isRequired,
  onFilterClick:      PropTypes.func.isRequired,
  filterStates:       PropTypes.shape({
    tradingActive:    PropTypes.bool.isRequired,
    eis:              PropTypes.bool.isRequired,
    seis:             PropTypes.bool.isRequired,
  }).isRequired,
}

export default Filter;
