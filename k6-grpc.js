import grpc from 'k6/net/grpc';
import { check } from 'k6';

const client = new grpc.Client();
client.load([], './helloworld/helloworld.proto');

let connected = false;

export const options = {
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'constant-vus',
        vus: 800,
        duration: '15s',
        gracefulStop: '0s',
      },
    },
};


export default () => {
  if (!connected) {
    client.connect('localhost:50051', {
       plaintext: true
    });
    connected = true
  }

  const response = client.invoke('/helloworld.Greeter/SayHello', {});
  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

};

export function teardown(data) {
  client.close();
}