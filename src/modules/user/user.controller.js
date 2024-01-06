import * as userService from "./user.service";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await userService.login(email, password);
    res.send(data);
  } catch (error) {
    res.status(400).send({ error });
  }
};
export const signup = async (req, res) => {
  try {
    const data = await userService.signUp(req.body);
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};
