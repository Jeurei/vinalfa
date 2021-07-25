const dotenv = require('dotenv');

const token = document.getElementById('module')?.dataset.token;

const version = 'v1';
const server = `https://api.vinalfa.com/oem/${version}`;

const bearer = `Bearer ${
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg0MDBjODhhZDY3NGUwNTJlODU0YmYzNTE2ZjI5NTMzNDM4YjhhNDFhOGU5M2VlNGNkOTMyN2Q0YjFkZDY3MzgzNjYyODNhNjcwZTRiYTQyIn0.eyJhdWQiOiIxIiwianRpIjoiODQwMGM4OGFkNjc0ZTA1MmU4NTRiZjM1MTZmMjk1MzM0MzhiOGE0MWE4ZTkzZWU0Y2Q5MzI3ZDRiMWRkNjczODM2NjI4M2E2NzBlNGJhNDIiLCJpYXQiOjE2MTI1MzEwMTEsIm5iZiI6MTYxMjUzMTAxMSwiZXhwIjoxNjQ0MDY3MDExLCJzdWIiOiI0NSIsInNjb3BlcyI6W119.sNG_H3SG6MF6g-sZYtrYoGTn6cqnsNd8skfYmzLJyw6wEs82RCv6BMGt9nbsOju6cx57lSm8Y8YXLQ0W4KVBzSHwaiJU3kBku_UL3BJ4ihsVNTQGQepddBwIx4yHnWRlkiKkIFiTnx6ZaavYBrBxTg3mvWYBUekWAhdfR3r9l8qLjJnvsnjyicIz8LSnWwPhhjSzIfIeAKsDggX1jwjKgjbXVuktxvj4WhT4dmSrJR3c73iUhiOPvs69RAiggEZRTI1FYgnfHV-pUoQmbjVkTtAkbIVJrwnKpVrsMNzdoPnMDxFCwdQcqg3z2Az9gOuKTj8CMHJCeiY24FH1w0lHDwn6UCxs8MTNHQpv9jJ70zWubn6Kg4GQhFcFbMabegK9wc_isWb3YT76yz-P2pOzcq7vPlMNpHzjgDlYqkkaUgPhmeF3rxXKbUqrb_ZrCU9jknsm18nU2G1d5cn23_EwRr55zj5mTUzsv4C9L7Qm6kYgsxShdR7gDCILXLX_z8FhMTo7k_U6KjOWyvuFnVKADZ4HJkfsvMxNwbHiVEmJ1q3bd7giLBVwl3-giHbWzH4BzXsxZ6v6iWBt3BYnw1sIS3aEVaWmVP0x00jva-vpZ5cvSoDF1RE3ZEnaBlJHqwEqO9jk9i_IfMTfnGDzIefJKi2tqnPqpIiu7RmspLSt5Ho' ||
  process.env.REACT_APP_BEARER
}`;

const config = {
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: bearer,
  },
};

const getModifications = async (vin) => {
  const response = await fetch(`${server}/modifications/getByVin?vin=${vin}`, config);
  const data = await response.json();

  if (!response.ok || data.status !== 'success') throw data.message || setError(response.status);
  return data;
};

const getGroups = async (hash) => {
  const response = await fetch(`${server}/sections/getGroupsByHash?hash=${hash}`, config);
  const data = await response.json();

  if (!response.ok || data.status !== 'success') throw data.message || setError(response.status);
  return data;
};

const getSubgroup = async (hash) => {
  const response = await fetch(`${server}/sections/getSubgroupsByHash?hash=${hash}`, config);
  const data = await response.json();

  if (!response.ok) throw data.message || setError(response.status);

  return data;
};

const getParts = async (hash) => {
  const response = await fetch(`${server}/parts/getByHash?hash=${hash}`, config);
  const data = await response.json();

  if (!response.ok || data.status !== 'success') throw data.message || setError(response.status);

  return data;
};

const getCatalogs = async () => {
  const response = await fetch(`${server}/models/get`, config);
  const data = await response.json();

  if (!response.ok || data.status) throw data.message || setError(response.status);
  return data;
};

const searchByHash = async (hash, search) => {
  const response = await fetch(
    `${server}/search/searchByHash?search=${search}&hash=${hash}`,
    config
  );
  const data = await response.json();

  if (!response.ok || data.status !== 'success') throw setError(response.status);
  return data;
};

const getQuickSearch = async () => {
  const response = await fetch(`${server}/search/getSearchBlockList`, config);
  const data = await response.json();
  if (!response.ok || data.status !== 'success') throw setError(response.status);
  return data;
};

const setError = (code) => {
  switch (code) {
    case 404:
      return 'Страница не найдена';
    default:
      return 'Непредвиденная ошибка';
  }
};

export {
  server,
  bearer,
  getModifications,
  getGroups,
  getSubgroup,
  getParts,
  getCatalogs,
  searchByHash,
  getQuickSearch,
};
