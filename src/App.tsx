import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import ChartPage from 'pages/ChartPage';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <ChartPage />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
