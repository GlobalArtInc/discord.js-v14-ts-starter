import { Users } from "../entities/users.entity";
import { Database } from "../structures/Database";

export class UsersService {
  protected usersRepo = Database.appDataSource.getRepository(Users);

  public getAllUsers() {
    return this.usersRepo.find();
  }
}

export default new UsersService();
