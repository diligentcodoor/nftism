import Image from "next/image";
import parse from "html-react-parser";

export function numberWithCommas(x: number | string) {
  const _x = typeof x === "string" ? x : x.toString();
  return _x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseDiviContent(
  content: string,
  appendEllipsis: Boolean = false
): string | JSX.Element | JSX.Element[] {
  let processedContent = content.replace(/\[.*?\]/g, "");
  if (appendEllipsis) {
    processedContent = processedContent.replace("</p>", "[&hellip;]</p>");
  }
  return parse(content, {
    replace: (node) => {
      const data = (node as { data: string } | undefined)?.data;
      console.log(node.attribs);
      if (data?.match(/\bhttps?:\/\/\S+/gi)) {
        // console.log(data);
      }
      if (data?.includes("et_pb")) {
        // console.log(data);
        if (data.includes("et_pb_image")) {
          const urlMatches = data.match(/\bhttps?:\/\/\S+/gi);
          const imgSrc = urlMatches?.[0];
          return <Image src={imgSrc!} alt="" width={100} height={100} />;
        } else {
          return <></>;
        }
      }
      return node;
      // if (node instanceof Element && node.type === "tag") {
      // console.log(node.children[0]);
      // ...
      // }
      //www.kennyschachter.art/wp-content/uploads
    },
  });
}

export function humanReadableDate(date: string): string {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" } as {
    year: "numeric";
    month: "long";
    day: "numeric";
  };
  return new Date(date).toLocaleDateString(undefined, dateOptions);
}
