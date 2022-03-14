import path from "path";
import concurrently, { Command, ConcurrentlyOptions } from "concurrently";

/**
 * dev.ts
 * 
 * this is a small dev script that launches fastify api alongside create-react-app
 */
const init = async () => {
  const commands: Partial<Command>[] = [
    { command: "npm run react:start", name: "react" },
    { command: "npm run api:start", name: "api" },
  ];

  const options: Partial<ConcurrentlyOptions> = {
    prefix: "name",
    killOthers: ['failure', 'success'],
    restartTries: 3,
    cwd: path.resolve(__dirname)
  };

  concurrently(commands, options);
};

init();
