import { useChart } from 'hooks/useChart';
import Graph from '../component/Graph';
import styled from 'styled-components';
import FilterButtons from 'component/FilterButtons';

const ChartComponent = () => {
  const { data, uniqueIds, handleFilterById, selectedId } = useChart();

  return (
    <GraphWrapper>
      <ButtonContainer>
        <FilterButtons
          uniqueIds={uniqueIds}
          handleFilterById={handleFilterById}
        />
      </ButtonContainer>
      <Graph
        data={data}
        selectedId={selectedId}
        handleFilterById={handleFilterById}
      />
    </GraphWrapper>
  );
};
export default ChartComponent;

const ButtonContainer = styled.div`
  text-align: left;
`;

const GraphWrapper = styled.div`
  text-align: center;
  max-width: 100%;
  margin: 1rem auto;
  background: #fff;
  padding: 1.5rem 1rem;
  border-radius: 1.6rem;
  box-shadow: 0px 1rem 2rem rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    max-width: 720px;
    padding: 0rem 1.5rem;
  }

  @media (min-width: 992px) {
    max-width: 1000px;
    padding: 0rem 2rem;
  }
`;
