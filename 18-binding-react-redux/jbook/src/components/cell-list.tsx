import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: React.FC = () => {
  // useTypedSelector(({ cells: { order, data} }) => {
  //   return order.map(id => {
  //     return data[id]
  //   })
  // });
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      {/* Way 1 to handle style */}
      {/* <div className={cells.length === 0 ? 'force-visible' : ''}>
        <AddCell nextCellId={null} />
      </div> */}

      {/* Way 2 */}
      {/* <AddCell style={{ opacity: 1 }} nextCellId={null} /> */}

      {/* Way 3 */}
      <AddCell forceVisible={cells.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
