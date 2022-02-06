import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions, User } from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { NFTISM_TOKEN_THRESHOLD } from "@lib/constants";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (
    req.session.user &&
    req.session.user.tokenBalance >= NFTISM_TOKEN_THRESHOLD
  ) {
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
