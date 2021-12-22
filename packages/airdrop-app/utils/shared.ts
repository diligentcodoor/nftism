export const messages = {
  please_connect:
    "Please connect your wallet to the Ethereum network to use the dashboard.",
  please_connect_wallet: "Please connect your wallet.",
  tx_successfully_send: "Your transaction was successfully sent",
  your_balance_updated: "Your balance was successfully updated",
  nothing_to_claim: "You have nothing to claim",
  something_wrong: "Something went wrong",
  switch_to_ethereum: "Switch to the Ethereum network.",
  your_balance_update_soon: "Your balance will update soon",
};

export function numberWithCommas(x: number | string) {
  const _x = typeof x === "string" ? x : x.toString();
  return _x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
