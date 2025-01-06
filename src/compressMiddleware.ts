import compression from 'compression';
import { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import nextConnect from 'next-connect';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// Use compression middleware
handler.use(compression());

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Hello with compression!' });
});

export default handler;
