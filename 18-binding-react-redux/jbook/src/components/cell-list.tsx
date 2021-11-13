import { useTypedSelector } from '../hooks/use-typed-selector';

const CellList: React.FC = () => {
  // useTypedSelector(({ cells: { order, data} }) => {
  //   return order.map(id => {
  //     return data[id]
  //   })
  // });
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  return <div>Cell List</div>;
};

export default CellList;
