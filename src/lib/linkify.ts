const EMAIL_PATTERN = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

/** Turn plain-text emails into mailto links (CMS content only). */
export function linkifyEmails(text: string): string {
  return text.replace(EMAIL_PATTERN, '<a href="mailto:$1">$1</a>');
}

export type ProseBlock =
  | { type: 'h3'; content: string }
  | { type: 'p'; content: string };

/** Split body into paragraphs; lines starting with `### ` become subheadings. */
export function parseProseBlocks(body: string): ProseBlock[] {
  return body
    .split('\n\n')
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith('### ')) {
        return { type: 'h3' as const, content: block.slice(4).trim() };
      }
      return { type: 'p' as const, content: block };
    });
}

export function linkifyProseHtml(text: string): string {
  return linkifyEmails(text);
}
