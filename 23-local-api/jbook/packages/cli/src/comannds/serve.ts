import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api/dist';

export const serveCommand = new Command()
  .command('serve [filename]') // [] is optional
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005') // <> is required
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`
      );
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `Port ${options.port} is in use. Try running on a different port`
        );
      } else {
        console.log('Heres the problem', err.message);
      }
      process.exit(1); // exit with status 1 which indicates 'unsuccessful running problem'
    }
  });
