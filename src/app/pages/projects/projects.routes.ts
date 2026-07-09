import { convertToRouteModule } from '@/utils/load-module';

export const ProjectsRoute = convertToRouteModule(import('./projects.module'));
export default ProjectsRoute;
