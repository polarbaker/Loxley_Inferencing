import { httpRouter } from 'convex/server';
import { receiveImage, testGetMessage } from './httpActions';

const http = httpRouter();

http.route({
  path: '/test',
  method: 'GET',
  handler: testGetMessage,
});

http.route({
  path: '/image',
  method: 'POST',
  handler: receiveImage,
});

export default http;
