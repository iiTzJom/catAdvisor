import { sessionService } from "redux-react-session";

export const loginUser = (
  userName,
  id,
  firstName,
  lastName,
  email,
  imgProfile,
  type
) => {
  return () => {
    sessionService.saveSession(true);
    sessionService.saveUser({
      userName: userName,
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      imgProfile: imgProfile,
      type: type,
    });
  };
};

export const logoutUser = () => {
  return () => {
    sessionService.saveSession(false);
    sessionService.saveUser({});
  };
};
