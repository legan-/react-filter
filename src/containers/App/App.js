import React, { Component } from 'react';
import {
  Container,
  Message,
  Header,
  Grid,
  Icon,
} from 'semantic-ui-react';

import { fetchOpportunities } from '../../actions';
import Filter from '../../components/Filter';
import List from '../../components/List/';


class App extends Component {
  constructor() {
    super();
    this.state = {
      list: {
        raw: [],
        sorted: [],
        filtered: [],
        isLoaded: false,
        isFiltered: false
      },
      sort: {
        isDesc: true,
        type: ''
      },
      filter: {
        tradingActive: false,
        eis: false,
        seis: false,
      }
    };

    this.searchField = '';
  }

  parseOpportunities(data = {}) {
    const keys = Object.keys(data);

    if (keys.length !== 0 && keys.includes('opportunities')) {
      this.setState(state => ({
        list: {
          ...state.list,
          raw: data.opportunities,
          isLoaded: true
        }
      }));
    }
  }

  sortOpportunities() {
    const data    = this.state.list.isFiltered ? this.state.list.filtered : this.state.list.raw;
    const isDesc  = this.state.sort.isDesc; 
    const type    = this.state.sort.type;

    const order = (a, b) => isDesc ? (b - a) : (a - b); 

    if (data.length) {
      const sorted = Array.prototype.slice.call(data).sort( (a, b) => order(a[type], b[type]));

      this.setState(state => ({
        list: {
          ...state.list,
          sorted
        }
      }));
    }
  }

  switchCurrentSortTypeTo(type) {
    let update = new Promise( (resolve, reject) => {
      if (this.state.sort.type === type) {
        resolve(this.setState(state => ({
          sort: {
            ...state.sort,
            isDesc: !state.sort.isDesc
          }
        })));

      } else {
        resolve(this.setState(state => ({
          sort: {
            isDesc: true,
            type: type
          }
        })));
      }
    });

    update.then( () => this.sortOpportunities());
  }

  sortBtnHandler(type) {
    this.switchCurrentSortTypeTo(type);
  }

  filterBy(type, x = '') {
    switch(type) {
      // filter by value
      case 0:
        const value = x.toLowerCase();

        return new Promise( (resolve, reject) => {
          if (value.length) {
            const filtered = this.state.list.raw.filter( e => e.company.toLowerCase().includes(value) );
            resolve(this.setState(state => ({
              list: {
                ...state.list,
                filtered,
                isFiltered: true
              }
            })));
          } else {
            resolve(this.setState(state => ({
              list: {
                ...state.list,
                filtered: [],
                isFiltered: false
              }
            })));
          }
        });

      // filter by property
      case 1:
        return new Promise( (resolve, reject) => {
          const tradingActive = this.state.filter.tradingActive;
          const eis = this.state.filter.eis;
          const seis = this.state.filter.seis;

          const filtered = this.state.list.raw
            .filter( e => (tradingActive ? e.tradingActive : true) )
            .filter( e => (eis ? e.eis : true) )
            .filter( e => (seis ? e.seis : true) );

          resolve(this.setState(state => ({
            list: {
              ...state.list,
              filtered,
            }
          })));
        });
      // no default
    }
  }

  searchFieldHandler(e) {
    this.filterBy(0, e.target.value).then( () => this.sortOpportunities());
  }

  clearSearchHandler() {
    this.searchField.value = '';
    this.filterBy(0, '').then( () => this.sortOpportunities())
  }

  toggleFilterState(type) {
    return new Promise( (resolve, reject) => {
      resolve(this.setState(state => ({
        filter: {
          ...state.filter,
          [type]: !state.filter[type]
        }
      })));
    });
  }

  toggleIsFilteredState() {
    const filter = [
      this.state.list.isFiltered,
      this.state.filter.tradingActive,
      this.state.filter.eis,
      this.state.filter.seis
    ];

    const isFiltered = filter.some( x => x === true );

    return new Promise( (resolve, reject) => {
      resolve(this.setState(state => ({
        list: {
          ...state.list,
          isFiltered
        }
      })));
    });    
  }

  onFilterChange(type) {
    this.toggleFilterState(type)
      .then( () => this.toggleIsFilteredState())
      .then( () => this.filterBy(1))
      .then( () => this.sortOpportunities());
  }

  updateOpportunities() {
    fetchOpportunities()
      .then( opportunities => this.parseOpportunities(opportunities))
      .then( ()            => this.switchCurrentSortTypeTo('totalRaised'));
  }

  componentDidMount() {
    this.updateOpportunities();
  }

  render() {
    const loading = (
      <Message icon size='small' >
        <Icon name='spinner' loading />
        <Message.Content>
          Loading...
        </Message.Content>
      </Message>
    );

    const list = (
      <div>
        <Filter
          searchFieldRef={ e => this.searchField = e }
          onSearchChange={ e => this.searchFieldHandler(e) }
          onClearSearchClick={ () => this.clearSearchHandler() }
          onFilterClick={ type => this.onFilterChange(type) }
          filterStates={ this.state.filter }
        />
        <br />
        <List
          opportunities={ this.state.list.sorted }
          sort={ this.state.sort }
          onSortBtnClick={ type => this.sortBtnHandler(type) }
        />
      </div>
    );

    const content = this.state.list.isLoaded ? list : loading;

    return (
      <Container>
        <br />
        <Header as='h1' textAlign='center'>Opportunities</Header>
        <Grid centered columns={ 1 }>
          <Grid.Column>
            { content }
            <br />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default App;