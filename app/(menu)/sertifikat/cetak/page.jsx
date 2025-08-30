import { DataTable } from '@/components/data-table/data-table';
import { columns as allAslabColumns } from '../_components/columns';
import { getAllAslabWithCourses } from '../actions';
const data = await getAllAslabWithCourses();

const CetakPage = async () => {
  return (
    <DataTable
      viewOptions={true}
      globalSearch={true}
      pagination={true}
      columns={allAslabColumns}
      data={data}
    />
  );
};

export default CetakPage;
