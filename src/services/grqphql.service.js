import axios from 'axios';

export const gQuery = ({operationType, operationName, payload, fieldsToGet}) => {
  return axios.post('http://localhost:8000/graphql', {
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
  return axios.post('http://localhost:8000/graphql', {
    query: `
      ${operationType} {
        ${operationName} ${
          fieldsToGet
        }
      }
    `
  });
};