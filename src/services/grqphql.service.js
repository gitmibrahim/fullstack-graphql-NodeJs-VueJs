import axios from 'axios';

export const gQuery = ({operationType, operationName, payload, fieldsToGet}) => {
  return axios.post('https://shrouded-bastion-47607.herokuapp.com/graphql', {
    query: `
      ${operationType} {
        ${operationName}(input: ${payload}) ${
          fieldsToGet
        }
      }
    `
  });
};

export const gQueryWithoutPayload = ({operationType, operationName, fieldsToGet}) => {
  return axios.post('https://shrouded-bastion-47607.herokuapp.com/graphql', {
    query: `
      ${operationType} {
        ${operationName} ${
          fieldsToGet
        }
      }
    `
  });
};