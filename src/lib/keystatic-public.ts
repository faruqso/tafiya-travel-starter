/** Whether live Keystatic saves are enabled (GitHub auth + commits). Default: browse-only demo. */
export function isKeystaticEditEnabled(): boolean {
  return import.meta.env.PUBLIC_KEYSTATIC_EDIT_ENABLED === 'true';
}

export function getTemplateRepoUrl(): string {
  return (
    import.meta.env.PUBLIC_KEYSTATIC_TEMPLATE_REPO ?? 'https://github.com/faruqso/tafiya-travel-starter'
  ).replace(/\/$/, '');
}

export function getTemplateForkUrl(): string {
  return `${getTemplateRepoUrl()}/fork`;
}

/** Local-mode collection create/edit URLs (and github branch equivalents). */
export function isKeystaticEditPath(pathname: string): boolean {
  return /\/keystatic(?:\/branch\/[^/]+)?\/collection\/[^/]+\/(?:item\/[^/]+|create)\/?$/.test(
    pathname,
  );
}
