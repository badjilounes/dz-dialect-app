export * from './authentication.service';
import { AuthenticationHttpService } from './authentication.service';
export * from './users.service';
import { UsersHttpService } from './users.service';
export const APIS = [AuthenticationHttpService, UsersHttpService];
