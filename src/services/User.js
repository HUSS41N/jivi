import { APIs } from "../utils/constants/constants";
import sharedConfig from "../utils/services/sharedConfig";

class UserService {
  postUserData(data) {
    return sharedConfig.post(APIs.POST_URL, data);
  }
}
