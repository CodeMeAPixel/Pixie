import { z } from 'zod';

export const codeInterpreter = () => ({
  description: "Execute code in various programming languages. Supported languages: Python, JavaScript, TypeScript, Ruby, Java, C++, and more.",
  parameters: z.object({
    title: z.string().describe('Title of the code snippet'),
    language: z.string().describe('Programming language to use (e.g. python, javascript, typescript, ruby)').default('python'),
    code: z.string().describe('Code to execute. For output, use: Python/Ruby: print(), JavaScript: console.log(), Java: System.out.println()')
  }),
  execute: async ({ code, language }) => {
    // Clean up code formatting
    code = code.replace(/\\n/g, '\n').replace(/\\/g, '');
    
    const response = await fetch('https://interpreter.za16.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code,
        language: language?.toLowerCase() || 'python'
      })
    });

    const data = await response.json();
    const output_files = data.output_files || [];

    return {
      output: data.std_out || '',
      error: data.error || null,
      ...(output_files.length > 0 && {
        file: output_files[0].b64_data,
        filename: output_files[0].filename
      })
    };
  }
});
