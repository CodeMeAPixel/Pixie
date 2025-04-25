import { DataStream } from 'ai';
import { generateUUID } from '@/lib/utils';
import { z } from 'zod';

export const webSearch = ({ dataStream }: { dataStream: DataStream }) => ({
  description: 'Search the web for information with the given query.',
  parameters: z.object({
    query: z.string().describe('The search query to look up on the web.'),
    maxResults: z.number().describe('Maximum number of results to return (minimum 5).'),
    searchDepth: z.enum(['basic', 'advanced']).describe('Search depth to use.')
  }),
  execute: async ({ query, maxResults, searchDepth }) => {
    // Show searching status
    dataStream.writeData({
      type: 'text',
      data: {
        role: 'assistant',
        id: generateUUID(),
        content: 'Gathering information...'
      }
    });

    const apiKey = process.env.TAVILY_API_KEY;
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        max_results: Math.max(5, maxResults),
        search_depth: searchDepth,
        include_images: true,
        include_answers: true
      })
    });

    const data = await response.json();
    
    return {
      _type: 'web_search_results',
      results: data.results.map(({ url, title, content, raw_content }) => ({
        url,
        title,
        content,
        raw_content
      }))
    };
  }
});
