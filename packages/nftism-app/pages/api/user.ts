import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions, User } from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { NFTISM_TOKEN_THRESHOLD } from "@lib/constants";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.json(new User(false, 0));
  }
}
