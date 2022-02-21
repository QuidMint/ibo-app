import { WebSocketProvider } from '@ethersproject/providers';

const rpcWss = 'wss://ropsten.infura.io/ws/v3/da1899e74ba24705a649236d9da11140';

export const webSocketProvider = new WebSocketProvider(rpcWss, 'rinkeby');

// console.log(webSocketProvider._websocket);

// webSocketProvider._websocket.on('open', async () => {
//   console.log('[WebSocketProvider]: Socket connected!');
// });

// webSocketProvider._websocket.on('error', async () => {
//   console.log(
//     `[WebSocketProvider]: Unable to connect to ${rpcWss} retrying in 3s...`,
//   );
//   // todo: retrying
// });

// webSocketProvider._websocket.on('close', async (code: unknown) => {
//   console.log(
//     `[WebSocketProvider]: Connection lost with code ${code}! Attempting reconnect in 3s...`,
//   );
//   // wsProvider._websocket.terminate();
//   // todo: retrying
// });
