import { ArtifactKind } from '@/components/ui/artifacts/artifact';
import { geolocation } from '@vercel/functions';
import { webSearchPrompt } from './prompt/webSearch';
import { artifactsPrompt } from './prompt/artifactRules';
import { codePrompt, codeInterpreterPrompt } from './prompt/codeRules';
import { sheetPrompt } from './prompt/sheetRules';
import { basePrompt } from './prompt/baseRules';

interface LocationInfo {
  city?: string;
  latitude?: number;
  longitude?: number;
}

export const documentPrompt = `
When creating documents:
1. Always specify both title and kind
2. Wait for creation confirmation
3. Ensure kind is one of: text, code, sheet
4. Each create call must include a title
5. Handle creation result before proceeding

Example usage:
createDocument({
  title: "Example Document",
  kind: "code"
})`;

export const systemPrompt = async (req?: Request) => {
  let locationInfo: LocationInfo = {};
  
  if (req) {
    try {
      const { city, latitude, longitude } = geolocation(req);
      locationInfo = { city, latitude, longitude };
    } catch (error) {
      console.error('Failed to get location info:', error);
    }
  }

  return `${basePrompt(locationInfo)}\n\n${webSearchPrompt}\n\n${artifactsPrompt}\n\n${codePrompt}\n\n${sheetPrompt}\n\n${documentPrompt}`;
};

export const updateDocumentPrompt = (
  currentContent: string | null,
  type: ArtifactKind,
) =>
  type === 'text'
    ? `\
Improve the following contents of the document based on the given prompt.

${currentContent}
`
    : type === 'code'
      ? `\
Improve the following code snippet based on the given prompt.

${currentContent}
`
      : type === 'sheet'
        ? `\
Improve the following spreadsheet based on the given prompt.

${currentContent}
`
        : '';
