import { slug } from 'github-slugger';
import { marked } from "marked";

// slugify
export const slugify = (content: string) => {
  if (!content) return null;

  return slug(content);
};

// markdownify
export const markdownify = (content: string) => {
  if (!content) return null;

  // Custom renderer to style links
  const renderer = new marked.Renderer();
  renderer.link = (href, title, text) => {
    const titleAttr = title ? ` title="${title}"` : '';
        return `<a href="${href}"${titleAttr} style="color: #FE6019; text-decoration: none;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${text}</a>`;
  };

  return marked.parseInline(content, { renderer });
};


// humanize
export const humanize = (content: string) => {
  if (!content) return null;

  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// plainify
export const plainify = (content: string) => {
  if (!content) return null;

  const filterBrackets = content.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string): string => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    }
  );
  return htmlWithoutEntities;
};
