import { execSync } from "child_process";
import detect from "detect-port"; // npm add -D detect-port

export async function setupE2eTest() {
  await startSupabase();
  resetDb();
}

/**
 * Starts the Supabase service if it is not already running on the default port (54321).
 * 
 * This function checks if the Supabase service is running by attempting to detect
 * the default port. If the port is not in use, it assumes that Supabase is not running
 * and starts it using the `npx supabase start` command.
 * 
 * @async
 * @returns {Promise<void>} Resolves when the check and potential start process is complete.
 * 
 * @remarks
 * - This function uses the `detect` utility to check for port availability.
 * - If the port is already in use, the function exits early without starting Supabase.
 * - A warning is logged to the console if Supabase is not detected and needs to be started.
 * 
 * @throws {Error} If the `npx supabase start` command fails to execute.
 */
async function startSupabase() {
  const port = await detect(54321);
  if (port !== 54321) {
    return;
  }
  console.warn("Supabase not detected, starting it now...");
  execSync("npx supabase start");
}


/**
 * Resets the database by executing a SQL script to clear all data.
 * 
 * This function uses the `psql` command-line tool to connect to a PostgreSQL
 * database and execute the SQL script located at `supabase/clear-db-data.sql`.
 * 
 * The connection is made using the following parameters:
 * - Host: `127.0.0.1`
 * - Port: `54322`
 * - Username: `postgres`
 * - Password: `postgres`
 * 
 * The output of the command is suppressed by redirecting it to `ignore`.
 * 
 * @throws {Error} If the `execSync` command fails to execute.
 */
function resetDb() {
  execSync(
    "PGPASSWORD=postgres psql -U postgres -h 127.0.0.1 -p 54322 -f supabase/clear-db-data.sql",
    { stdio: "ignore" }
  );
}
