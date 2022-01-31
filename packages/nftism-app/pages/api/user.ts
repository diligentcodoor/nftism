import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions, User } from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user && req.session.user.tokenBalance >= 100) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      tokenBalance: 0,
    });
  }
}
