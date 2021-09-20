export const setUserDataAction = (data) => {
  console.log('data', data);
  return {
    type: 'INPUT_DATA',
    payload: data
  };
}