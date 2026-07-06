import { convertToRouteModule } from '@/utils/load-module';

export const DashboardRoute = convertToRouteModule(import('./dashboard.module'));
export default DashboardRoute;
