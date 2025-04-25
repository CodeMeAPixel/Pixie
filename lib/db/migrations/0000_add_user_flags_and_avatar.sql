-- Migration 0006: add user flags and profile picture URL

ALTER TABLE "User"
  ADD COLUMN "isAdmin" boolean NOT NULL DEFAULT false,
  ADD COLUMN "isPremium" boolean NOT NULL DEFAULT false,
  ADD COLUMN "isBeta" boolean NOT NULL DEFAULT false,
  ADD COLUMN "isBanned" boolean NOT NULL DEFAULT false,
  ADD COLUMN "profilePictureUrl" text;
