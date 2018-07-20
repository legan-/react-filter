import faker from 'faker';


const numberOfOpportunities = faker.random.number({ min: 5, max: 10 });

const opportunities = new Array(numberOfOpportunities).fill().map( (o, i) => ({
  company: faker.company.companyName(),
  tradingActive: faker.random.boolean(),
  averageInvestment: faker.random.number({ min: 1000, max: 10000 }),
  totalRaised: faker.random.number({ min: 100000, max: 9999999 }),
  eis: faker.random.boolean(),
  seis: faker.random.boolean()
}));

export default { opportunities };