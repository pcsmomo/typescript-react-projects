import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface addCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<addCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, 'code')}>Code</button>
      <button onClick={() => insertCellBefore(nextCellId, 'text')}>Text</button>
    </div>
  );
};

export default AddCell;
