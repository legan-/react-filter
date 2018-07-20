import internalData from '../api/internal';

export const fetchOpportunities = () => {
  return new Promise( (resolve, reject) => {
    internalData.receiveOpportunities( data => resolve(data));
  });
};