import styled from 'styled-components';

interface FilterButtonsProps {
  uniqueIds: string[];
  //eslint-disable-next-line no-unused-vars
  handleFilterById: (id: string | '') => void;
}
const FilterButtons: React.FC<FilterButtonsProps> = ({
  uniqueIds,
  handleFilterById,
}) => (
  <>
    <StyledButton onClick={() => handleFilterById('')}>해체</StyledButton>
    {uniqueIds.map(id => (
      <StyledButton key={id} onClick={() => handleFilterById(id)}>
        {id}
      </StyledButton>
    ))}
  </>
);

export default FilterButtons;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 3px 10px;
  border-radius: 5px;
  border: none;
  margin: 0 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;
