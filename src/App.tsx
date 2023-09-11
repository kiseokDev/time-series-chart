import Chart from 'component/Chart';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Chart />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
