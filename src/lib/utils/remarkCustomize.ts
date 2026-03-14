
import { visit } from "unist-util-visit";

export const remarkGfmAlerts = () => {
  const typeMap = {
    note: "note",
    tip: "tip",
    important: "info",
    warning: "warning",
    caution: "warning",
  };

  return (tree) => {
    visit(tree, "blockquote", (node, index, parent) => {
      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== "paragraph") return;

      const firstInline = firstChild.children[0];
      if (!firstInline || firstInline.type !== "text") return;

      const match = firstInline.value.match(
        /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n?/i,
      );
      if (!match) return;

      const noticeType = typeMap[match[1].toLowerCase()] || "note";

      // Remove the alert marker from content
      const remaining = firstInline.value.slice(match[0].length);
      if (remaining) {
        firstInline.value = remaining;
      } else {
        firstChild.children.shift();
        if (firstChild.children[0]?.type === "break") {
          firstChild.children.shift();
        }
      }

      if (firstChild.children.length === 0) {
        node.children.shift();
      }

      // Replace blockquote with <Notice> component
      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "Notice",
        attributes: [
          { type: "mdxJsxAttribute", name: "type", value: noticeType },
        ],
        children: node.children,
      };
    });
  };
};
