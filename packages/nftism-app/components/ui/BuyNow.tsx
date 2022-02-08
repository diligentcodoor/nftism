import { useEffect } from "react";
import ShopifyBuy from "@shopify/buy-button-js";

const shopifyClient = ShopifyBuy.buildClient({
  domain: "kennyschachter.myshopify.com",
  storefrontAccessToken: "74b4451cb1dcacd8282f8bfd1a3f92ea",
});

const ui = ShopifyBuy.UI.init(shopifyClient);

type BuyNowProps = {
  id: string;
  type: "collection" | "product" | "productSet" | "cart";
};

const BuyNow: React.FC<BuyNowProps> = ({ id, type }) => {
  useEffect(() => {
    ui.createComponent(type, {
      id,
      node: document.getElementById(`buy-now-${id}`),
      moneyFormat: "%24%7B%7Bamount%7D%7D",
      options: shopifyCollectionOptions,
    });
  });

  return <div id={`buy-now-${id}`} />;
};

export default BuyNow;

const shopifyCollectionOptions = {
  product: {
    styles: {
      product: {
        "@media (min-width: 601px)": {
          "max-width": "calc(50% - 40px)",
          "margin-left": "40px",
          "margin-bottom": "50px",
          width: "calc(50% - 40px)",
        },
        img: {
          height: "calc(100% - 15px)",
          position: "absolute",
          left: "0",
          right: "0",
          top: "0",
        },
        imgWrapper: {
          "padding-top": "calc(75% + 15px)",
          position: "relative",
          height: "0",
        },
      },
      title: {
        "font-family": "Roboto, sans-serif",
        "font-weight": "normal",
      },
      button: {
        "font-family": "Roboto, sans-serif",
        ":hover": {
          "background-color": "#dc2828",
        },
        "background-color": "#f42c2c",
        ":focus": {
          "background-color": "#dc2828",
        },
        "border-radius": "10px",
        "padding-left": "20px",
        "padding-right": "20px",
      },
      price: {
        "font-family": "Roboto, sans-serif",
        "font-weight": "bold",
      },
      compareAt: {
        "font-family": "Roboto, sans-serif",
        "font-weight": "bold",
      },
      unitPrice: {
        "font-family": "Roboto, sans-serif",
        "font-weight": "bold",
      },
    },
    buttonDestination: "modal",
    contents: {
      options: false,
    },
    text: {
      button: "View product",
    },
    googleFonts: ["Roboto"],
  },
  productSet: {
    styles: {
      products: {
        "@media (min-width: 601px)": {
          "margin-left": "-40px",
        },
      },
    },
  },
  modalProduct: {
    contents: {
      img: false,
      imgWithCarousel: true,
      button: false,
      buttonWithQuantity: true,
    },
    styles: {
      product: {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px",
        },
      },
      button: {
        "font-family": "Roboto, sans-serif",
        ":hover": {
          "background-color": "#dc2828",
        },
        "background-color": "#f42c2c",
        ":focus": {
          "background-color": "#dc2828",
        },
        "border-radius": "10px",
        "padding-left": "20px",
        "padding-right": "20px",
      },
      title: {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "bold",
        "font-size": "26px",
        color: "#4c4c4c",
      },
      price: {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "18px",
        color: "#4c4c4c",
      },
      compareAt: {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "15.299999999999999px",
        color: "#4c4c4c",
      },
      unitPrice: {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "15.299999999999999px",
        color: "#4c4c4c",
      },
    },
    googleFonts: ["Roboto"],
    text: {
      button: "Add to cart",
    },
  },
  option: {},
  cart: {
    styles: {
      button: {
        "font-family": "Roboto, sans-serif",
        ":hover": {
          "background-color": "#dc2828",
        },
        "background-color": "#f42c2c",
        ":focus": {
          "background-color": "#dc2828",
        },
        "border-radius": "10px",
      },
    },
    text: {
      total: "Subtotal",
      button: "Checkout",
    },
    googleFonts: ["Roboto"],
  },
  toggle: {
    styles: {
      toggle: {
        "font-family": "Roboto, sans-serif",
        "background-color": "#f42c2c",
        ":hover": {
          "background-color": "#dc2828",
        },
        ":focus": {
          "background-color": "#dc2828",
        },
      },
    },
    googleFonts: ["Roboto"],
  },
};
