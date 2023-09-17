import { useChart } from 'hooks/useChart';
import styled from 'styled-components';
import FilterButtons from 'components/FilterButtons';
import Graph from 'components/Graph';

const ChartPage = () => {
  const { data, uniqueIds, selectedId, setSelectedId } = useChart();

  const handleFilterById = (id: string) => {
    setSelectedId(id);
  };

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
export default ChartPage;

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
