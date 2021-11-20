import { Command } from 'commander';
import { serve } from 'local-api/dist';

export const serveCommand = new Command()
  .command('serve [filename]') // [] is optional
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005') // <> is required
  .action((filename = 'notebook.js', options: { port: string }) => {
    // console.log('Getting ready to serve a file');
    console.log(filename, options);
    serve(parseInt(options.port), filename, '/');
  });
