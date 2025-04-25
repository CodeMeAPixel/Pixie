-- Add new profile columns
ALTER TABLE "User" 
  ADD COLUMN IF NOT EXISTS "username" varchar(32) UNIQUE,
  ADD COLUMN IF NOT EXISTS "name" varchar(64),
  ADD COLUMN IF NOT EXISTS "bio" text,
  ADD COLUMN IF NOT EXISTS "location" varchar(100),
  ADD COLUMN IF NOT EXISTS "website" varchar(255),
  ADD COLUMN IF NOT EXISTS "github" varchar(100),
  ADD COLUMN IF NOT EXISTS "twitter" varchar(100),
  ADD COLUMN IF NOT EXISTS "linkedin" varchar(100),
  ADD COLUMN IF NOT EXISTS "theme" varchar(32) DEFAULT 'system',
  ADD COLUMN IF NOT EXISTS "language" varchar(10) DEFAULT 'en',
  ADD COLUMN IF NOT EXISTS "timezone" varchar(50),
  ADD COLUMN IF NOT EXISTS "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS "updatedAt" timestamp,
  ADD COLUMN IF NOT EXISTS "lastLoginAt" timestamp;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS "idx_user_username" ON "User"("username");
CREATE INDEX IF NOT EXISTS "idx_user_created" ON "User"("createdAt");

-- Add trigger to automatically update the updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_user_updated_at
    BEFORE UPDATE ON "User"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
