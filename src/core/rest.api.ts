import axios from 'axios';

export const getUser = async (page: number, results: number) => {
  try {
    let res = await axios.get(`https://randomuser.me/api/?page=${page}&results=${results}`)
    return res?.data
  } catch (err) {
    console.log('error ', err)
    return {}
  }
}