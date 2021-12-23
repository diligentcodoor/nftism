import _balances from "../../balances.json";

export const getBalance = (address: string): Number => {
  const balances = _balances as Record<string, number>;
  return balances[address] || 0;
};
