import { makePage } from '@keystatic/astro/ui';
import keystaticConfig from '../../keystatic.config';

const KeystaticPage = makePage(keystaticConfig);

export default function KeystaticAdmin() {
  return <KeystaticPage />;
}
