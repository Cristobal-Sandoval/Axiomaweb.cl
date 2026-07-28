import { useEffect } from 'react';

const BASE_TITLE = 'Axioma Web — Desarrollo Web & Software Corporativo';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${BASE_TITLE}`;
    } else {
      document.title = BASE_TITLE;
    }
  }, [title]);
}
