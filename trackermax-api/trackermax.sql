\echo "Delete and recreate trackermax db?"
\prompt "Return for yes or control-C to cancel > " answer

DROP DATABASE IF EXISTS trackermax;
CREATE DATABASE trackermax;

\connect trackermax
\i trackermax-schema.sql