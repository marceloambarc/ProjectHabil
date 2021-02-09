import Admin from '../models/Admin';

export default {
  render(admin: Admin) {
    return {
      id: admin.id,
      password: admin.password
    };
  }
}