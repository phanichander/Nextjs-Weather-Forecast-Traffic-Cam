import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const resp = new Promise(() => {
    return axios({
      method:'get',
      url: req.url
    }).then((response) => {
     return response;
    }).catch(error => {
      console.error(error)
      return error;
    });
  })

  res.status(200).json(resp)
}
