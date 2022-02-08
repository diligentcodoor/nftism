/// <reference types="node" />

declare module "@shopify/buy-button-js" {
  export class UI {
    static init: (client: ShopifyClient) => UI;
    createComponent: (
      component: string,
      config: {
        id: string;
        node: HTMLElement | null;
        moneyFormat: string;
        options: any;
      }
    ) => any;
  }

  export function buildClient(options: {
    domain: string;
    storefrontAccessToken: string;
  }): ShopifyClient;
}
