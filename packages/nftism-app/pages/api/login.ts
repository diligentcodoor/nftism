import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../lib/session";
import { formatEther, verifyMessage } from "ethers/lib/utils";
import { ethers } from "ethers";
import { ERC20_ABI, networkConfig, Networks } from "../../utils/blockchain";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { signature } = await req.body;

  try {
    const address = verifyMessage("hello", signature);
    const balance = await new ethers.Contract(
      networkConfig[Networks.MAINNET].nftismContract,
      ERC20_ABI,
      new ethers.providers.JsonRpcProvider(networkConfig[Networks.MAINNET].uri)
    ).balanceOf(address);

    const user = {
      isLoggedIn: true,
      tokenBalance: parseInt(formatEther(balance)),
    } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
