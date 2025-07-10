import { execSync } from 'child_process';
import process from 'process';
/**
 * Script to generate a migration with a custom name format using drizzle-kit.
 * Format: <table_name>_table_<YYYYMMDD>
 * Example: users_table_20250610
 */
function generateMigration(): void {
  // Get the table name from the command line arguments
  const tableName: string | undefined = process.argv[2];
  // Validate input
  if (!tableName || !/^[a-zA-Z0-9_]+$/.test(tableName)) {
    console.error('Please provide a valid table name (letters, numbers, and underscores only).');
    console.log('Usage: npm run db:generate <table_name>');
    console.log('Example: npm run db:generate users');
    process.exit(1);
  }
  // Format today's date as YYYYMMDD
  const today: string = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  // Construct the migration name
  const migrationName: string = `${tableName}_${today}`;
  console.log(`Generating migration: ${migrationName}`);
  try {
    // Run drizzle-kit generate command with the custom migration name
    execSync(`npx drizzle-kit generate --name="${migrationName}"`, { stdio: 'inherit' });
    console.log(`Migration "${migrationName}" generated successfully!`);
  } catch (error) {
    console.error('Error generating migration:', (error as Error).message);
    process.exit(1);
  }
}
// Run the function
generateMigration();