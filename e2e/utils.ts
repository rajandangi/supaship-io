import { execSync } from "child_process";
import detect from "detect-port"; // npm add -D detect-port
import { expect, Page } from "@playwright/test"; // Add this import

export async function setupE2eTest() {
  await startSupabase();
  reseedDb();
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
function reseedDb() {
  try {
    execSync(
      "PGPASSWORD=postgres psql -U postgres -h 127.0.0.1 -p 54322 -f supabase/clear-db-data.sql",
      { stdio: "inherit" } // Changed from 'ignore' to see the actual error
    );
  } catch (error) {
    console.error("Error reseeding database:", error.message);
    // You could add a fallback here or additional error handling
  }
}


export async function signUp(
  page: Page,
  email: string,
  password: string,
  userName: string,
  skipUserName = false
) {
  const signUpButton = page.locator("button", { hasText: "Sign Up" }).first();
  await signUpButton.click();
  const emailInput = page.locator('input[name="email"]');
  await emailInput.fill(email);
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.fill(password);
  await page.keyboard.press("Enter");
  const welcomeNotice = page.locator("h2", { hasText: "Welcome to Supaship!" });
  await expect(welcomeNotice).toHaveCount(1);
  if (skipUserName) {
    return;
  }
  const usernameInput = page.locator('input[name="username"]');
  await usernameInput.fill(userName);
  const submitButton = page.locator("button", { hasText: "Submit" });
  await expect(submitButton).toBeEnabled();
  await page.keyboard.press("Enter");
  const logoutButton = page.locator("button", { hasText: "Logout" });
  await expect(logoutButton).toHaveCount(1);
}

export async function login(
  page: Page,
  email: string,
  password: string,
  username: string,
  loginButtonSelector = "button"
) {
  const signUpButton = page
    .locator(loginButtonSelector, { hasText: "Login" })
    .first();
  await signUpButton.click();
  const emailInput = page.locator('input[name="email"]');
  await emailInput.fill(email);
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.fill(password);
  await page.keyboard.press("Enter");
  const logoutButton = page.locator("button", { hasText: "Logout" });
  await expect(logoutButton).toHaveCount(1);
  const usernameMention = page.locator("h2", { hasText: username });
  await expect(usernameMention).toHaveCount(1);
}



export async function createPost(page: Page, title: string, contents: string) {
  page.goto("http://localhost:1337/1");
  const postTitleInput = page.locator(`input[name="title"]`);
  const postContentsInput = page.locator(`textarea[name="contents"]`);
  const postSubmitButton = page.locator(`button[type="submit"]`);
  await postTitleInput.fill(title);
  await postContentsInput.fill(contents);
  await postSubmitButton.click();
  const post = page.locator("h3", { hasText: title });
  await expect(post).toHaveCount(1);
  return post;
}

export async function createComment(page: Page, comment: string) {
  const commentInput = page.locator(`textarea[name="comment"]`);
  const commentSubmitButton = page.locator(`button[type="submit"]`);
  await commentInput.fill(comment);
  await commentSubmitButton.click();
  const createdComment = page.locator("p", { hasText: comment });
  await expect(createdComment).toHaveCount(1);
}