import opportunities from './opportunities';


const TIMEOUT = 400;

export default {
  receiveOpportunities: data => setTimeout( () => data(opportunities), TIMEOUT),
}