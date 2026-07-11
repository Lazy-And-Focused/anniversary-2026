import { convertToRouteModule } from '@/utils/load-module';

export const QuizRoute = convertToRouteModule(import('./quiz.module'));
export default QuizRoute;
