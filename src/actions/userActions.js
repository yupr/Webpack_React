export const setUserDataAction = (data) => {
  console.log('dataaaaaa', data);
  return {
    type: 'INPUT_DATA',
    payload: data
  };
}