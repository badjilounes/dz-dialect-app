export * from './professor.service';
import { ProfessorHttpService } from './professor.service';
export * from './student.service';
import { StudentHttpService } from './student.service';
export const APIS = [ProfessorHttpService, StudentHttpService];
