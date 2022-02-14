import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { SiweMessage } from "siwe";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";

import { sessionOptions, User } from "@lib/session";
import { ERC20_ABI, networkConfig, Networks } from "@lib/blockchain";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { message, signature } = req.body;

        const siweMessage = new SiweMessage(message);
        const fields = await siweMessage.validate(signature);
        const balance = await new ethers.Contract(
          networkConfig[Networks.MAINNET].nftismContract,
          ERC20_ABI,
          new ethers.providers.JsonRpcProvider(
            networkConfig[Networks.MAINNET].uri
          )
        ).balanceOf(fields.address);
        const tokenBalance = parseInt(formatEther(balance));

        const user = new User(true, tokenBalance);
        req.session.user = user;
        await req.session.save();
        res.json(user);
      } catch (error) {
        res.status(401).json({ message: (error as Error).message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
