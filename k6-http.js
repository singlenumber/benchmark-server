import http from 'k6/http';

export const options = {
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'constant-vus',
        vus: 400,
        duration: '15s',
        gracefulStop: '0s',
      },
    },
};


export default function () {
  const res = http.get('http://localhost:8000/ping');
}