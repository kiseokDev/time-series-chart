import styled from 'styled-components';

interface FilterButtonProps {
  id: string;
  label?: string;
  handleFilter: (id: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  id,
  label,
  handleFilter,
}) => (
  <StyledButton data-testid="filter-button" onClick={() => handleFilter(id)}>
    {id}
  </StyledButton>
);

export default FilterButton;

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
