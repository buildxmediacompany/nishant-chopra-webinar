-- Client requirements: video testimonials + singing-video showcase.
-- Purely additive: one nullable column, one new table. No data is dropped.
--
-- Apply with either:
--   bun run db:push        (interactive, recommended — review the plan it prints)
--   psql "$DATABASE_URL" -f scripts/2026-07-10-client-video-requirements.sql

ALTER TABLE "testimonials"
  ADD COLUMN IF NOT EXISTS "video_url" text;

CREATE TABLE IF NOT EXISTS "showcase_videos" (
  "id"            uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title"         text NOT NULL,
  "video_url"     text NOT NULL,
  "thumbnail_url" text,
  "order"         integer DEFAULT 0 NOT NULL,
  "is_active"     boolean DEFAULT true NOT NULL,
  "created_at"    timestamp with time zone DEFAULT now() NOT NULL
);
