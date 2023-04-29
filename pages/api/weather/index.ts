import { DATA_GOV_SG_API } from '@/constants';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export const comments = [
  {
    id: 1,
    text: 'This is the first comment'
  },
  {
    id: 2,
    text: 'This is the second comment'
  },
  {
    id: 3,
    text: 'This is the third comment'
  }
]


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
      // reject(error.response);
    });
  })

  res.status(200).json(resp)
}
