import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import ChartComponent from 'component/ChartComponent';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <ChartComponent />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
