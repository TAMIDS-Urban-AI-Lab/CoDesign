import { HeaderLayout } from '@/components/shared/HeaderLayout';
import { ReportForm } from '@/components/report/ReportForm';

export default function ReportScreen() {
  return (
    <HeaderLayout title="Create Report">
      <ReportForm></ReportForm>
    </HeaderLayout>
  );
}
