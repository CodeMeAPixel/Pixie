-- Remove triggers first
DROP TRIGGER IF EXISTS update_user_updated_at ON "User";
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Remove indexes
DROP INDEX IF EXISTS "idx_user_username";
DROP INDEX IF EXISTS "idx_user_created";

-- Remove added columns
ALTER TABLE "User"
  DROP COLUMN IF EXISTS "username",
  DROP COLUMN IF EXISTS "name",
  DROP COLUMN IF EXISTS "bio",
  DROP COLUMN IF EXISTS "location",
  DROP COLUMN IF EXISTS "website",
  DROP COLUMN IF EXISTS "github",
  DROP COLUMN IF EXISTS "twitter",
  DROP COLUMN IF EXISTS "linkedin",
  DROP COLUMN IF EXISTS "theme",
  DROP COLUMN IF EXISTS "language",
  DROP COLUMN IF EXISTS "timezone",
  DROP COLUMN IF EXISTS "createdAt",
  DROP COLUMN IF EXISTS "updatedAt",
  DROP COLUMN IF EXISTS "lastLoginAt";
