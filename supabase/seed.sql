SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'b3a6641f-9f01-4749-a25b-ec8cbd225c12', '{"action":"user_confirmation_requested","actor_id":"644ff3d5-04ae-4578-a8b9-c95a217a8217","actor_username":"rudi.setiawan@jogjaprov.go.id","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-06 06:32:16.280274+00', ''),
	('00000000-0000-0000-0000-000000000000', '15d12f5c-f904-4dff-a916-c7135f133e38', '{"action":"user_confirmation_requested","actor_id":"644ff3d5-04ae-4578-a8b9-c95a217a8217","actor_username":"rudi.setiawan@jogjaprov.go.id","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-06 10:03:18.605866+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e8fb5573-bd7a-4889-a192-58c75031a057', '{"action":"user_confirmation_requested","actor_id":"644ff3d5-04ae-4578-a8b9-c95a217a8217","actor_username":"rudi.setiawan@jogjaprov.go.id","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-06 10:04:40.330288+00', ''),
	('00000000-0000-0000-0000-000000000000', '5fe7e3c9-1808-4b83-adc0-ff2bb79e33be', '{"action":"user_confirmation_requested","actor_id":"644ff3d5-04ae-4578-a8b9-c95a217a8217","actor_username":"rudi.setiawan@jogjaprov.go.id","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-06 10:05:40.976493+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c31fb8a6-bb70-44ee-954f-5de46850d40e', '{"action":"user_confirmation_requested","actor_id":"644ff3d5-04ae-4578-a8b9-c95a217a8217","actor_username":"rudi.setiawan@jogjaprov.go.id","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-06 10:07:01.049543+00', ''),
	('00000000-0000-0000-0000-000000000000', '84b1319e-a167-46d3-a5b5-2c7008396a0a', '{"action":"user_confirmation_requested","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-07 01:36:48.139141+00', ''),
	('00000000-0000-0000-0000-000000000000', '7fb1ce2c-0515-42e1-bcb4-2990cd0a4c0f', '{"action":"user_signedup","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-02-07 01:38:04.392329+00', ''),
	('00000000-0000-0000-0000-000000000000', '19db4b1e-8adc-4ae7-89b6-6c5fee8a27ea', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-07 01:38:13.229642+00', ''),
	('00000000-0000-0000-0000-000000000000', '288d3ea5-3cb4-4dc9-9b2d-4a2bd356a5e8', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-07 02:15:26.584724+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6287fd4-8e64-43aa-9b32-51e8350383a5', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-07 02:17:10.663933+00', ''),
	('00000000-0000-0000-0000-000000000000', '65516598-ce50-4ae1-b1fe-6b5dc3b753c7', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-07 02:17:12.23097+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c431b3ef-400c-4f56-baa5-db45edef5c74', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-07 02:17:43.092916+00', ''),
	('00000000-0000-0000-0000-000000000000', '79609792-0b99-4fab-ac14-c1bab565252a', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-07 02:17:44.972759+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ab1a365b-bb5f-4425-ac74-e5da75ea14c4', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-07 02:19:32.992098+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c40e344b-9b0d-44bb-8cd2-1abc205dd5be', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-07 02:19:37.241027+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f44c571-6063-4303-8052-0972be88fb58', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-07 02:45:31.041655+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e0145c69-87ef-4384-9d0f-c4079860bd88', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-07 03:37:49.974032+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eef5aa81-1e82-4d10-995b-e1701d6626af', '{"action":"user_confirmation_requested","actor_id":"2e732177-bcc4-4dff-9bd7-7d18df121458","actor_username":"sdafaasdfasdf@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-07 03:43:41.997313+00', ''),
	('00000000-0000-0000-0000-000000000000', '19fcc9bc-2ac6-4964-9746-712467fffc28', '{"action":"user_confirmation_requested","actor_id":"86cb2dd0-c3d1-4a87-91e6-170cf473043a","actor_username":"asdfdfaa@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-07 03:47:34.832559+00', ''),
	('00000000-0000-0000-0000-000000000000', 'abe587ee-c58b-4358-a65d-0171ecd595fa', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-07 04:11:15.63797+00', ''),
	('00000000-0000-0000-0000-000000000000', '416eba7f-909f-4a20-bbf4-38ea50302eaf', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-07 04:12:51.149614+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7b13b52-0272-4061-91b5-3931366ec450', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-07 04:15:54.666512+00', ''),
	('00000000-0000-0000-0000-000000000000', '74e1113a-54d2-4909-86bf-b795e2ecca6a', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-07 06:45:31.319039+00', ''),
	('00000000-0000-0000-0000-000000000000', '8280663b-5f79-43d1-9d4c-59d51a0723ab', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-07 06:45:31.319961+00', ''),
	('00000000-0000-0000-0000-000000000000', '2066aacd-7879-4f9a-856e-b83c1d292b5f', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-07 06:46:19.780719+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e676e6e2-2150-48e6-80c2-8c76775267ac', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-09 14:39:57.976909+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e705d01-5780-4fa7-aae0-9f47c672fe5a', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-09 14:39:58.00638+00', ''),
	('00000000-0000-0000-0000-000000000000', '354098a0-31c7-4426-9a7e-a639eb277b35', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-10 08:37:41.872847+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a1b13e1a-8666-4639-a666-fbcc54cbc90a', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-10 08:37:41.896292+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd171deae-1441-430d-a4cb-2ae1310369be', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-10 08:38:05.663904+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b555f35-24c9-4a4f-9d37-39e91b9b5684', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-10 09:02:04.386609+00', ''),
	('00000000-0000-0000-0000-000000000000', '12fbb0d2-d3c4-4deb-9d72-e7a0322ca786', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-10 09:02:10.532828+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b35c3c48-7813-4f5e-b1f5-6c2250dc1151', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-10 09:07:42.388353+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ae77637-750b-4175-9895-a240d5ac024c', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-10 09:08:08.47044+00', ''),
	('00000000-0000-0000-0000-000000000000', '82fa4dbc-38cb-4aa4-9376-a8e7c7a0536f', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-10 09:35:28.642649+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bdd0de9b-7d1a-4bf6-92ea-d357da3458ac', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-10 10:01:35.518528+00', ''),
	('00000000-0000-0000-0000-000000000000', '59aef45b-59c9-4432-b273-14d5e6ab2874', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-10 10:01:49.532905+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cdde575a-ee85-4410-8a4c-a60a34497546', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-10 10:02:02.8038+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b8a0fa8-6341-4588-b202-d022c057c5ed', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-10 10:02:35.520637+00', ''),
	('00000000-0000-0000-0000-000000000000', '076c4c67-d132-49f8-9a5a-78de4a3cc26a', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-10 14:39:35.357952+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cbe155b4-849d-4251-8e15-28d3df5375e1', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-10 14:39:35.369083+00', ''),
	('00000000-0000-0000-0000-000000000000', '90ac0182-5dd5-4b15-8f35-570fe9b8b0fa', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-10 15:39:37.510067+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a87df0f7-2dbf-4172-871a-77d23926bd5d', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-10 15:39:37.511178+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf2f6b88-bf01-4bb3-86a3-2030b067eef8', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-10 17:00:03.473658+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c7794e3-c2b8-4c6f-a084-a7d80a397549', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-10 17:00:03.475764+00', ''),
	('00000000-0000-0000-0000-000000000000', '18e93a90-f237-4f0c-b9bb-a10668d42c27', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-10 17:00:05.084476+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ff5887c-4663-4fd0-9921-27b1525517f5', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-10 17:02:34.538299+00', ''),
	('00000000-0000-0000-0000-000000000000', '2cac94d0-0382-4b23-a147-c53971d38692', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-11 03:16:24.944658+00', ''),
	('00000000-0000-0000-0000-000000000000', '3502ab60-5101-4995-a82c-19f95b337bbd', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-11 03:16:24.956579+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ec1f148-8107-4f2c-961d-fc20997af725', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-11 04:20:10.867264+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ad5d015b-34af-4853-b4e2-50294d55e16f', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-11 04:20:10.869006+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b8239e0-64e3-41b6-ac27-d5e6eb526c50', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-11 06:07:04.049153+00', ''),
	('00000000-0000-0000-0000-000000000000', '1341c82f-8e5d-4871-8fac-7e076cc9523d', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-11 06:07:04.050937+00', ''),
	('00000000-0000-0000-0000-000000000000', '80350fd3-a79a-47cb-8dcc-e334c54418d1', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-11 08:07:21.594963+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef862436-6a06-44e2-94af-d92ccc00ba9b', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-11 08:07:21.617512+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f20349e1-7116-47ee-9cee-487c35f59322', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-11 09:07:45.651941+00', ''),
	('00000000-0000-0000-0000-000000000000', '95d6d157-3926-414b-8c26-2dd76ad3335e', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-11 09:07:45.652906+00', ''),
	('00000000-0000-0000-0000-000000000000', '464164f4-21c3-4100-b63b-84c86dd2da15', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-12 01:58:33.167499+00', ''),
	('00000000-0000-0000-0000-000000000000', '9305a9f5-0aa0-424f-ab43-52f4c1afc030', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-12 01:58:33.192321+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d8e2324-5f6a-4c91-baa7-4b30fe0fe118', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-12 07:00:53.308428+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a289836-773a-44f2-9dff-3a1db9840dd3', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-12 07:00:53.321711+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b04d67ad-e93d-44ff-8b39-9d35c3f3225a', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-12 12:22:22.788224+00', ''),
	('00000000-0000-0000-0000-000000000000', '463480bc-79fc-4435-a7e4-6cdce2912043', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-12 12:22:22.809259+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb49dc74-2927-43f4-b929-d8fb66752535', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-12 13:22:49.53312+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db69d602-0d5c-4a17-ad05-b61ff0526dc0', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-12 13:22:49.536729+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a8cd1ce-7f73-443e-b14a-c6a63c24688b', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-12 14:29:18.45702+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b72991fd-cb6c-4c20-8eaf-0d23334835d0', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-12 14:29:18.460266+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae5d872d-b260-4a0e-89e6-cdffef65cdc7', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 00:40:41.728292+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b38a226-2476-41e4-8171-3f94bf9b4b45', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 00:40:41.73655+00', ''),
	('00000000-0000-0000-0000-000000000000', '2c29ecd0-1d87-4a45-8436-b5903b76d676', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 01:40:44.779738+00', ''),
	('00000000-0000-0000-0000-000000000000', '109da1a3-a73e-4aa7-8865-9aedde8641ce', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 01:40:44.780775+00', ''),
	('00000000-0000-0000-0000-000000000000', '42263423-2918-4913-9747-ed1c084a260d', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-13 02:23:31.556059+00', ''),
	('00000000-0000-0000-0000-000000000000', '927ff6c7-5fc5-4913-827c-ab0c8252c716', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 03:25:42.549514+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c576062-b9bd-4b3d-9eb6-b57633f62f80', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 03:25:42.55047+00', ''),
	('00000000-0000-0000-0000-000000000000', '217cf883-cca9-4708-b454-7988d8bf0356', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 05:34:48.042702+00', ''),
	('00000000-0000-0000-0000-000000000000', '59cebd2c-7040-4547-bf40-bf028be12502', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 05:34:48.044909+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b63cb42-904c-4f32-8e8a-4baf8bbdf7a4', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 05:34:48.870418+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb418d16-2482-476c-886d-a472e5c99794', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 05:34:49.846653+00', ''),
	('00000000-0000-0000-0000-000000000000', '03bb5c3d-af8f-430c-929d-706c08a4d148', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 06:05:43.706294+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e1b091a-d36c-4be9-887a-2502f56bdf7a', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-13 06:05:43.708273+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f818367d-bc5a-4b85-9be6-dd486c6754cb', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-13 06:20:10.763802+00', ''),
	('00000000-0000-0000-0000-000000000000', '9cd409f8-ca5d-4b5b-b81e-c691ce20e4f2', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-13 06:20:14.933232+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c0ec48b0-7b15-4502-8230-959f757a2b73', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-13 06:21:23.704585+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3b29f34-7448-4a45-aebb-a9002983ee57', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-13 06:21:30.193394+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f18af923-9815-4a06-8956-2f9e59df5e8b', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-13 06:21:45.927868+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d24fce3-5651-4268-9631-085fb38db425', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-14 00:55:49.551248+00', ''),
	('00000000-0000-0000-0000-000000000000', '2cfbecd3-0d4b-44c0-ae5f-c90d1fbf75ec', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-14 01:59:44.125309+00', ''),
	('00000000-0000-0000-0000-000000000000', '70713e39-9e57-464b-a506-a8e1b2170c45', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-14 01:59:44.130125+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b573a3cd-9f1d-4b1f-8c9e-e10ec4aabc80', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-14 01:59:44.388007+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cdc4c5e2-65dc-4ae8-a9c3-07d8b3ca33d8', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-14 02:59:58.466696+00', ''),
	('00000000-0000-0000-0000-000000000000', '7beab8d7-6df7-49b6-ac3c-fa82240cd2a9', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-14 02:59:58.467908+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a4bad13-2c9a-4ace-94d7-69a03d1edc37', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-14 03:29:30.845994+00', ''),
	('00000000-0000-0000-0000-000000000000', '23414cf5-f480-490b-aa11-52ed062d5b10', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-14 06:39:10.712275+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e43ac9c6-4776-4d82-8fe2-facb09800447', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-14 06:39:10.734319+00', ''),
	('00000000-0000-0000-0000-000000000000', '152a1817-224a-4d8c-b399-05a8f3d58c7f', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-14 07:00:09.923851+00', ''),
	('00000000-0000-0000-0000-000000000000', '9064f789-81a3-4f3e-8e40-ac8233a9a136', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-14 07:00:09.927424+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8349fc0-22be-421b-8598-1eb184ea629c', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 02:12:42.641798+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3ca2b87-cab5-4ba4-bc54-5a80a96b6b78', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 02:12:42.670547+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e00285eb-ec1b-4ffa-a245-f467df62865c', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 04:20:51.354261+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fce11780-5cf9-4533-99cb-991f38f273bd', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 04:20:51.357628+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b2f2a38-52d7-407e-88b7-3bcdf3fed017', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 05:45:16.539744+00', ''),
	('00000000-0000-0000-0000-000000000000', '58815c05-2577-4db8-a64c-927cba407463', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 05:45:16.545111+00', ''),
	('00000000-0000-0000-0000-000000000000', '9232b007-7c40-44cd-88f9-e79e31d3dce0', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 05:45:16.575591+00', ''),
	('00000000-0000-0000-0000-000000000000', '90d3f79c-7160-4e93-bb55-610eeccb3123', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 06:46:48.663433+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b590194-8276-45fb-bc91-a34383e5f966', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 06:46:48.667293+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e2ee18f-c75b-47e8-a2aa-c5714e7ed0a7', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 08:04:27.462506+00', ''),
	('00000000-0000-0000-0000-000000000000', '455ad13c-79b8-45be-9a90-002fe14c0975', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 08:04:27.474025+00', ''),
	('00000000-0000-0000-0000-000000000000', '280b2f9b-e77e-4374-9a27-c24d27e62269', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 10:03:06.011027+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f4f4f7a-8674-4f07-804f-7f674cb7824a', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 10:03:06.015423+00', ''),
	('00000000-0000-0000-0000-000000000000', '435b723c-b181-4cb1-8bdd-341921896753', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 12:30:10.661888+00', ''),
	('00000000-0000-0000-0000-000000000000', '19ae64cb-d875-4de4-ba16-88d0d7316b87', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 12:30:10.668773+00', ''),
	('00000000-0000-0000-0000-000000000000', '87510502-e9ac-455c-9628-d92cf0d71a7e', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 13:55:28.459737+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8f7c47c-b477-487a-881b-752f006ac3fe', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-17 13:55:28.461294+00', ''),
	('00000000-0000-0000-0000-000000000000', '0f904c6c-a37a-426c-bbe4-51235e2bd15f', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 02:00:37.982098+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f4e923d7-7690-447d-9721-811b715480b9', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 02:00:37.994753+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fbea3ebd-0964-4cd6-a49c-7d6784e9b1b7', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 03:01:09.422533+00', ''),
	('00000000-0000-0000-0000-000000000000', '60838e67-f651-48bb-a39a-f9350fa9e5df', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 03:01:09.425769+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8a3343e-482a-4b17-a74a-aeabba7cc78e', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 03:01:11.053857+00', ''),
	('00000000-0000-0000-0000-000000000000', '222a76f8-fc4d-4b41-a862-cd48a3c7cac6', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 03:01:43.423134+00', ''),
	('00000000-0000-0000-0000-000000000000', '9acd478e-39a6-4531-ba1e-e13392576919', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 03:02:50.718994+00', ''),
	('00000000-0000-0000-0000-000000000000', '4b554d56-a36e-44ea-8977-eac7a5cb8124', '{"action":"user_confirmation_requested","actor_id":"ef371ed8-cbf8-4468-885e-79b9ccf57e8b","actor_username":"hmaakba@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-18 03:42:44.690417+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c31b210a-6b27-47f0-939c-50d8a9961fba', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 04:03:16.809115+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c82cb24-577d-42dd-b828-c203d8b7f5ab', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 04:03:16.811865+00', ''),
	('00000000-0000-0000-0000-000000000000', '1674a12c-75be-49e1-994a-4ae2f64705a6', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 04:03:18.033037+00', ''),
	('00000000-0000-0000-0000-000000000000', '032f2e68-df0d-475b-8713-5e9cbc971a1e', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 05:12:09.133662+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd17ae872-926d-4528-9817-862cb295ef6c', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 05:12:09.136656+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e2e2ff76-2c6f-42b7-b27d-5cb5bdade959', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 07:39:00.183337+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd10784b1-d83c-4cd5-9b5d-d11eca76b857', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 07:39:00.210335+00', ''),
	('00000000-0000-0000-0000-000000000000', '453b5a88-fb00-418e-8202-41af95aba142', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 09:35:59.770998+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ee1137a-ecd2-4abf-ade7-be285f9a2442', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-18 09:35:59.774567+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c46ce1e-bbd2-4731-a8d1-a8ffc1905406', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-19 06:57:37.447467+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b4126b29-fe60-46e6-841b-ff41e0574c15', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-19 06:57:37.474436+00', ''),
	('00000000-0000-0000-0000-000000000000', '6cd10b11-935b-4c43-a00d-5ab87a216742', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-19 06:57:37.957608+00', ''),
	('00000000-0000-0000-0000-000000000000', '11b3b3f8-8af5-4624-abf8-edef0253e5e4', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-19 07:57:45.365943+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fbfb56b1-3f76-4a38-9ebb-57303f0b704b', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-19 07:57:45.369495+00', ''),
	('00000000-0000-0000-0000-000000000000', '23f878ed-9ade-4878-a589-60373791186a', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 01:22:14.720677+00', ''),
	('00000000-0000-0000-0000-000000000000', '48b18b2a-b3e0-4bec-bca6-2879c3b7379d', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 01:22:14.734728+00', ''),
	('00000000-0000-0000-0000-000000000000', '4157b294-6853-4b07-857d-18c153de49b5', '{"action":"user_confirmation_requested","actor_id":"ef371ed8-cbf8-4468-885e-79b9ccf57e8b","actor_username":"hmaakba@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-21 02:04:19.376415+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa265aea-2ab3-462a-8bc0-02d5e9556dd2', '{"action":"user_signedup","actor_id":"ef371ed8-cbf8-4468-885e-79b9ccf57e8b","actor_username":"hmaakba@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-02-21 02:08:22.846591+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ef0ae24-8704-440c-8e58-2f15d278145c', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hmaakba@gmail.com","user_id":"ef371ed8-cbf8-4468-885e-79b9ccf57e8b","user_phone":""}}', '2025-02-21 02:10:11.561736+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e49de076-9b53-4521-a69e-2a8274900588', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hmaakba@gmail.com","user_id":"8c69c2c8-be65-4f9c-b289-8ac65f4a5df5","user_phone":""}}', '2025-02-21 02:10:41.43819+00', ''),
	('00000000-0000-0000-0000-000000000000', '0387cfb3-491f-4e9c-aacd-8cd05135b352', '{"action":"login","actor_id":"8c69c2c8-be65-4f9c-b289-8ac65f4a5df5","actor_username":"hmaakba@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-21 02:11:23.065882+00', ''),
	('00000000-0000-0000-0000-000000000000', '417fd80c-a231-4a3e-af4b-b1eb40d4247c', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test@example.com","user_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","user_phone":""}}', '2025-02-21 02:12:01.289444+00', ''),
	('00000000-0000-0000-0000-000000000000', '31e4d026-7934-432f-a461-0fdf5f2bb504', '{"action":"logout","actor_id":"8c69c2c8-be65-4f9c-b289-8ac65f4a5df5","actor_username":"hmaakba@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-21 02:25:59.333267+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cf2b8748-014a-4276-afd9-0ff3249ee664', '{"action":"login","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-21 02:26:06.618693+00', ''),
	('00000000-0000-0000-0000-000000000000', '14540947-4700-4903-89bf-0f70ce92601f', '{"action":"logout","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account"}', '2025-02-21 02:26:58.217863+00', ''),
	('00000000-0000-0000-0000-000000000000', '53255b81-e595-4ae2-b486-1731d921ab1c', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 02:36:27.742613+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b52568e-38f3-4534-a61d-2709b67a9591', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 02:36:27.745638+00', ''),
	('00000000-0000-0000-0000-000000000000', '6c2c7d5b-bed3-4de1-a717-61efb86d1405', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 02:36:27.8714+00', ''),
	('00000000-0000-0000-0000-000000000000', '619e7d8d-1166-440d-8827-83c7b700bdfd', '{"action":"login","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-21 02:43:14.655653+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f668832-7eec-45e2-ac6f-d4ce11ece90d', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 03:36:44.774864+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a39c5a7-cf75-4fff-8fc6-5f9b285418f7', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 03:36:44.776531+00', ''),
	('00000000-0000-0000-0000-000000000000', '59df8293-c97d-4dd3-98b1-7389699888ea', '{"action":"login","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-21 04:38:22.863975+00', ''),
	('00000000-0000-0000-0000-000000000000', '35e0b806-b86f-4342-a0c0-a766ed9c7afd', '{"action":"logout","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account"}', '2025-02-21 04:38:52.576204+00', ''),
	('00000000-0000-0000-0000-000000000000', '06f8ed30-0e35-49ff-bad2-0dcc015a64f3', '{"action":"login","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-21 04:39:13.998504+00', ''),
	('00000000-0000-0000-0000-000000000000', '81b92712-6cd7-452d-a0f5-dcae8e3cb372', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 04:41:15.278064+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5453eb0-7ae4-4ec3-90de-34d0cb91113d', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 04:41:15.279034+00', ''),
	('00000000-0000-0000-0000-000000000000', '3cb6d350-863f-4b3d-88b2-a1207b698a51', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 05:55:02.518753+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8499281-0f76-476b-9549-4348c218cfd6', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 05:55:02.519762+00', ''),
	('00000000-0000-0000-0000-000000000000', '1895686f-4be2-49f7-b2d9-c8c08474313b', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 08:43:32.136598+00', ''),
	('00000000-0000-0000-0000-000000000000', '5325004d-0cde-4413-b4ad-af07dc977b0b', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-21 08:43:32.146142+00', ''),
	('00000000-0000-0000-0000-000000000000', '711c2dd1-e319-4730-9da7-1dacef2949f9', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-02-22 08:29:41.994761+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cdf2c21c-4bdd-41c7-9569-e2e6aa87e488', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-02-22 08:29:42.015316+00', ''),
	('00000000-0000-0000-0000-000000000000', '938ec0b5-06d2-43d3-8f16-72f8a34663fd', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-24 00:55:53.545112+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ce7c25a-e6b8-496d-8e94-5eb9b03c5c44', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-24 00:55:53.568245+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac9026e7-c87b-4c2e-86c4-0f4ad4bdbaa2', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-24 06:36:44.734425+00', ''),
	('00000000-0000-0000-0000-000000000000', '302f6a22-336c-449c-8054-580daa1e88b8', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-24 06:36:44.751887+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b1e2a8e3-1471-473b-ab1e-c6586f383619', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-24 07:38:14.585032+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e017e306-5dd8-4e52-bf4c-0a4ee5513e8a', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-24 07:38:14.588398+00', ''),
	('00000000-0000-0000-0000-000000000000', '5817e497-8f73-4ad2-b051-39460eb1cd1b', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-24 08:40:00.439222+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2d41685-b222-4f83-93a9-85385e34fb87', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-24 08:40:00.447564+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a91dcf20-c89e-4893-b5d1-c51f6e8697e6', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 02:06:49.785211+00', ''),
	('00000000-0000-0000-0000-000000000000', '512f268d-9534-4dc5-b4d1-aee5a3bcc701', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 02:06:49.798078+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b498fd3-1c4b-4e75-8d55-8bc64c268865', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:06:50.915144+00', ''),
	('00000000-0000-0000-0000-000000000000', '0208930f-db29-4853-86df-79bbebebad6b', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:06:50.918082+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8e4aad5-9226-4975-80d4-85517f6f13b1', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:06:50.939229+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af92fd3e-6464-4f71-aa90-b26fa9332041', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:06:50.949791+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a487ad9d-19ff-461a-a890-967829861e7e', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:06:50.971371+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b0d354b9-31b6-4de2-946a-fbadad9149a3', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:06:51.00317+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d77030a-7f24-4778-8060-77c99a5ca0a3', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:06:51.019487+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c7aa76e-4de8-41d4-b047-aa57d86a0e6d', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:06:51.036635+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5382aa2-ad38-4875-818d-00503ad20cce', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:06:51.045995+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b701f45d-67ea-4744-9e4a-fd9c174f3f64', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:06:51.061254+00', ''),
	('00000000-0000-0000-0000-000000000000', '8da12cdd-8acf-47b1-a910-07135f8c1dfa', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:17:29.199591+00', ''),
	('00000000-0000-0000-0000-000000000000', '6533ac05-8ce0-4609-a735-be4fa826f79c', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-02-25 03:17:29.202227+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd68d3548-c427-4d1d-889a-780d048bdcbb', '{"action":"logout","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-02-25 03:28:28.886359+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f3d19a9d-1649-43f1-8d05-139ccd5a0ded', '{"action":"user_confirmation_requested","actor_id":"dbd40179-430a-4624-bb6b-aa277a60cb89","actor_username":"afifjamhari@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-25 03:29:32.186977+00', ''),
	('00000000-0000-0000-0000-000000000000', '651ad0e3-c346-4fa3-9d81-37a81e1bae3a', '{"action":"user_repeated_signup","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-25 03:31:23.824485+00', ''),
	('00000000-0000-0000-0000-000000000000', '60a5fd28-19fc-461f-b7ae-259374d0eddd', '{"action":"user_confirmation_requested","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-02-25 03:33:48.908139+00', ''),
	('00000000-0000-0000-0000-000000000000', '78549a72-443a-4fa4-8fb8-cd93790e58bb', '{"action":"user_signedup","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"team"}', '2025-02-25 03:35:07.220032+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8e341f7-079f-4460-aa72-8951b7d0ecfc', '{"action":"login","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-25 03:35:22.065211+00', ''),
	('00000000-0000-0000-0000-000000000000', '994146c4-3575-439a-b449-7e6d70b06eaf', '{"action":"login","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-25 03:36:12.926812+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1ecb142-648e-4f4c-a2b3-e2495498e226', '{"action":"login","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-02-25 03:57:50.456621+00', ''),
	('00000000-0000-0000-0000-000000000000', 'daf165c2-bf46-4d3f-ab1b-ad9fd0099f1a', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-25 04:37:33.541721+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d2d111f-1585-4b61-949d-200e5cbd6086', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-25 04:37:33.546474+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd6fae6e6-1879-4910-9a24-591a916d4a73', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-25 14:42:03.538856+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a8353cf-7c19-45f4-8149-3c35b1343ff4', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-25 14:42:03.572837+00', ''),
	('00000000-0000-0000-0000-000000000000', '90c4042b-2b1e-4ce1-977a-f78806535af0', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-25 15:42:21.825057+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb5c089b-2c95-4f81-8030-bea096875a7a', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-25 15:42:21.827805+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d4dde5b-b919-4f3c-baed-8b057ed56742', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-25 15:42:21.990891+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2f053af-e0de-4043-8b06-0a512386a689', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-25 15:42:22.014689+00', ''),
	('00000000-0000-0000-0000-000000000000', '64bcc474-2767-4640-9474-f50b209279cf', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 01:04:08.428274+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c854bc53-3dca-412f-a045-25cbc8fa7e33', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 01:04:08.449718+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd91aab02-daf3-475f-b7f0-d26cf8ac6704', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 01:04:34.385505+00', ''),
	('00000000-0000-0000-0000-000000000000', '966826ba-6b7c-423d-88d2-0c2a1ceffff9', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 01:04:35.452608+00', ''),
	('00000000-0000-0000-0000-000000000000', '2756fb94-0392-47b1-9aec-303c13d34062', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 01:04:37.546582+00', ''),
	('00000000-0000-0000-0000-000000000000', '960df8ab-71b0-4b38-ad8c-4a152b23cb07', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 02:04:38.683141+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd554eae5-aa00-4030-9542-d017319d7baf', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 02:04:38.686062+00', ''),
	('00000000-0000-0000-0000-000000000000', '3bfb2f1b-b0d0-418f-93f1-6bc1e64f01bc', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 04:12:34.017632+00', ''),
	('00000000-0000-0000-0000-000000000000', '5c692da5-2d4f-4194-bbb2-47a85154115e', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 04:12:34.018641+00', ''),
	('00000000-0000-0000-0000-000000000000', '31db4879-b207-4255-be1b-970ecb17c909', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 05:22:13.440376+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e42516d-3d37-4add-9153-c8b31dee2d2a', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 05:22:13.442551+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cfa6dd22-f1e6-4409-b0ba-81594990c1c4', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 06:20:28.783526+00', ''),
	('00000000-0000-0000-0000-000000000000', '743ea71d-a8ab-41b0-bbe2-61d16cd70893', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 06:20:28.785327+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c7e99e0-c2cb-4f6b-8f16-709780b831c3', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 07:30:16.951438+00', ''),
	('00000000-0000-0000-0000-000000000000', '6109612f-f1dc-43c1-b5ec-37a5058dbf3f', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 07:30:16.971349+00', ''),
	('00000000-0000-0000-0000-000000000000', '3054f39c-46f2-4f16-8d2d-e3487ff2b0a2', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 08:41:34.926032+00', ''),
	('00000000-0000-0000-0000-000000000000', '259e012b-ac55-4315-af2a-0a97d3858d57', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 08:41:34.930089+00', ''),
	('00000000-0000-0000-0000-000000000000', '01b021e4-5053-4c6e-8797-95cce894988c', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 12:12:36.031953+00', ''),
	('00000000-0000-0000-0000-000000000000', '45089cde-1c69-41fc-b0be-48e946dd85da', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-26 12:12:36.036343+00', ''),
	('00000000-0000-0000-0000-000000000000', '4b5b6aab-281b-4b9a-bead-bd8b0d951c4c', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-27 03:17:34.521844+00', ''),
	('00000000-0000-0000-0000-000000000000', '8873111d-a307-4ef9-b699-3d3fbd4bf5c4', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-02-27 04:53:04.188873+00', ''),
	('00000000-0000-0000-0000-000000000000', '15300ef6-5eb9-4b80-9af0-fae4c4b389c4', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-02-27 04:53:04.192044+00', ''),
	('00000000-0000-0000-0000-000000000000', '502a824e-0316-4bec-802b-09da9a21624f', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-28 02:00:21.999117+00', ''),
	('00000000-0000-0000-0000-000000000000', '58a16579-ae09-4d25-894c-52dba9746236', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-28 02:00:22.02881+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ebcad90-7273-4d56-ae87-aefb2aef6e00', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-28 03:00:32.247761+00', ''),
	('00000000-0000-0000-0000-000000000000', '4832da35-6c92-47bf-a9fa-0112517d7e2d', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-28 03:00:32.253697+00', ''),
	('00000000-0000-0000-0000-000000000000', '2a8d3d9d-6f63-47f0-8104-cbcca2d72790', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-28 03:00:32.278069+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ecc6925-c5bb-4ddb-8372-1eb7cfde3f85', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-28 03:00:32.30852+00', ''),
	('00000000-0000-0000-0000-000000000000', '5deccfb6-ea8c-44a0-983a-692ba74add5a', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-28 05:58:00.856874+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e297425d-7163-4644-a4bb-f881048b4ecb', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-02-28 05:58:00.858425+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3468940-e840-45c6-9f0b-80ae4705522b', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-01 06:16:59.579985+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a759ae8b-5b8a-487c-9b6a-a0e4291b38a1', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-01 06:16:59.597508+00', ''),
	('00000000-0000-0000-0000-000000000000', '27e2c49f-0377-4403-8a66-c665d451efae', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 00:18:39.445869+00', ''),
	('00000000-0000-0000-0000-000000000000', '4163d855-6917-44c3-9004-ef3865a7438a', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 00:18:39.468821+00', ''),
	('00000000-0000-0000-0000-000000000000', '06244e26-730e-47e4-8d3d-7f9f596f52a6', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 03:48:58.296339+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0832ba9-2449-44e1-8a55-0159008e69b5', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 03:48:58.298033+00', ''),
	('00000000-0000-0000-0000-000000000000', '440c366a-0770-47c7-bcb4-3b0c2bb035d5', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 04:49:54.590766+00', ''),
	('00000000-0000-0000-0000-000000000000', 'befc10d4-a15e-491e-b0f5-ee2686e6c0fa', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 04:49:54.593704+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c3d517e-a5ab-46d8-95ab-a8ba41fea201', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 11:20:21.351825+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bac9fe06-b73b-477e-932c-96a58ffa10c3', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 11:20:21.362511+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ce2b697-5566-4b2c-8f21-b893c9ae6160', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 13:45:34.279445+00', ''),
	('00000000-0000-0000-0000-000000000000', '03267044-a77f-4c5a-b197-0abc624fcb78', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 13:45:34.296486+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b996bc47-9ef1-463a-b984-bb9940f33e10', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 15:00:38.813574+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b85831f-0a16-4f83-b0e0-107258bf9c72', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 15:00:38.816785+00', ''),
	('00000000-0000-0000-0000-000000000000', '98400fa4-3e11-4a90-a786-5128160ed791', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 16:00:41.218699+00', ''),
	('00000000-0000-0000-0000-000000000000', '7b65f44c-14b4-4e69-a9c9-b8589e99110c', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-04 16:00:41.221711+00', ''),
	('00000000-0000-0000-0000-000000000000', '26bcbfc7-2fd1-484d-92ac-4a0c0fcc5c25', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-05 08:34:31.02946+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7945315-d3fc-4fd5-a999-ea0277959931', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-05 08:34:31.041672+00', ''),
	('00000000-0000-0000-0000-000000000000', '59bc9379-73a6-4f0e-852f-d7863ea48d3f', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-05 12:14:40.589032+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a977ae4-cc7c-41b4-855d-51b28a25c585', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-05 12:14:40.609014+00', ''),
	('00000000-0000-0000-0000-000000000000', '039223f1-fcda-4462-94c0-4c8b3bb806eb', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 02:06:22.604445+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb4f7429-3065-4e42-9ab5-a9a19bc028b9', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 02:06:22.619333+00', ''),
	('00000000-0000-0000-0000-000000000000', '36e685f8-e49b-4478-adfa-bc31f4c7f593', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 03:07:05.526367+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f4932f25-5a58-4f1a-9506-41d6a7aee47e', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 03:07:05.531921+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b57404e-f977-4876-bf1f-dc7a663d2df2', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 04:32:31.114924+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cefcd789-f267-48f1-ad1c-3a3c6d84243b', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 04:32:31.119199+00', ''),
	('00000000-0000-0000-0000-000000000000', '247edfa2-5b01-46d2-84bf-67e95d4a830e', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 06:31:26.489765+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4712ee6-9311-4b34-89ac-06717f250c86', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 06:31:26.505971+00', ''),
	('00000000-0000-0000-0000-000000000000', '21229134-6880-4306-9fd2-2fabb387f038', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 07:52:08.095786+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5292661-ed75-45ae-a42b-813e341109cf', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 07:52:08.099912+00', ''),
	('00000000-0000-0000-0000-000000000000', '4386b787-8e3d-4829-b151-62bd837f232a', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 09:06:41.159818+00', ''),
	('00000000-0000-0000-0000-000000000000', '61f2b8ce-bb03-408f-9baa-be4b28c05eb3', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 09:06:41.163993+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e59b4a13-8ede-48c1-aa88-765a740bd73f', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 13:37:11.905863+00', ''),
	('00000000-0000-0000-0000-000000000000', '5712332a-93e7-47ad-8727-6afb53529c66', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 13:37:11.917413+00', ''),
	('00000000-0000-0000-0000-000000000000', '334b0fd0-ebd9-40af-8067-2bbdb7b3ae43', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 13:37:12.034239+00', ''),
	('00000000-0000-0000-0000-000000000000', '53ed408b-0a6c-45c6-8578-484d4382dfa1', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 14:42:41.683402+00', ''),
	('00000000-0000-0000-0000-000000000000', '80c11b9f-38c8-4647-99c1-31f3f984cc94', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 14:42:41.687388+00', ''),
	('00000000-0000-0000-0000-000000000000', '84499284-7526-46b5-85ce-4c1c3f1bc20d', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 15:42:30.409717+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a8dda8a-26a9-4e19-8872-a16cc7a79c9e', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-06 15:42:30.41231+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b1e7a8b8-900b-41a0-a77b-c727211785aa', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-07 01:14:17.366389+00', ''),
	('00000000-0000-0000-0000-000000000000', '58c2ba65-de9b-4523-bb95-2ee52e13338b', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-07 01:14:17.372152+00', ''),
	('00000000-0000-0000-0000-000000000000', '892f1f48-b55e-44e1-a63f-6aef92f3cf20', '{"action":"user_confirmation_requested","actor_id":"dbd40179-430a-4624-bb6b-aa277a60cb89","actor_username":"afifjamhari@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-03-07 02:07:58.009165+00', ''),
	('00000000-0000-0000-0000-000000000000', '4095f0e6-ac96-446b-8795-0672123cbccf', '{"action":"login","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-07 02:08:42.521685+00', ''),
	('00000000-0000-0000-0000-000000000000', '78e24dc1-5702-43ec-8f73-9694691b2f27', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-07 02:11:58.632325+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af511622-f13f-4b22-a329-03a011afbce2', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-07 02:11:58.633272+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a57894f-c523-43a4-be4d-8c5623719eeb', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-07 03:12:03.059015+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cafee2de-2e99-4405-a0d8-6c8ebdb92023', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-07 03:12:03.066614+00', ''),
	('00000000-0000-0000-0000-000000000000', '3fe52436-2d6c-4fa0-bdae-8bf3fbe8338d', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-07 03:12:03.102607+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2d37282-397d-4668-91c7-12dc367e1610', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-07 03:12:03.459374+00', ''),
	('00000000-0000-0000-0000-000000000000', '5137939c-723d-4982-be7a-0d3067513b4b', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-07 03:12:03.802507+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d5cf857-b576-4395-b303-40906a929062', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-07 03:12:03.832728+00', ''),
	('00000000-0000-0000-0000-000000000000', '098d8672-00e5-445e-bb8d-0c02984abfc2', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-07 03:12:03.847875+00', ''),
	('00000000-0000-0000-0000-000000000000', '61f3cfcb-6285-4315-aa79-eaea85e5b6f6', '{"action":"token_refreshed","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-10 01:35:59.851586+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e188087d-1aac-41cb-a6b0-43e1388163b0', '{"action":"token_revoked","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"token"}', '2025-03-10 01:35:59.870539+00', ''),
	('00000000-0000-0000-0000-000000000000', '40fc8dea-e95a-452b-8438-e737610d07c1', '{"action":"logout","actor_id":"4dded66b-f4e3-46c3-a0c1-872ebb53c508","actor_username":"124220018@student.upnyk.ac.id","actor_via_sso":false,"log_type":"account"}', '2025-03-10 01:43:02.740252+00', ''),
	('00000000-0000-0000-0000-000000000000', '4555acd1-df8f-432c-aa8f-44b33adef9b4', '{"action":"login","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 01:44:00.957744+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d864588-0259-472a-b24f-ac01a3303b06', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-10 02:46:09.596666+00', ''),
	('00000000-0000-0000-0000-000000000000', '6ccf661d-b99f-4607-b42c-a9ba6b0e958f', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-10 02:46:09.59841+00', ''),
	('00000000-0000-0000-0000-000000000000', '80c13544-3c30-44e5-9383-ef65e21535b5', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 02:36:24.565463+00', ''),
	('00000000-0000-0000-0000-000000000000', '24d7133d-0200-4a57-916c-0f3038b89d5c', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 02:36:24.579329+00', ''),
	('00000000-0000-0000-0000-000000000000', '42a7a50b-ef83-4949-a623-4b0127d8c199', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 03:37:13.799584+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3beed9c-7ba3-4f89-899d-1ea863593d46', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 03:37:13.805946+00', ''),
	('00000000-0000-0000-0000-000000000000', '049812e2-f541-4d61-9dbf-9d565818b8b7', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 04:38:35.457666+00', ''),
	('00000000-0000-0000-0000-000000000000', '03cefb22-ce2d-4c7b-9aea-f744aa8c9bd1', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 04:38:35.459681+00', ''),
	('00000000-0000-0000-0000-000000000000', '58e0350c-1138-4c0c-b4ae-6548736e4e8b', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 04:38:36.310624+00', ''),
	('00000000-0000-0000-0000-000000000000', '57806290-1a55-427e-a4e3-a911b1e59601', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 05:47:12.354583+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c55e3c6a-2890-4ea6-9a02-0d14394ba740', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 05:47:12.360574+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd6e04fc5-93ad-4a2b-985c-0405f4fd549d', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 07:15:48.5824+00', ''),
	('00000000-0000-0000-0000-000000000000', '68d3f405-d880-48b4-a0c5-9cbb03e76e4b', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 07:15:48.59916+00', ''),
	('00000000-0000-0000-0000-000000000000', '25f7d65e-1ba1-4f65-a25c-e3f207e402b0', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 00:20:30.484998+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b920c863-4fdf-4dfb-9758-d943f0581104', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 00:20:30.515712+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c0b42ceb-804d-4fc3-a24b-67002c0783e7', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 03:39:14.63709+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d81c097-c0c1-48bf-9c90-ce6bf90bf922', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 03:39:14.649715+00', ''),
	('00000000-0000-0000-0000-000000000000', '43096049-899b-45bb-af50-a880bfe23998', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 03:39:14.788743+00', ''),
	('00000000-0000-0000-0000-000000000000', '365c1ec8-1643-4192-acd7-e9fa0c8494cc', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 03:39:15.228662+00', ''),
	('00000000-0000-0000-0000-000000000000', '508d8821-5924-427c-8e2e-440ed01d40fa', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 05:14:35.624245+00', ''),
	('00000000-0000-0000-0000-000000000000', '23212bb3-635d-4ecf-b132-3d4a3ea35696', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 05:14:35.634312+00', ''),
	('00000000-0000-0000-0000-000000000000', '25ba9067-1920-429b-83fb-9dd33730113b', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 05:14:38.71362+00', ''),
	('00000000-0000-0000-0000-000000000000', '767503eb-06a4-47b8-af2b-e38275ba2f96', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 06:15:14.979867+00', ''),
	('00000000-0000-0000-0000-000000000000', '14197b92-53da-4cad-b635-48ce9aa5f609', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 06:15:15.006731+00', ''),
	('00000000-0000-0000-0000-000000000000', '2881334f-ebb9-48a8-beda-8cc7a0c214f5', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 06:15:15.098316+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ad824d51-53c8-449f-96bc-bab42a8a712f', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 12:28:59.003998+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa9c7ed9-29c4-477f-a137-57fe72a6aad6', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 12:28:59.029279+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd33ab25f-43a3-439c-b784-e30a550ff8e0', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 12:29:02.183548+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b81bcf89-ba0e-4e72-bd0e-3d76bcb91bf1', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 13:29:23.891052+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f483c73-9f44-43d9-ab97-81dbda7fc8e7', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 13:29:23.895558+00', ''),
	('00000000-0000-0000-0000-000000000000', '29308d7f-77c8-4836-9651-005773f67254', '{"action":"login","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-13 02:13:55.435028+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dc38b7dc-9621-4c67-8d86-99d5663befef', '{"action":"login","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-13 02:15:49.705755+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1e84f90-0cc1-4e47-b863-c864f5a06377', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 02:23:49.759015+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dd4c33c3-d8f2-45d3-b6eb-3905ad24c1f9', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 02:23:49.76272+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ce848bc-d98e-4089-9c82-e9a1733fd23b', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 03:03:53.256883+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd09109d9-e4df-40b6-b3bc-0538a0f1616a', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 03:03:53.259751+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc312fa3-26f7-499c-93b4-afd6e720ad0d', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 03:04:02.420973+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd7286c06-63ab-4690-9ce3-6eeb45b84bea', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 03:04:02.753303+00', ''),
	('00000000-0000-0000-0000-000000000000', '667311a5-a7ad-48d8-a6dd-7fa9664512b5', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 04:23:12.62953+00', ''),
	('00000000-0000-0000-0000-000000000000', '48164cdc-72e7-4ef4-925a-f01e7fdbff3a', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 04:23:12.631559+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f8ccaf1-e383-4149-ab08-c89133d3d2b6', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 05:07:33.641644+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f101454-b5eb-4a8f-9616-4597501594a0', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 05:07:33.644295+00', ''),
	('00000000-0000-0000-0000-000000000000', '418730a4-c418-4a52-854d-4fa8cd025591', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 05:33:10.923138+00', ''),
	('00000000-0000-0000-0000-000000000000', '23b7314e-f3cd-4329-abf6-5b8e70f1f1ae', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 05:33:10.924958+00', ''),
	('00000000-0000-0000-0000-000000000000', '7775db78-8095-4f35-8ec7-d771da7a400f', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 05:33:11.521746+00', ''),
	('00000000-0000-0000-0000-000000000000', '52c8adf2-103a-4618-918b-fe657e50a7c2', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 05:33:12.238368+00', ''),
	('00000000-0000-0000-0000-000000000000', '322d8e61-f783-4113-a5af-3e407be53c0d', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 05:47:09.482819+00', ''),
	('00000000-0000-0000-0000-000000000000', '5177f2e3-85c4-41d5-a973-9efa6c21b332', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 05:47:09.486115+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a41e2fa3-06b2-4141-9ff5-6782a03cc0d1', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 06:09:52.350437+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6cd8bee-86d6-42bb-a7fd-46d507f0a220', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 06:09:52.354139+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ffe79dcf-ef1e-48da-9345-afa15b8942d7', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 12:03:14.643263+00', ''),
	('00000000-0000-0000-0000-000000000000', '88dc4100-2408-4a41-a90d-a3f2b0287f3e', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 12:03:14.65758+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b80b69e7-cda6-4221-81cd-219567667e71', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 12:03:15.922443+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d09df83-967d-421b-8a66-99945f466e54', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 12:07:13.333332+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b0c0e1d6-ee0e-49d3-94b9-8887c636bf47', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 12:07:13.338415+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f3bb3d25-a8e2-4c7a-b2dd-534bf74bf34d', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 12:07:17.243061+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e537b640-8c8e-4100-87c8-c5f1fa8bff8d', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 12:07:17.26276+00', ''),
	('00000000-0000-0000-0000-000000000000', '8be1f389-0a25-4976-9c98-37ae2a191fe4', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 13:07:11.931858+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a413faa8-5bfc-46ab-833f-a6ddc47620e8', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 13:07:11.935546+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a307b669-4e6a-48b5-9659-e209e83956f1', '{"action":"logout","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account"}', '2025-03-13 14:04:50.716025+00', ''),
	('00000000-0000-0000-0000-000000000000', '04becd9c-c842-4f5d-8f4d-3890e62befcf', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:05.384391+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e5d2d9f-ca61-4b0b-8ca9-2db1db39173f', '{"action":"token_revoked","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:05.3876+00', ''),
	('00000000-0000-0000-0000-000000000000', '9542a3ff-62b8-4f34-98cf-7fc0657ad779', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:07.075812+00', ''),
	('00000000-0000-0000-0000-000000000000', '9037b604-d95f-4011-91d2-8ead2cb1399c', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:07.304663+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d36b277-eae3-441f-8e9e-00e9a10737c3', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:07.343603+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d4e7b89-6a92-43b6-a8dd-b9422b275dd2', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:08.684572+00', ''),
	('00000000-0000-0000-0000-000000000000', '96eef5e9-ff6c-446f-9471-3c62a7d77f92', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:08.80881+00', ''),
	('00000000-0000-0000-0000-000000000000', '0dd701bb-b487-439a-85c5-d30d40867df1', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:08.847794+00', ''),
	('00000000-0000-0000-0000-000000000000', '8701dba6-f041-4e59-8446-ebf7e5b54a88', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:09.094142+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e3b2fa92-a6cb-49bb-910d-aa23a2f9435a', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:09.501991+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bff0674b-3aec-44f8-984a-a008f7232fef', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:09.52313+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0ded1b5-134d-48be-814a-ee9b53991ec8', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:09.612388+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8098320-c220-49ee-9094-15d4c36a9753', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:10.264533+00', ''),
	('00000000-0000-0000-0000-000000000000', '74884b29-1b48-4921-b39b-ca54862e62a7', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:21.246485+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a749894b-25ca-4a2a-896a-fce7f980fd1f', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:25.438208+00', ''),
	('00000000-0000-0000-0000-000000000000', '9983b266-8d65-4d96-9a15-216b0d888ddc', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:28.646626+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c685c8d-fae0-41c8-b8d8-abc08e96187e', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:30.187736+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c975d688-c96d-47e1-abcd-e518bd6426bb', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:32.731902+00', ''),
	('00000000-0000-0000-0000-000000000000', '2890bc39-2e4c-426f-9757-e9abcb35c7f7', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:33.506735+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b78bcf40-73ff-464f-8576-2145879f5914', '{"action":"token_refreshed","actor_id":"74016d65-d296-4d83-b1ce-0cd9a3b38b76","actor_username":"afifjamhari.id@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-13 14:16:33.518452+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aec3c033-5b48-4ef8-8bd7-6baf2e0deae1', '{"action":"login","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-13 14:28:09.692984+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ff40428-c307-4d3e-ae0f-a15c5f847631', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 02:14:47.688426+00', ''),
	('00000000-0000-0000-0000-000000000000', '09a329cf-8b6e-42c3-95bd-b07a078f92a0', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 02:14:47.712652+00', ''),
	('00000000-0000-0000-0000-000000000000', '33de7985-c7f5-44c3-8ca3-678f7a4eb4ed', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 03:15:16.025828+00', ''),
	('00000000-0000-0000-0000-000000000000', '25188eae-e4eb-49fc-953b-6622098d0750', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 03:15:16.04185+00', ''),
	('00000000-0000-0000-0000-000000000000', '0fa38592-6c69-4e46-af67-fd66a0054aa8', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 03:15:16.066536+00', ''),
	('00000000-0000-0000-0000-000000000000', '3fc2efde-c55b-4ba6-9f4a-f5ddacca85c3', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 03:15:16.081675+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f26d0f88-aafa-4fad-a003-ff6ea25c5189', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 03:15:16.097777+00', ''),
	('00000000-0000-0000-0000-000000000000', '019f3463-ace4-43ef-bbc1-80e1c71dc56b', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 04:15:18.593311+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a87d2c7-5d0b-4a4b-989f-a670e04acd9f', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 04:15:18.605949+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a524934-c1f7-4274-8d5f-41c960738f7f', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 06:57:01.443869+00', ''),
	('00000000-0000-0000-0000-000000000000', '56b72fd8-35e2-4465-bece-2692786968bb', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-14 06:57:01.474593+00', ''),
	('00000000-0000-0000-0000-000000000000', '8cb4360b-5d00-40af-b8d1-668c676f4415', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 03:42:32.718361+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd409ec0d-48e4-4d5b-b617-5a0dc8e6e4ff', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 03:42:32.736493+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d0d211b-f0c1-45f2-985c-64e7725ff345', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 04:40:48.705195+00', ''),
	('00000000-0000-0000-0000-000000000000', '931b3a1d-fdb4-430a-9473-3d8ce473eb7c', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 04:40:48.713251+00', ''),
	('00000000-0000-0000-0000-000000000000', '65901361-4954-49c3-9400-08dc5ee513ef', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 05:40:49.416698+00', ''),
	('00000000-0000-0000-0000-000000000000', '86e9666f-f3ff-4ab7-9fea-5bdd36de5fa2', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 05:40:49.419272+00', ''),
	('00000000-0000-0000-0000-000000000000', '6cd74077-a8b8-44e6-860e-69973cf5fea1', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 05:40:49.60505+00', ''),
	('00000000-0000-0000-0000-000000000000', '78557d91-281b-4cd3-ae24-5723c402e777', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 05:40:49.621445+00', ''),
	('00000000-0000-0000-0000-000000000000', '50b5d5a1-dfa0-47ee-8740-5594ef34e031', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 06:40:50.933807+00', ''),
	('00000000-0000-0000-0000-000000000000', '75aacba2-db69-40d9-b91c-742f47fe44b5', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 06:40:50.953744+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de217c0c-7c80-4d19-872f-4e72c0950e98', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 07:46:08.682093+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1518eeb-a270-4c75-9b52-c938bde8efb2', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 07:46:08.687089+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c126c0eb-1445-4910-98cf-78bee8ba0261', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 09:17:19.798677+00', ''),
	('00000000-0000-0000-0000-000000000000', '74b1f7ef-a7a8-4fe6-a73a-dff9912b6d0a', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 09:17:19.820283+00', ''),
	('00000000-0000-0000-0000-000000000000', '863d0ddf-6418-4048-a751-a6e4832295e4', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 09:17:20.039179+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ad42c6c8-2853-4b63-a1a5-aaf870b0b242', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 10:15:35.709461+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e7a85b8-b9b6-4aee-9db7-c679804c2f02', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 10:15:35.714637+00', ''),
	('00000000-0000-0000-0000-000000000000', '23f5a3f5-8fe1-4dc0-8e24-17df363d106e', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 02:22:25.24736+00', ''),
	('00000000-0000-0000-0000-000000000000', '951359a2-eec0-433d-bc10-2ef27e7a861b', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 02:22:25.278215+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff42f379-89a5-46df-ad8d-a47966d4693a', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 04:34:20.275743+00', ''),
	('00000000-0000-0000-0000-000000000000', 'edf7f87c-6808-4a78-8f7c-d027d15a0749', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 04:34:20.291777+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff7b6313-b2b1-4c0e-a5ed-4b6f5fe90c1b', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 01:34:45.804714+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9245397-5c99-4df9-8353-abfe7f624793', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 01:34:45.833919+00', ''),
	('00000000-0000-0000-0000-000000000000', '43068160-13f2-403f-8f27-ddda88f5c8b6', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 06:35:16.897975+00', ''),
	('00000000-0000-0000-0000-000000000000', '604482f0-ff13-4685-ac18-f3fdeff45096', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 06:35:16.909143+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9297357-52c2-4cf7-9980-e316239a317f', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 06:35:16.939981+00', ''),
	('00000000-0000-0000-0000-000000000000', '09758e19-66e3-490a-92a8-c9d331d172aa', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 06:35:17.523635+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd1773fa-e505-41bb-91a9-5caa792436a7', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 11:03:59.39079+00', ''),
	('00000000-0000-0000-0000-000000000000', '5560d55c-855b-41a4-827f-dd013dbb06e6', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 11:03:59.409729+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c30ed72a-e0b2-4247-b184-94d646397bc6', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 12:51:44.872799+00', ''),
	('00000000-0000-0000-0000-000000000000', '52d124a2-294d-401a-aa1a-22113608c6f0', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 12:51:44.888581+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e78476b6-ef28-4e19-98de-b9055700085b', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 14:06:38.076465+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd99b678c-312b-465f-b3ae-5335bc42aec4', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 14:06:38.079939+00', ''),
	('00000000-0000-0000-0000-000000000000', '2c04bad8-8c80-4ac8-b522-0e4805db3912', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 15:09:25.472969+00', ''),
	('00000000-0000-0000-0000-000000000000', '4141ff8f-501c-42d5-85e6-8b5fbc959ff6', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 15:09:25.478134+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7683ad8-49a0-42c2-b29f-6a0146669193', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 16:10:36.873868+00', ''),
	('00000000-0000-0000-0000-000000000000', '3070b7e8-11c3-44c4-8235-70b5b68fd910', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 16:10:36.894881+00', ''),
	('00000000-0000-0000-0000-000000000000', '99220adc-898a-4366-9330-c9d8e8c82a67', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 16:10:36.950959+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b5369389-035b-4da4-adb7-612e28d9b599', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-17 16:10:37.055066+00', ''),
	('00000000-0000-0000-0000-000000000000', '4982f50b-804c-460e-897f-f7b49f8f6233', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-18 01:58:36.827073+00', ''),
	('00000000-0000-0000-0000-000000000000', 'edb8b9ac-1491-4c68-a38c-70c73e08872b', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-18 01:58:36.858094+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd829da42-e24e-4fbd-acab-710d4ca2d04b', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-18 05:31:45.627139+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa5a0f5f-ce6f-47ef-bc17-6ac5542f0981', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-18 05:31:45.629608+00', ''),
	('00000000-0000-0000-0000-000000000000', '33770aa9-25c9-4a66-be79-a5514968cfb4', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-18 13:21:54.050971+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5e8c04b-e0a9-4216-847c-cbc203f45786', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-18 13:21:54.080994+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb3850f5-cf2b-48e0-9b20-5e5ff56a54a6', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-18 14:22:22.526761+00', ''),
	('00000000-0000-0000-0000-000000000000', '90336e9f-a0be-465d-9370-a0248543512c', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-18 14:22:22.529699+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b98a171c-d9e2-4b5f-91d4-a73320eb4747', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 00:25:55.956576+00', ''),
	('00000000-0000-0000-0000-000000000000', '69c267dc-3ac9-45bb-9d2b-81182275cb44', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 00:25:55.961376+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d2e532c-f21f-426e-98d0-54fd23e8ab60', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 01:24:00.393728+00', ''),
	('00000000-0000-0000-0000-000000000000', '51e72549-1a41-4a57-ac75-002385611476', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 01:24:00.397306+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c0ebd51-3ba6-41b2-87ba-4bb10205a09b', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 02:24:07.550503+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec8d1b27-b7aa-4a8d-b3c6-924eb15db13a', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 02:24:07.55314+00', ''),
	('00000000-0000-0000-0000-000000000000', '198404c7-edb1-4aa0-a974-05e0b01564ae', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 03:25:23.006419+00', ''),
	('00000000-0000-0000-0000-000000000000', 'efb24933-c5b6-48c7-93ac-15d4d88f3496', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 03:25:23.023397+00', ''),
	('00000000-0000-0000-0000-000000000000', '65557eba-edb1-4cac-b681-2f5c6c814024', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 04:23:44.389531+00', ''),
	('00000000-0000-0000-0000-000000000000', '10b6e7c9-2911-4fed-8a12-0dcdccc7c6bc', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 04:23:44.39231+00', ''),
	('00000000-0000-0000-0000-000000000000', '67a938d9-6d3e-487b-8117-da9c39837cfa', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 05:27:51.116603+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a90cbaa0-2347-4bae-91d7-7a706d503702', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 05:27:51.122305+00', ''),
	('00000000-0000-0000-0000-000000000000', '76ef6e18-99c4-49c4-8e79-adcae074c08a', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 06:26:18.175524+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eeca6960-916f-4627-b563-5d2ccecf060a', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 06:26:18.177723+00', ''),
	('00000000-0000-0000-0000-000000000000', '9204858f-9276-4f27-9896-c5e0e24af987', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 07:27:50.115558+00', ''),
	('00000000-0000-0000-0000-000000000000', '78aca3b3-c2da-4271-82a0-76c68a76fa05', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 07:27:50.137874+00', ''),
	('00000000-0000-0000-0000-000000000000', '3457d7c8-c137-4558-ac51-12efd13e9d0d', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 08:28:37.647057+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1a90727-1f25-4e40-a868-cb76fa5f404c', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 08:28:37.650797+00', ''),
	('00000000-0000-0000-0000-000000000000', '04594ff1-9b80-438b-b908-246172729cf2', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 09:50:29.584226+00', ''),
	('00000000-0000-0000-0000-000000000000', '697c19a0-484f-40a5-bf55-b4645593456d', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 09:50:29.5878+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ba2dbdc4-137a-4a68-bbde-3bde344f1a49', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 11:04:31.377918+00', ''),
	('00000000-0000-0000-0000-000000000000', '75a662b7-dcd1-4520-acf6-cc2d564927b0', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 11:04:31.382179+00', ''),
	('00000000-0000-0000-0000-000000000000', '4afc8087-c221-4521-984f-1cc6155a59e5', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 13:18:41.849952+00', ''),
	('00000000-0000-0000-0000-000000000000', '31fa1e6c-2c16-48a2-9987-7a5c66394f3b', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 13:18:41.853753+00', ''),
	('00000000-0000-0000-0000-000000000000', '802d1e12-6313-4135-b621-20b24d44da1c', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 14:18:48.747238+00', ''),
	('00000000-0000-0000-0000-000000000000', '89f3a5f3-3933-452e-bca7-3d08b45b257b', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 14:18:48.75372+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e898f117-ba40-4c2c-948c-1c63d1ab2e2e', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 15:19:27.607317+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e0b9f8f-7a96-4b46-afd1-a1d5c70a61f6', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 15:19:27.612131+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f189449-079b-4c1c-aca7-a5b4f2429af7', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 16:31:07.634884+00', ''),
	('00000000-0000-0000-0000-000000000000', '4840bb0a-0af3-4d75-805c-9e42eea353ec', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-19 16:31:07.640239+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4ff4d70-336b-4632-bc95-b22ca9c66fdd', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-20 03:10:22.319379+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd80c104-9fe0-450a-b704-bcabb034d90a', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-20 03:10:22.331808+00', ''),
	('00000000-0000-0000-0000-000000000000', '59d23ff7-992a-4e15-a88b-b0ce862ced5a', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-20 04:13:15.591784+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c39ea361-4d3b-41ba-89e5-93d028495f12', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-20 04:13:15.596309+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f8cf399-fe81-4bbc-93b5-9a261ac2f075', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 01:19:50.327827+00', ''),
	('00000000-0000-0000-0000-000000000000', '6091d343-8881-4c61-a95d-9325f317c5f0', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 01:19:50.34875+00', ''),
	('00000000-0000-0000-0000-000000000000', '3968bfaf-9559-439f-a489-9de3854220b2', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 02:24:59.639748+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cf3db181-4196-4ecb-b1a8-4707335f056d', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 02:24:59.651188+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f4d9b47-65d8-46bf-8651-056f0c093c9e', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 03:34:20.108589+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b9a9bea9-1267-42eb-aa50-25a8eee9cecb', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 03:34:20.127403+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fdd6c902-692e-4042-9313-baa0754d3ee2', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.50738+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f485af5-61c0-4d11-8c4b-1a820bf7e43e', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.51503+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5872d8c-2a47-4741-b6ac-7f71aa8c9235', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.585642+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4add122-64ea-4c4f-9c71-565f2f4c4d76', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.596284+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be6e93b4-5fc9-4fcc-a178-7e641ca950e6', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.609171+00', ''),
	('00000000-0000-0000-0000-000000000000', '694f2439-1e48-44c7-898d-e88265b4d848', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.757629+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d9a5a0f-b655-4cd5-a309-15c520861dc7', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.770421+00', ''),
	('00000000-0000-0000-0000-000000000000', '63f49d31-ec0f-4dcc-804d-0b94935bcd3f', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.779749+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f843dd53-ac9e-46d5-b518-d32ab51ba020', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.80235+00', ''),
	('00000000-0000-0000-0000-000000000000', '4982dbd5-38b8-4c4c-88f3-f2b77ffc5249', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.827061+00', ''),
	('00000000-0000-0000-0000-000000000000', '62e9a87a-217a-47f1-a0de-25bae7e39061', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.860115+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc4eb0e5-a807-4559-a250-1a017918ef62', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.868905+00', ''),
	('00000000-0000-0000-0000-000000000000', '0f9f84cf-e737-4d1a-8935-18c4e929dab0', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.876085+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b1b47542-c6e5-49aa-b261-cb74d7d8c971', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:40.892261+00', ''),
	('00000000-0000-0000-0000-000000000000', '3061f430-a7da-4823-8820-16c93d078c26', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:41.004426+00', ''),
	('00000000-0000-0000-0000-000000000000', '419effb8-0d29-4f37-aa88-9f82401d734c', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 04:34:41.094609+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2169da4-819a-4dc6-a347-81329d3162aa', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 06:11:31.356737+00', ''),
	('00000000-0000-0000-0000-000000000000', '2bf84d0a-e993-4262-91e8-3c5ed6d358b0', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 06:11:31.363857+00', ''),
	('00000000-0000-0000-0000-000000000000', '800ff628-fbff-418f-9b68-70cb1a6dff17', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 07:12:00.356806+00', ''),
	('00000000-0000-0000-0000-000000000000', '37e55e0c-a657-4b3b-8151-b60bd1e050ca', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-21 07:12:00.376283+00', ''),
	('00000000-0000-0000-0000-000000000000', '681fd631-a37f-4b40-be5e-7291982f5cf6', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-23 03:43:00.593058+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3edd925-04af-46b9-9de0-b9b35be61ff2', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-23 03:43:00.609519+00', ''),
	('00000000-0000-0000-0000-000000000000', '51effdc8-d6f2-4ec7-9375-4058af3e752e', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-23 04:43:08.060508+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e434137-4292-41e7-85bb-e8616cb8c20d', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-23 04:43:08.064219+00', ''),
	('00000000-0000-0000-0000-000000000000', '556d7316-2716-4543-afda-6c352921fb9c', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-23 05:43:49.304499+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1626acb-6ffb-42a7-8040-7087f446e547', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-23 05:43:49.31004+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a822394-d776-4c6c-8413-16d4b98c32f0', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-23 07:21:07.49005+00', ''),
	('00000000-0000-0000-0000-000000000000', '01f9ba16-7f5a-4e6b-a2c1-49d74602e3c5', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-23 07:21:07.4996+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a04ecbe6-0aaa-45b3-8b06-1bc54199abd4', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-23 14:31:07.075408+00', ''),
	('00000000-0000-0000-0000-000000000000', '90ffff13-c30d-4dc9-a816-0bde3c09d688', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-23 14:31:07.084996+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a2bc6af6-bdb9-4e71-b58d-1d5aad2a0429', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-24 14:01:17.059537+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a243963-fb4a-4ea9-9df4-0875366920bf', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-24 14:01:17.092479+00', ''),
	('00000000-0000-0000-0000-000000000000', '89045e71-5614-4ca6-ae2a-3892e4d6700c', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-24 15:05:27.12543+00', ''),
	('00000000-0000-0000-0000-000000000000', '44ffc62d-2837-42a4-b756-b6d5fff828c5', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-24 15:05:27.1386+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1403ee6-7277-4a1b-8a55-24a7ed67f872', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-25 04:59:55.283094+00', ''),
	('00000000-0000-0000-0000-000000000000', '405ed82e-b2ea-4293-b8a1-fa04d4083229', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-25 04:59:55.315807+00', ''),
	('00000000-0000-0000-0000-000000000000', '2abb70df-9c69-404d-9f1a-d99d502b1507', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-25 05:59:55.580028+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7211c26-c1ec-40c9-ae57-f28b1003052e', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-25 05:59:55.595724+00', ''),
	('00000000-0000-0000-0000-000000000000', '3523935a-46cc-4d56-9cf5-d923d658736c', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-25 05:59:56.039443+00', ''),
	('00000000-0000-0000-0000-000000000000', '597af388-6840-4bca-b89d-4fbeb03ade7b', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-25 07:08:19.999252+00', ''),
	('00000000-0000-0000-0000-000000000000', '20c51191-106c-444e-a2cc-3b63d0b9c91c', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-25 07:08:20.01675+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a7c41de-8edf-410f-86a9-bdd00d5ac679', '{"action":"login","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-26 04:12:46.627406+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d615663-cd0e-4b2e-8078-7309289a8430', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-26 05:15:52.082344+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f0dd7ad-f21e-481a-bce3-f6daa3de687a', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-26 05:15:52.09855+00', ''),
	('00000000-0000-0000-0000-000000000000', '0f8b87f6-8323-4c82-be9b-d2c63f9c1af0', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 12:06:33.733282+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a684bed0-2a40-45ef-98fc-5088158c174e', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 01:34:31.623696+00', ''),
	('00000000-0000-0000-0000-000000000000', '9776d770-6ab7-4695-89a7-cf96e3d7c1e6', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 01:34:31.648048+00', ''),
	('00000000-0000-0000-0000-000000000000', '10eba647-41b5-47a2-8e9d-bbc197f51922', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 03:16:03.33288+00', ''),
	('00000000-0000-0000-0000-000000000000', '7402ae38-9151-4003-bb3c-04117cef0aa3', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 03:16:03.337427+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e6144cc-c953-4220-bd63-764616e6b54b', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 04:18:51.367394+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dabb02d3-a307-477f-b95c-890dd74fc30d', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 04:18:51.370144+00', ''),
	('00000000-0000-0000-0000-000000000000', '27020afc-e742-49ff-b7c4-1fdd384314d0', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 06:27:06.628953+00', ''),
	('00000000-0000-0000-0000-000000000000', '7afc795d-8729-472e-9b50-5f67553f13e5', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 06:27:06.630979+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a393d90-984b-42b6-ad35-f5b7d8a0345e', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 02:45:59.858077+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac6ac90e-187e-4619-ad9b-03998191f6da', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 02:45:59.874169+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9c7ca14-ffd4-4cda-8f48-e7bd5fecd72d', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 03:56:47.890677+00', ''),
	('00000000-0000-0000-0000-000000000000', '80859efa-b0b2-463b-a18b-1a57753a1a5f', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 03:56:47.892502+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cda7b9f1-db68-4fc2-9087-9ac16249348c', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 02:07:57.537863+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b9d2811a-6674-4598-898c-bed0c6b3f272', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 02:07:57.549452+00', ''),
	('00000000-0000-0000-0000-000000000000', '56f93a55-71c4-49b8-a37a-2cd9b6f99dd0', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 03:09:01.618082+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b6819d0d-c88c-4ac5-b0c5-eefd8ca62fea', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 03:09:01.620281+00', ''),
	('00000000-0000-0000-0000-000000000000', '79839e32-3880-4f2c-a249-fbf70c8efd20', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 04:12:34.673952+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc7c4e3f-cd58-4f34-94a4-09823cdf33d1', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 04:12:34.677447+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d1c38cd-6ade-48a6-af28-3963a3cd81db', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 06:09:58.918404+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e11682c-eb26-4139-90da-721b3917db40', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 06:09:58.920441+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a84ea7b8-da1d-4e6f-9a9a-0a539c62b494', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 14:02:47.434508+00', ''),
	('00000000-0000-0000-0000-000000000000', '00d08f0e-c71b-42e9-b20a-330a15924681', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 14:02:47.459459+00', ''),
	('00000000-0000-0000-0000-000000000000', '221f451f-af4e-4ec4-8587-4e3a3e88929a', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 05:38:38.963189+00', ''),
	('00000000-0000-0000-0000-000000000000', '8febfd5c-9a38-483a-9566-a2a6f268715d', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 05:38:38.981619+00', ''),
	('00000000-0000-0000-0000-000000000000', '645f4348-f9e6-4b67-8c09-5ca7aacb4ce9', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 01:27:52.598353+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7eeb912-dc59-4585-ae8d-ccc98a9636e4', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 01:27:52.609502+00', ''),
	('00000000-0000-0000-0000-000000000000', '7d2fe41a-753e-4289-bbec-acb7a3e8a2af', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 02:25:56.030528+00', ''),
	('00000000-0000-0000-0000-000000000000', '2c500a23-9ccf-4935-bfa2-2722b0ee9969', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 02:25:56.038519+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a4a3b77-1033-4e26-94e3-d85fdbd1b08f', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 03:24:25.458201+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cd302cd3-7160-4439-9c9f-1d227d8abe8b', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 03:24:25.461715+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac56224d-d2bf-4f76-a5a3-c7597063c351', '{"action":"token_refreshed","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 05:29:28.623294+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e230a71f-71a7-419b-b23a-204829be59dd', '{"action":"token_revoked","actor_id":"44fad111-af1c-4f2c-b4e3-0727d2b4154c","actor_username":"test@example.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 05:29:28.625457+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('01152ebc-3771-40d7-8da9-0a661ca587b6', '644ff3d5-04ae-4578-a8b9-c95a217a8217', '21761934-7b55-49f4-bca1-6eadea38ef62', 's256', 'yHGrivRtaQLRJyoLtzr8x7X9qAD44mfc4tGzj9fnPvY', 'email', '', '', '2025-02-06 06:32:16.282497+00', '2025-02-06 06:32:16.282497+00', 'email/signup', NULL),
	('aa9f06f0-797e-45d7-9a34-6d9a52d38fbf', '644ff3d5-04ae-4578-a8b9-c95a217a8217', '091b0520-e516-4e37-b4b2-8a1cf9b8dbd6', 's256', 'ne9FmUCj7T4S52tBCCUhMm3FGhjMqq1WM_ayYgwybG0', 'email', '', '', '2025-02-06 10:03:18.614856+00', '2025-02-06 10:03:18.614856+00', 'email/signup', NULL),
	('cb8e761b-9589-45b6-9a2e-06a38085e2ef', '644ff3d5-04ae-4578-a8b9-c95a217a8217', '2247f1de-e43c-4a01-a92e-f2d13c8cf20b', 's256', 'F1S_dKMEwfPGuws7ut0U5M0xwGCpaK3wE70FtjtUU2I', 'email', '', '', '2025-02-06 10:04:40.331251+00', '2025-02-06 10:04:40.331251+00', 'email/signup', NULL),
	('43ca7616-b3e3-41a1-9dd1-59220fe5c9df', '644ff3d5-04ae-4578-a8b9-c95a217a8217', '42b8eadc-2722-4124-823d-d3948ea2a5c2', 's256', 'Hs0LCJ_wBYMjklCQ-V56Bo7sgxRa9nDtPJnu1rVrV_E', 'email', '', '', '2025-02-06 10:05:40.977235+00', '2025-02-06 10:05:40.977235+00', 'email/signup', NULL),
	('beb284d3-09fc-44bb-9283-cbed0a372c25', '644ff3d5-04ae-4578-a8b9-c95a217a8217', 'd456e0bb-d2cb-4159-b6cc-1d3497fe11ec', 's256', 'n143wsyFaSiDJyhT-tZkHxCRmH_XU8XVq1YldWD23lY', 'email', '', '', '2025-02-06 10:07:01.050651+00', '2025-02-06 10:07:01.050651+00', 'email/signup', NULL),
	('266befc5-a820-4ede-ba4f-fff4816eeace', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '02ded772-612b-4b85-813f-e9918703f42f', 's256', 'cz7Qgq42oeP708kO-z6_l3VmiLvFssaN2sHEkUXZupI', 'email', '', '', '2025-02-07 01:36:48.146658+00', '2025-02-07 01:38:04.409999+00', 'email/signup', '2025-02-07 01:38:04.409954+00'),
	('8df0683b-043f-43c8-93c9-0d0878612c5c', '2e732177-bcc4-4dff-9bd7-7d18df121458', '442858e0-7cab-48a5-be33-c335d0c6640e', 's256', 'IhTMcX7Vyo-jUwnBGD_JKhL1FsWxgdQjPTve4skHNMQ', 'email', '', '', '2025-02-07 03:43:41.999385+00', '2025-02-07 03:43:41.999385+00', 'email/signup', NULL),
	('039bf71e-6f22-4437-8e36-5fb027896a16', '86cb2dd0-c3d1-4a87-91e6-170cf473043a', '25aedf32-dda0-492d-a2e0-90a24501bd44', 's256', 'X_UTBPioMwJkyPRq3Uw4KfQl9hAMw5pjxN6gymlPlyI', 'email', '', '', '2025-02-07 03:47:34.833207+00', '2025-02-07 03:47:34.833207+00', 'email/signup', NULL),
	('c476f652-8333-4fba-8293-0f743af0dff4', 'ef371ed8-cbf8-4468-885e-79b9ccf57e8b', '7d50b0d9-6032-46b1-be13-b1fc72757390', 's256', 'eq-I_GjEIv3GJrY8CTAOnnTRwn05wKYHzpaPjO86NeM', 'email', '', '', '2025-02-18 03:42:44.691082+00', '2025-02-18 03:42:44.691082+00', 'email/signup', NULL),
	('95d80ab8-abe8-4017-b57e-45de7a30e1ea', 'ef371ed8-cbf8-4468-885e-79b9ccf57e8b', '52d45a49-1de4-41d3-ad27-403f3cb94b16', 's256', 'fz8NSgbGlNcf0k2D5P2tnqYLAvb9yijkW-vgvubTcaw', 'email', '', '', '2025-02-21 02:04:19.377513+00', '2025-02-21 02:08:22.860496+00', 'email/signup', '2025-02-21 02:08:22.860452+00'),
	('2a2add77-56d9-4a8a-9ba5-f0fe94ff4364', 'dbd40179-430a-4624-bb6b-aa277a60cb89', 'dd4e1cd6-7788-44df-9f97-0b3b516a6778', 's256', 'QAEzHMFTXGAhmYib-x6du7v6U1TVpl7V21cugON1bl8', 'email', '', '', '2025-02-25 03:29:32.188908+00', '2025-02-25 03:29:32.188908+00', 'email/signup', NULL),
	('458940cb-64c4-43fa-91ad-a6a3e6d966c7', '4dded66b-f4e3-46c3-a0c1-872ebb53c508', '1e38cd4c-8bfb-499a-8ec3-68c9b0ad8fc9', 's256', 'QDBZl_A9o4j2eKrh_4YSVnP2sRHoYBVFS7eVK1HiJzU', 'email', '', '', '2025-02-25 03:33:48.908979+00', '2025-02-25 03:35:07.232507+00', 'email/signup', '2025-02-25 03:35:07.232447+00'),
	('eb1fc3d6-59e5-45d5-a183-709c0d90522b', 'dbd40179-430a-4624-bb6b-aa277a60cb89', '512769d0-bfe5-4854-8105-142a1634a656', 's256', 'vjFPLMt7IDeWlgbD7HxlgiAfObsDweyYK5Bdj4xMO_I', 'email', '', '', '2025-03-07 02:07:58.009987+00', '2025-03-07 02:07:58.009987+00', 'email/signup', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '86cb2dd0-c3d1-4a87-91e6-170cf473043a', 'authenticated', 'authenticated', 'asdfdfaa@gmail.com', '$2a$10$gJ/C6t1CTLmxi4jo8YOcS.g1eZT0Bh4VvT4/oqTQNpIwovodTXRAi', NULL, NULL, 'pkce_6e2a8a2b13c96c11192fb297b3bb0d6ffdef52cb0e5041bb45f825c8', '2025-02-07 03:47:34.83384+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "86cb2dd0-c3d1-4a87-91e6-170cf473043a", "email": "asdfdfaa@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2025-02-07 03:47:34.827874+00', '2025-02-07 03:47:36.561054+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'dbd40179-430a-4624-bb6b-aa277a60cb89', 'authenticated', 'authenticated', 'afifjamhari@gmail.com', '$2a$10$kuFozBqZLQadDuiGdE3lquyi9JjBa.wLALooh7o8RCO7TmqCTBdRa', NULL, NULL, 'pkce_110de444ac1706d6b9d4562a8a592826899727dbc4c199cb578ec7d1', '2025-03-07 02:07:58.010586+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "dbd40179-430a-4624-bb6b-aa277a60cb89", "email": "afifjamhari@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2025-02-25 03:29:32.177077+00', '2025-03-07 02:07:59.844053+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '8c69c2c8-be65-4f9c-b289-8ac65f4a5df5', 'authenticated', 'authenticated', 'hmaakba@gmail.com', '$2a$10$rBOsZrcm1MYFMU8B4j43Xem8djbN.30b4..VbwNIh1q7ehhpzMuky', '2025-02-21 02:10:41.439375+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-02-21 02:11:23.066614+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-02-21 02:10:41.435062+00', '2025-02-21 02:11:23.077073+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '644ff3d5-04ae-4578-a8b9-c95a217a8217', 'authenticated', 'authenticated', 'rudi.setiawan@jogjaprov.go.id', '$2a$10$lMXwnEoBCvYYgr9lcRkY2u.pd/qnrOWLHGcAeB5JxhTTWrMKB93TW', NULL, NULL, 'pkce_46d264a2652e01446457fe0f3c277e39d3d3576d91813858f96eb5e8', '2025-02-06 10:07:01.051594+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "644ff3d5-04ae-4578-a8b9-c95a217a8217", "email": "rudi.setiawan@jogjaprov.go.id", "email_verified": false, "phone_verified": false}', NULL, '2025-02-06 06:32:16.255676+00', '2025-02-06 10:07:02.822406+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '2e732177-bcc4-4dff-9bd7-7d18df121458', 'authenticated', 'authenticated', 'sdafaasdfasdf@gmail.com', '$2a$10$vhS0c0/lLg0cghAM.xKh.uEARks/RzL8QQB5vIxqtQFmboknJyHv6', NULL, NULL, 'pkce_dd9a392f54b4ac5cdbcb59238458c380403e17766b88335e96363f19', '2025-02-07 03:43:42.001291+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "2e732177-bcc4-4dff-9bd7-7d18df121458", "email": "sdafaasdfasdf@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2025-02-07 03:43:41.982927+00', '2025-02-07 03:43:43.929608+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', 'authenticated', 'authenticated', 'afifjamhari.id@gmail.com', '$2a$10$sXrgQmL9lV4U.u9VEJdbNeCV1xk53VCZQe90g4ENiZFllqulg1baO', '2025-02-07 01:38:04.393964+00', NULL, '', '2025-02-07 01:36:48.158744+00', '', NULL, '', '', NULL, '2025-03-07 02:08:42.525014+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "74016d65-d296-4d83-b1ce-0cd9a3b38b76", "email": "afifjamhari.id@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-02-07 01:36:48.106256+00', '2025-03-13 14:16:05.393352+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '4dded66b-f4e3-46c3-a0c1-872ebb53c508', 'authenticated', 'authenticated', '124220018@student.upnyk.ac.id', '$2a$10$0E5QpmGJqPu3O39PuDF4eeSjhXdevq5tnOPPsmZPNyjshBWaatm2C', '2025-02-25 03:35:07.222359+00', NULL, '', '2025-02-25 03:33:48.911267+00', '', NULL, '', '', NULL, '2025-02-25 03:36:12.927819+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4dded66b-f4e3-46c3-a0c1-872ebb53c508", "email": "124220018@student.upnyk.ac.id", "email_verified": true, "phone_verified": false}', NULL, '2025-02-25 03:33:48.89986+00', '2025-03-10 01:35:59.894735+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', 'authenticated', 'authenticated', 'test@example.com', '$2a$10$CYbYVqd5lUFJVkgwP30zj.tF4rTsg0C18uU0yu3YiW7L2AbzV4FaO', '2025-02-21 02:12:01.29058+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-26 04:12:46.638736+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-02-21 02:12:01.287367+00', '2025-05-06 05:29:28.630342+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('644ff3d5-04ae-4578-a8b9-c95a217a8217', '644ff3d5-04ae-4578-a8b9-c95a217a8217', '{"sub": "644ff3d5-04ae-4578-a8b9-c95a217a8217", "email": "rudi.setiawan@jogjaprov.go.id", "email_verified": false, "phone_verified": false}', 'email', '2025-02-06 06:32:16.277215+00', '2025-02-06 06:32:16.277268+00', '2025-02-06 06:32:16.277268+00', '37316ba9-2ca6-40d9-ac8e-28085c428e33'),
	('74016d65-d296-4d83-b1ce-0cd9a3b38b76', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '{"sub": "74016d65-d296-4d83-b1ce-0cd9a3b38b76", "email": "afifjamhari.id@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-02-07 01:36:48.131078+00', '2025-02-07 01:36:48.131143+00', '2025-02-07 01:36:48.131143+00', 'fde23283-2144-4044-9f5a-af9b081d795d'),
	('2e732177-bcc4-4dff-9bd7-7d18df121458', '2e732177-bcc4-4dff-9bd7-7d18df121458', '{"sub": "2e732177-bcc4-4dff-9bd7-7d18df121458", "email": "sdafaasdfasdf@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-02-07 03:43:41.99395+00', '2025-02-07 03:43:41.994025+00', '2025-02-07 03:43:41.994025+00', '4fbd19ef-c867-4469-9a6e-d21f8d5e669b'),
	('86cb2dd0-c3d1-4a87-91e6-170cf473043a', '86cb2dd0-c3d1-4a87-91e6-170cf473043a', '{"sub": "86cb2dd0-c3d1-4a87-91e6-170cf473043a", "email": "asdfdfaa@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-02-07 03:47:34.830327+00', '2025-02-07 03:47:34.830378+00', '2025-02-07 03:47:34.830378+00', '7cf640fd-44cc-4cc1-9f17-55ce2dc24091'),
	('dbd40179-430a-4624-bb6b-aa277a60cb89', 'dbd40179-430a-4624-bb6b-aa277a60cb89', '{"sub": "dbd40179-430a-4624-bb6b-aa277a60cb89", "email": "afifjamhari@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-02-25 03:29:32.183973+00', '2025-02-25 03:29:32.184023+00', '2025-02-25 03:29:32.184023+00', '48c90b19-9ef5-46a9-841e-043c381d88d1'),
	('8c69c2c8-be65-4f9c-b289-8ac65f4a5df5', '8c69c2c8-be65-4f9c-b289-8ac65f4a5df5', '{"sub": "8c69c2c8-be65-4f9c-b289-8ac65f4a5df5", "email": "hmaakba@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-02-21 02:10:41.437173+00', '2025-02-21 02:10:41.437232+00', '2025-02-21 02:10:41.437232+00', '730a7d22-deb6-4b18-9315-8bd4dd0e7564'),
	('44fad111-af1c-4f2c-b4e3-0727d2b4154c', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', '{"sub": "44fad111-af1c-4f2c-b4e3-0727d2b4154c", "email": "test@example.com", "email_verified": false, "phone_verified": false}', 'email', '2025-02-21 02:12:01.288518+00', '2025-02-21 02:12:01.288579+00', '2025-02-21 02:12:01.288579+00', '57357c53-f8af-47ef-b0d9-425564e4f8d8'),
	('4dded66b-f4e3-46c3-a0c1-872ebb53c508', '4dded66b-f4e3-46c3-a0c1-872ebb53c508', '{"sub": "4dded66b-f4e3-46c3-a0c1-872ebb53c508", "email": "124220018@student.upnyk.ac.id", "email_verified": true, "phone_verified": false}', 'email', '2025-02-25 03:33:48.905298+00', '2025-02-25 03:33:48.905351+00', '2025-02-25 03:33:48.905351+00', 'a4b1dd75-f223-44eb-b59c-51c935204efc');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('de78ca3e-f32e-4833-89b6-684d4f28b9cb', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', '2025-03-13 14:28:09.694868+00', '2025-03-25 07:08:20.042934+00', NULL, 'aal1', NULL, '2025-03-25 07:08:20.04285', 'Next.js Middleware', '27.124.95.237', NULL),
	('c952e5ef-b6b1-4cab-ae7c-0386b07a8d80', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '2025-03-07 02:08:42.525091+00', '2025-03-13 14:16:33.519966+00', NULL, 'aal1', NULL, '2025-03-13 14:16:33.519897', 'node', '18.191.75.10', NULL),
	('8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', '2025-03-26 04:12:46.640036+00', '2025-05-06 05:29:28.632253+00', NULL, 'aal1', NULL, '2025-05-06 05:29:28.632183', 'Next.js Middleware', '27.124.95.237', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('c952e5ef-b6b1-4cab-ae7c-0386b07a8d80', '2025-03-07 02:08:42.53824+00', '2025-03-07 02:08:42.53824+00', 'password', '66449971-9fdc-4c9c-ad8e-e5720333ad89'),
	('de78ca3e-f32e-4833-89b6-684d4f28b9cb', '2025-03-13 14:28:09.706412+00', '2025-03-13 14:28:09.706412+00', 'password', '78aa17e3-b81d-497a-9a41-a6a6359c0400'),
	('8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6', '2025-03-26 04:12:46.682833+00', '2025-03-26 04:12:46.682833+00', 'password', 'a24fb927-acee-4b9d-85f3-4780aba79100');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('9ce86a83-2dae-41dd-b79d-a10dfafb4883', '644ff3d5-04ae-4578-a8b9-c95a217a8217', 'confirmation_token', 'pkce_46d264a2652e01446457fe0f3c277e39d3d3576d91813858f96eb5e8', 'rudi.setiawan@jogjaprov.go.id', '2025-02-06 10:07:02.826694', '2025-02-06 10:07:02.826694'),
	('d1a5fde4-2572-49aa-b520-c6df08fdb1df', '2e732177-bcc4-4dff-9bd7-7d18df121458', 'confirmation_token', 'pkce_dd9a392f54b4ac5cdbcb59238458c380403e17766b88335e96363f19', 'sdafaasdfasdf@gmail.com', '2025-02-07 03:43:43.931568', '2025-02-07 03:43:43.931568'),
	('7c296fb6-f024-4f5e-8a7c-08bb5ec1b51f', '86cb2dd0-c3d1-4a87-91e6-170cf473043a', 'confirmation_token', 'pkce_6e2a8a2b13c96c11192fb297b3bb0d6ffdef52cb0e5041bb45f825c8', 'asdfdfaa@gmail.com', '2025-02-07 03:47:36.563026', '2025-02-07 03:47:36.563026'),
	('5a4eb02d-1170-4771-a8e0-f613f48c8723', 'dbd40179-430a-4624-bb6b-aa277a60cb89', 'confirmation_token', 'pkce_110de444ac1706d6b9d4562a8a592826899727dbc4c199cb578ec7d1', 'afifjamhari@gmail.com', '2025-03-07 02:07:59.850208', '2025-03-07 02:07:59.850208');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 155, 'M9nspUA5J-ff6s-qBFBO0A', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-14 04:15:18.616525+00', '2025-03-14 06:57:01.475477+00', 'gvQfrcjNvQ4myj1Iw68gZA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 156, 'PFSHkaUJkW9X8UR3Y98cvA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-14 06:57:01.488843+00', '2025-03-15 03:42:32.73706+00', 'M9nspUA5J-ff6s-qBFBO0A', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 157, 'NSFsITJ6F3p0AFglWWXeWQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-15 03:42:32.746223+00', '2025-03-15 04:40:48.714212+00', 'PFSHkaUJkW9X8UR3Y98cvA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 158, 'uIwR7-esG59DaVb03C-63A', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-15 04:40:48.7165+00', '2025-03-15 05:40:49.419863+00', 'NSFsITJ6F3p0AFglWWXeWQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 159, 'TB7EEgq0JbxpjKqtntwmGA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-15 05:40:49.422453+00', '2025-03-15 06:40:50.956084+00', 'uIwR7-esG59DaVb03C-63A', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 160, '0TvexjN7D1XuLN2qRXIg0Q', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-15 06:40:50.963701+00', '2025-03-15 07:46:08.687753+00', 'TB7EEgq0JbxpjKqtntwmGA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 161, 'Hp42Vv-OjxSx5BCOmINdvw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-15 07:46:08.693241+00', '2025-03-15 09:17:19.82097+00', '0TvexjN7D1XuLN2qRXIg0Q', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 162, 'oEedH7c-hWG3YSL_b-3Rcg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-15 09:17:19.835294+00', '2025-03-15 10:15:35.715908+00', 'Hp42Vv-OjxSx5BCOmINdvw', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 163, 'wtKUZ9as-gIwa4oxE13zOQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-15 10:15:35.717765+00', '2025-03-16 02:22:25.281949+00', 'oEedH7c-hWG3YSL_b-3Rcg', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 164, 'wIREjd3LYrSzrz6g6gABYQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-16 02:22:25.3004+00', '2025-03-16 04:34:20.292383+00', 'wtKUZ9as-gIwa4oxE13zOQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 165, '4_qGERMO0cQJz7QrvLTePQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-16 04:34:20.295179+00', '2025-03-17 01:34:45.837618+00', 'wIREjd3LYrSzrz6g6gABYQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 166, 'P9tk024a5z3unpT-_vUezw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-17 01:34:45.857452+00', '2025-03-17 06:35:16.90993+00', '4_qGERMO0cQJz7QrvLTePQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 167, 'uP1UVcdHTYFNpE-cWlkEtw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-17 06:35:16.91283+00', '2025-03-17 11:03:59.411478+00', 'P9tk024a5z3unpT-_vUezw', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 168, 'T7g0A5A8RJCvOpnurd0oAA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-17 11:03:59.421939+00', '2025-03-17 12:51:44.889236+00', 'uP1UVcdHTYFNpE-cWlkEtw', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 169, 'xcSbcwR1HPlChhk01sAA5A', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-17 12:51:44.893457+00', '2025-03-17 14:06:38.081845+00', 'T7g0A5A8RJCvOpnurd0oAA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 124, '4nCEpbSh59O2owSIzkwhCA', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', true, '2025-03-07 03:12:03.07134+00', '2025-03-13 02:23:49.764192+00', '0GwpKOcjrRwYaQTD_LfYsA', 'c952e5ef-b6b1-4cab-ae7c-0386b07a8d80'),
	('00000000-0000-0000-0000-000000000000', 170, '_oqBIXAiYgGpZFOAeUrEJw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-17 14:06:38.084401+00', '2025-03-17 15:09:25.478734+00', 'xcSbcwR1HPlChhk01sAA5A', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 171, 'KnvF8AYXl49pb-G-1JBwdg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-17 15:09:25.48187+00', '2025-03-17 16:10:36.896171+00', '_oqBIXAiYgGpZFOAeUrEJw', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 172, 'kFCtatQsW5fBHLQ8OTSVgg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-17 16:10:36.905514+00', '2025-03-18 01:58:36.859496+00', 'KnvF8AYXl49pb-G-1JBwdg', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 173, 'YtIh_MXz-na1VU9nP008NA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-18 01:58:36.88052+00', '2025-03-18 05:31:45.633385+00', 'kFCtatQsW5fBHLQ8OTSVgg', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 141, 'RJzTuzochevza2O3I6ukxA', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', true, '2025-03-13 02:23:49.76713+00', '2025-03-13 05:47:09.486671+00', '4nCEpbSh59O2owSIzkwhCA', 'c952e5ef-b6b1-4cab-ae7c-0386b07a8d80'),
	('00000000-0000-0000-0000-000000000000', 174, 'mHPXzDUQai47xzWjboMuog', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-18 05:31:45.634942+00', '2025-03-18 13:21:54.089743+00', 'YtIh_MXz-na1VU9nP008NA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 175, '61wEAM-RD8uWXCU0teNNpQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-18 13:21:54.102313+00', '2025-03-18 14:22:22.530859+00', 'mHPXzDUQai47xzWjboMuog', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 176, 'xHJ2Y4w33KGhX-lzxSrJmA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-18 14:22:22.532942+00', '2025-03-19 00:25:55.96327+00', '61wEAM-RD8uWXCU0teNNpQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 146, 'W3bNGbdU5YKrAt--GpG_Dw', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', true, '2025-03-13 05:47:09.488518+00', '2025-03-13 12:07:13.34012+00', 'RJzTuzochevza2O3I6ukxA', 'c952e5ef-b6b1-4cab-ae7c-0386b07a8d80'),
	('00000000-0000-0000-0000-000000000000', 177, 'Ta7wJ80TnJgFYiDCNEJjDQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 00:25:55.965346+00', '2025-03-19 01:24:00.398141+00', 'xHJ2Y4w33KGhX-lzxSrJmA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 149, 'PxICt81FHF9veyHvD0IJXA', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', true, '2025-03-13 12:07:13.342633+00', '2025-03-13 14:16:05.388204+00', 'W3bNGbdU5YKrAt--GpG_Dw', 'c952e5ef-b6b1-4cab-ae7c-0386b07a8d80'),
	('00000000-0000-0000-0000-000000000000', 151, 'nYssjf8Zejl8lACqV65GSw', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', false, '2025-03-13 14:16:05.390493+00', '2025-03-13 14:16:05.390493+00', 'PxICt81FHF9veyHvD0IJXA', 'c952e5ef-b6b1-4cab-ae7c-0386b07a8d80'),
	('00000000-0000-0000-0000-000000000000', 178, 'e30tCxbObu3HQ2Ui6zqMzg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 01:24:00.400524+00', '2025-03-19 02:24:07.555078+00', 'Ta7wJ80TnJgFYiDCNEJjDQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 152, '1nw9CTCsP1SjDcs41xsBrQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-13 14:28:09.701167+00', '2025-03-14 02:14:47.715187+00', NULL, 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 153, 'erX7mRm8HzePXiiiKiAD-Q', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-14 02:14:47.727051+00', '2025-03-14 03:15:16.042557+00', '1nw9CTCsP1SjDcs41xsBrQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 179, 'YyQ2k79Ujr-5LRNdEm2_Og', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 02:24:07.55713+00', '2025-03-19 03:25:23.0241+00', 'e30tCxbObu3HQ2Ui6zqMzg', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 154, 'gvQfrcjNvQ4myj1Iw68gZA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-14 03:15:16.04577+00', '2025-03-14 04:15:18.606566+00', 'erX7mRm8HzePXiiiKiAD-Q', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 180, 'gYhzgF8KQC4B56UCcaJn7Q', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 03:25:23.033442+00', '2025-03-19 04:23:44.392897+00', 'YyQ2k79Ujr-5LRNdEm2_Og', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 181, '0-aLJD60Ht-bvwVn6gTCfQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 04:23:44.394174+00', '2025-03-19 05:27:51.125858+00', 'gYhzgF8KQC4B56UCcaJn7Q', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 182, 'DHlaaoSfSfScCU-4MBaedw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 05:27:51.129638+00', '2025-03-19 06:26:18.179454+00', '0-aLJD60Ht-bvwVn6gTCfQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 183, 'fJVx7AhuyfYe-m72pJYpuA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 06:26:18.180187+00', '2025-03-19 07:27:50.138611+00', 'DHlaaoSfSfScCU-4MBaedw', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 184, 'EhBP5u6KMMKVKI4oduN0vw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 07:27:50.151388+00', '2025-03-19 08:28:37.652685+00', 'fJVx7AhuyfYe-m72pJYpuA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 185, 'ny4tp2eqIHolpBmeQta7pg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 08:28:37.656507+00', '2025-03-19 09:50:29.588451+00', 'EhBP5u6KMMKVKI4oduN0vw', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 186, 'HXvnlV_0IbzurdVbEMtv3w', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 09:50:29.591125+00', '2025-03-19 11:04:31.382788+00', 'ny4tp2eqIHolpBmeQta7pg', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 187, 'AMo1Vk0lRZ_oaQK7OTFyOw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 11:04:31.384857+00', '2025-03-19 13:18:41.854459+00', 'HXvnlV_0IbzurdVbEMtv3w', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 188, 'LOTo2P-zXjCTOgbcXnxTSw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 13:18:41.857194+00', '2025-03-19 14:18:48.757098+00', 'AMo1Vk0lRZ_oaQK7OTFyOw', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 189, 'UfldpSiROVnydOP76zg9YA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 14:18:48.764853+00', '2025-03-19 15:19:27.616531+00', 'LOTo2P-zXjCTOgbcXnxTSw', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 122, '0GwpKOcjrRwYaQTD_LfYsA', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', true, '2025-03-07 02:08:42.532531+00', '2025-03-07 03:12:03.067261+00', NULL, 'c952e5ef-b6b1-4cab-ae7c-0386b07a8d80'),
	('00000000-0000-0000-0000-000000000000', 190, 'WnupXdldq8V-gie1shGKpA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 15:19:27.618568+00', '2025-03-19 16:31:07.646927+00', 'UfldpSiROVnydOP76zg9YA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 191, '19hp5Qf7ExHUEu49OJ2zUQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-19 16:31:07.650788+00', '2025-03-20 03:10:22.334154+00', 'WnupXdldq8V-gie1shGKpA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 192, '4AiPQAxvmahUcREuTZP33Q', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-20 03:10:22.342282+00', '2025-03-20 04:13:15.597748+00', '19hp5Qf7ExHUEu49OJ2zUQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 193, 'CCaouc6SmhNzD-jMN02LJg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-20 04:13:15.601861+00', '2025-03-21 01:19:50.349925+00', '4AiPQAxvmahUcREuTZP33Q', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 194, 'tWYbKprC-ttBfO6Rx_1f6A', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-21 01:19:50.358351+00', '2025-03-21 02:24:59.652622+00', 'CCaouc6SmhNzD-jMN02LJg', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 195, '4c_nOKSmfd5ynj9qIcgD4g', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-21 02:24:59.655764+00', '2025-03-21 03:34:20.129272+00', 'tWYbKprC-ttBfO6Rx_1f6A', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 196, 'BH4j3n8Qq8OoHAYoa4B0yw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-21 03:34:20.14568+00', '2025-03-21 04:34:40.516683+00', '4c_nOKSmfd5ynj9qIcgD4g', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 197, 'zWt-HOdJKTUU8bOIqHBlwg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-21 04:34:40.521262+00', '2025-03-21 06:11:31.365397+00', 'BH4j3n8Qq8OoHAYoa4B0yw', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 198, '7fAehOJy6FOX4eLg_jHrTA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-21 06:11:31.366284+00', '2025-03-21 07:12:00.378284+00', 'zWt-HOdJKTUU8bOIqHBlwg', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 199, 'sW8Oif8z3X8w63MNMLuRxg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-21 07:12:00.387494+00', '2025-03-23 03:43:00.619949+00', '7fAehOJy6FOX4eLg_jHrTA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 200, 'BiC1oCFv6PjhWl3IHEAhsQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-23 03:43:00.631986+00', '2025-03-23 04:43:08.066174+00', 'sW8Oif8z3X8w63MNMLuRxg', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 201, '5Nh7eiUdp67SBc_-t1Sw2A', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-23 04:43:08.069587+00', '2025-03-23 05:43:49.311692+00', 'BiC1oCFv6PjhWl3IHEAhsQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 202, 'yIplHy18EQm3VpXEf-WfmQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-23 05:43:49.314245+00', '2025-03-23 07:21:07.501496+00', '5Nh7eiUdp67SBc_-t1Sw2A', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 203, 'C88lJ73OxJTa7DXoEArtlA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-23 07:21:07.508391+00', '2025-03-23 14:31:07.085628+00', 'yIplHy18EQm3VpXEf-WfmQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 204, 'AT1AWhTY2lsMXqZ8W7Ft-w', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-23 14:31:07.091608+00', '2025-03-24 14:01:17.095048+00', 'C88lJ73OxJTa7DXoEArtlA', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 205, 'pX0lmy2LaZmmqbjv54Vx5w', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-24 14:01:17.118006+00', '2025-03-24 15:05:27.142428+00', 'AT1AWhTY2lsMXqZ8W7Ft-w', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 206, 'rVNd_F0Y0R1xBvdyfq5vyQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-24 15:05:27.151114+00', '2025-03-25 04:59:55.317806+00', 'pX0lmy2LaZmmqbjv54Vx5w', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 207, '2RVMDGrpimGa98bWsfyX0Q', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-25 04:59:55.337411+00', '2025-03-25 05:59:55.598706+00', 'rVNd_F0Y0R1xBvdyfq5vyQ', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 208, 'CpoMwz6jeJEJS2ereaomgg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-25 05:59:55.603859+00', '2025-03-25 07:08:20.017531+00', '2RVMDGrpimGa98bWsfyX0Q', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 209, 'AawSdfUeDIItMZrXTweLcA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', false, '2025-03-25 07:08:20.031577+00', '2025-03-25 07:08:20.031577+00', 'CpoMwz6jeJEJS2ereaomgg', 'de78ca3e-f32e-4833-89b6-684d4f28b9cb'),
	('00000000-0000-0000-0000-000000000000', 210, 'UH9t6SedvL-mJIYsGcpVLw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-26 04:12:46.653746+00', '2025-03-26 05:15:52.100583+00', NULL, '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 211, 'PMXjYrUqwBfBOYvmADnX8w', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-03-26 05:15:52.11679+00', '2025-04-10 01:34:31.648845+00', 'UH9t6SedvL-mJIYsGcpVLw', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 212, 'w6KfpvIpRwkd6c_UEtRzfQ', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-10 01:34:31.660352+00', '2025-04-10 03:16:03.33811+00', 'PMXjYrUqwBfBOYvmADnX8w', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 213, 'wvC-OQ4Rl4HFjjngTwr7JA', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-10 03:16:03.340216+00', '2025-04-10 04:18:51.370804+00', 'w6KfpvIpRwkd6c_UEtRzfQ', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 214, 'n4G1TeFwOKZLsCEeJ0cBag', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-10 04:18:51.37212+00', '2025-04-10 06:27:06.631727+00', 'wvC-OQ4Rl4HFjjngTwr7JA', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 215, 'dNA6mCylOyXTwgUrLZHo2g', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-10 06:27:06.633319+00', '2025-04-11 02:45:59.877634+00', 'n4G1TeFwOKZLsCEeJ0cBag', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 216, 'sQLsNbT3j8DhQSUyTCR95w', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-11 02:45:59.885331+00', '2025-04-11 03:56:47.893079+00', 'dNA6mCylOyXTwgUrLZHo2g', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 217, 'W_qgxpCKZjcu5V5-fvJx7w', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-11 03:56:47.894558+00', '2025-04-12 02:07:57.551897+00', 'sQLsNbT3j8DhQSUyTCR95w', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 218, 'pn8kZ6HNmcFK2FAMoj9eUw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-12 02:07:57.564782+00', '2025-04-12 03:09:01.62276+00', 'W_qgxpCKZjcu5V5-fvJx7w', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 219, '06QIw_n4Ped-XakcWWeP9A', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-12 03:09:01.626182+00', '2025-04-12 04:12:34.678023+00', 'pn8kZ6HNmcFK2FAMoj9eUw', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 220, 'WsZVpenbx17Tqm2ehhAVcg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-12 04:12:34.680321+00', '2025-04-12 06:09:58.921148+00', '06QIw_n4Ped-XakcWWeP9A', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 221, 'tPwT0f2xSBQLoGcQCGLixw', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-12 06:09:58.924401+00', '2025-04-12 14:02:47.461904+00', 'WsZVpenbx17Tqm2ehhAVcg', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 222, 'UoRKBoCF2tf5sZNFK3gpZg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-12 14:02:47.474807+00', '2025-04-15 05:38:38.985961+00', 'tPwT0f2xSBQLoGcQCGLixw', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 223, 'Vg2ByEIcCfh_ME9f8hYl4Q', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-04-15 05:38:39.007317+00', '2025-05-06 01:27:52.61026+00', 'UoRKBoCF2tf5sZNFK3gpZg', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 224, 'wdrlaj3jzssn', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-05-06 01:27:52.619045+00', '2025-05-06 02:25:56.040462+00', 'Vg2ByEIcCfh_ME9f8hYl4Q', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 225, 'w5la7zu54p7x', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-05-06 02:25:56.04729+00', '2025-05-06 03:24:25.462345+00', 'wdrlaj3jzssn', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 226, 'wsktuxcv2rvu', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', true, '2025-05-06 03:24:25.464297+00', '2025-05-06 05:29:28.62681+00', 'w5la7zu54p7x', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6'),
	('00000000-0000-0000-0000-000000000000', 227, 'bq6waevvpoyg', '44fad111-af1c-4f2c-b4e3-0727d2b4154c', false, '2025-05-06 05:29:28.629053+00', '2025-05-06 05:29:28.629053+00', 'wsktuxcv2rvu', '8894bcd0-4a8c-48ea-a2f9-ec3c168f3db6');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: aslab; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."aslab" ("id_aslab", "nama", "nim", "email", "no_hp", "angkatan", "program_studi", "status", "profile_picture", "pendidikan_terakhir") VALUES
	('02897737-5945-4a6d-8aef-4a5c028c7964', 'Joko Susanto', '332211009', 'joko@example.com', '083322110090', '2020', 'Teknik Komputer', 'Tidak Aktif', NULL, NULL),
	('7bce9da3-5a37-47a2-b9ea-80a31f5cf9ec', 'Habib', '123130022', 'habib@gmail.cm', '21212223123', '2022', 'Sistem Informasi', 'Aktif', 'https://dqohyiugqnkmuhbhtteq.supabase.co/storage/v1/object/public/profile-pictures/aslab/123130022.png', 'sma'),
	('ad100741-24e2-4b45-8996-9768baf67a1e', 'Rahel Anatasya', '123220018', 'rahel@gmail.com', '', '2022', 'Informatika', 'Aktif', 'https://dqohyiugqnkmuhbhtteq.supabase.co/storage/v1/object/public/profile-pictures/aslab/123220018.png', 'sma'),
	('14b32bb9-fa97-4df7-a146-bbbbfe0e1e77', 'Siung Sie', '987654321', 'budi@example.com', '089876543210', '2021', 'Informatika', 'Aktif', NULL, NULL),
	('8a291da4-4eba-4177-ac7c-48cbefc02f9d', 'Dedi Supriya', '556677889', 'dedi@example.com', '085566778890', '2020', 'Sistem Informasi', 'Tidak Aktif', NULL, NULL),
	('bb6f7fb1-9b7c-435a-be94-d5fdeb4b39ad', 'Eka Rahmawatia', '998877665', 'eka@example.com', '089988776650', '2021', 'Informatika', 'Aktif', NULL, NULL),
	('157d17e4-0eeb-415f-b3b7-7046bcc266c2', 'Fajar Gunawana', '443322110', 'fajar@example.com', '084433221100', '2022', 'Teknik Komputer', 'Aktif', NULL, NULL),
	('da723369-99e7-4e18-ae22-f1e5dc3d88f7', 'Gita Pertiwia', '887766554', 'gita@example.com', '088877665540', '2020', 'Teknik Komputer', 'Tidak Aktif', NULL, NULL),
	('85aeaf9b-09c9-4c9f-8f30-fa834f7ebe08', 'Hani Agustinaa', '221100998', 'hani@example.com', '082211009980', '2021', 'Informatika', 'Aktif', NULL, NULL),
	('28671de0-c966-4ee9-b101-377b81271dad', 'Afif', '124220018', 'afif@gmail.com', '', '2020', 'Sistem Informasi', 'Aktif', NULL, 'sma'),
	('60d5f206-1472-4145-97b5-92a95e6d4c9a', 'Indra Kurniawan1', '776655443', 'indra@example.com', '087766554430', '2022', 'Sistem Informasi', 'Aktif', 'https://dqohyiugqnkmuhbhtteq.supabase.co/storage/v1/object/public/profile-pictures/aslab/776655443.png', NULL);


--
-- Data for Name: tahun_semester; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tahun_semester" ("id", "created_at", "semester", "tahun_ajaran", "slug") VALUES
	(36, '2025-03-18 13:40:10.18392+00', 'Gasal', '2022/2023', '2022-2023-gasal'),
	(38, '2025-03-18 13:40:53.021105+00', 'Gasal', '2023/2024', '2023-2024-gasal'),
	(39, '2025-03-18 13:41:02.995819+00', 'Genap', '2023/2024', '2023-2024-genap'),
	(40, '2025-03-18 13:41:11.241263+00', 'Gasal', '2024/2025', '2024-2025-gasal'),
	(41, '2025-03-18 13:41:20.206547+00', 'Genap', '2024/2025', '2024-2025-genap'),
	(43, '2025-03-18 13:41:42.902694+00', 'Genap', '2025/2026', '2025-2026-genap');


--
-- Data for Name: aslab_honor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."aslab_honor" ("id", "created_at", "aslab", "tahun_semester", "status_honor", "tanggal_diambil") VALUES
	(2, '2025-03-21 07:02:33.552928+00', '02897737-5945-4a6d-8aef-4a5c028c7964', 38, NULL, NULL),
	(1, '2025-03-21 04:01:17.050359+00', '02897737-5945-4a6d-8aef-4a5c028c7964', 36, NULL, '2025-03-21'),
	(10, '2025-03-25 06:53:51.835966+00', '14b32bb9-fa97-4df7-a146-bbbbfe0e1e77', 43, 'Belum Diambil', '2025-03-25'),
	(11, '2025-03-25 06:54:53.45209+00', '28671de0-c966-4ee9-b101-377b81271dad', 36, 'Belum Diambil', '2025-03-25'),
	(9, '2025-03-25 05:52:23.080428+00', '02897737-5945-4a6d-8aef-4a5c028c7964', 43, 'Belum Diambil', '2025-04-15');


--
-- Data for Name: dosen_pengampu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."dosen_pengampu" ("id", "created_at", "nama", "nip", "email", "slug") VALUES
	(1, '2025-03-11 05:20:59.119098+00', ' Sapi S.Pd', '123', 'faiz@gmail.com', 'sapi-s-pd'),
	(2, '2025-03-18 05:58:19.190666+00', 'Kambing S.Pd., M.Dp.', '111', 'kambing@gmail.com', 'kambing-s-pd-m-dp'),
	(3, '2025-03-18 14:24:33.506394+00', 'Sugiono', '123123123', 'sugiono@gmail.com', 'sugiono');


--
-- Data for Name: honor_jenis; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."honor_jenis" ("id", "created_at", "jenis", "biaya", "slug") VALUES
	(8, '2025-03-16 05:01:17.610158+00', 'Responsi', 35000, 'responsi'),
	(9, '2025-03-19 00:36:14.631503+00', 'Koreksi', 6000, 'koreksi'),
	(10, '2025-03-19 00:38:31.426895+00', 'Naskah', 38000, 'naskah'),
	(2, '2025-03-16 02:28:00.573969+00', 'Honorarium', 40000, 'honorarium');


--
-- Data for Name: kalab; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."kalab" ("id", "created_at", "nama", "nip", "email", "no_hp", "photo", "slug") VALUES
	(1, '2025-03-05 08:46:34.671487+00', 'Dr. Budi Wijaya', '19751230 200312 1 001', 'budi.santoso@univ.ac.id', '0812-3456-7890', '', 'dr-budi-wijaya'),
	(15, '2025-03-18 13:45:14.35209+00', 'Prof. Sri Rahayu, M.Sc.', '19681015 199512 2 002', 'sri.rahayu@univ.ac.id', '0813-4567-8901', NULL, 'prof-sri-rahayu-m-sc'),
	(16, '2025-03-18 13:45:45.859577+00', 'Dr. Andi Wijaya, M.T.', '19800310 200501 1 003', 'andi.wijaya@univ.ac.id', '0814-5678-9012', NULL, 'dr-andi-wijaya-m-t');


--
-- Data for Name: lab; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."lab" ("id", "created_at", "nama", "lantai", "kapasitas", "kalab", "slug") VALUES
	(3, '2025-03-06 13:50:20.180812+00', 'RBPL', 'Patt III', 35, 1, 'rbpl'),
	(6, '2025-03-18 13:49:54.142454+00', 'Pemrograman Dasar', 'Patt I', 30, 16, 'pemrograman-dasar'),
	(7, '2025-03-18 13:56:46.03214+00', 'Jaringan', 'Patt II', 40, 15, 'jaringan'),
	(8, '2025-03-18 13:57:06.713058+00', 'Basis Data', 'Patt II', 40, 15, 'basis-data');


--
-- Data for Name: mata_kuliah_praktikum; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."mata_kuliah_praktikum" ("id", "created_at", "nama", "semester", "jumlah_kelas", "slug", "kode_mk") VALUES
	(2, '2025-03-11 03:39:37.403924+00', 'RBPL', 'Gasal', 2, 'rbpl', 123223),
	(5, '2025-03-18 14:03:01.357147+00', 'Mobile', 'Gasal', 0, 'mobile', 123123),
	(1, '2025-03-11 03:37:14.08782+00', 'Algoritma dan Pemrograman Lanjut', 'Gasal', 2, 'algoritma-dan-pemrograman-lanjut', 123422),
	(6, '2025-03-18 14:23:19.182374+00', 'Algoritma dan Pemrograman', 'Genap', 0, 'algoritma-dan-pemrograman', 123121),
	(7, '2025-03-18 14:23:49.312714+00', 'Dasar-Dasar Pemrograman', 'Genap', 0, 'dasar-dasar-pemrograman', 1123);


--
-- Data for Name: kelas_praktikum; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."kelas_praktikum" ("id", "created_at", "kelas", "mata_kuliah", "id_dosen", "jumlah_praktikan", "hari", "lab", "jenis_praktikan", "waktu", "slug", "tahun_semester") VALUES
	(1, '2025-03-14 03:37:46.494177+00', 'SI-A', 1, 1, 30, 'Senin', 3, 'Spesial', '14:00 - 15:00', 'komputasi-si-a', 36),
	(3, '2025-03-18 13:30:35.528578+00', 'SI-B', 1, 1, 30, 'Senin', 3, 'Reguler', '08:00 - 10:00', 'komputasi-si-b', 38),
	(7, '2025-03-21 01:33:08.604879+00', 'SI-Cb', 5, 2, 32, 'Selasa', 8, 'Spesial', '13:00-15:00', 'mobile-si-cb', 36),
	(6, '2025-03-20 04:44:30.835162+00', 'SI-B', 5, 3, 21, 'Senin', 6, 'Reguler', '14:00 - 15:00', 'mobile-si-b', 36),
	(8, '2025-03-21 01:35:43.061148+00', 'SI-Cb', 6, 2, 23, 'Rabu', 7, 'Reguler', '14:00 - 15:00', 'algoritma-dan-pemrograman-si-cb', 36),
	(4, '2025-03-19 01:11:55.203638+00', 'SI-C', 2, 2, 35, 'Selasa', 7, 'Reguler', '13:00-15:00', 'rbpl-si-c', 43);


--
-- Data for Name: kelas_aslab; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."kelas_aslab" ("id", "created_at", "aslab", "kelas") VALUES
	(1, '2025-03-19 16:33:03.258359+00', '28671de0-c966-4ee9-b101-377b81271dad', 1),
	(17, '2025-03-21 01:45:42.343539+00', 'ad100741-24e2-4b45-8996-9768baf67a1e', 6),
	(18, '2025-03-21 01:45:42.343539+00', '28671de0-c966-4ee9-b101-377b81271dad', 6),
	(19, '2025-03-21 01:46:00.961845+00', '14b32bb9-fa97-4df7-a146-bbbbfe0e1e77', 4),
	(20, '2025-03-21 01:46:00.961845+00', '02897737-5945-4a6d-8aef-4a5c028c7964', 4),
	(21, '2025-03-21 01:46:27.028677+00', '02897737-5945-4a6d-8aef-4a5c028c7964', 7),
	(23, '2025-03-21 02:40:18.377717+00', '157d17e4-0eeb-415f-b3b7-7046bcc266c2', 8),
	(24, '2025-03-21 02:40:18.377717+00', '28671de0-c966-4ee9-b101-377b81271dad', 8),
	(25, '2025-04-09 19:02:02+00', '7bce9da3-5a37-47a2-b9ea-80a31f5cf9ec', 1);


--
-- Data for Name: permintaan_sertifikat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."permintaan_sertifikat" ("id", "created_at", "updated_at", "id_aslab", "waktu_pengajuan", "status", "keterangan") VALUES
	(1, '2025-03-18 05:56:04.090888+00', '2025-04-10 01:44:27.586+00', '28671de0-c966-4ee9-b101-377b81271dad', '2025-03-20 08:01:04+00', 'pending', NULL),
	(2, '2025-04-10 01:53:18.348444+00', NULL, '7bce9da3-5a37-47a2-b9ea-80a31f5cf9ec', '2025-04-08 17:01:01+00', 'pending', NULL);


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "created_at", "nama", "role", "aslab_id", "email", "slug") VALUES
	('a3e36298-6321-49f5-b7e9-3b7fa37a2949', '2025-03-13 14:42:22.659782+00', 'afif', 'admin', NULL, 'afif@gmail.com', 'afif');


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."test" ("id", "created_at", "name") VALUES
	(1, '2025-02-05 14:08:59+00', 'test 1
');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('profile-pictures', 'profile-pictures', NULL, '2025-02-14 02:25:06.640647+00', '2025-02-14 02:25:06.640647+00', true, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('f6afa0f3-825c-4e67-bc34-14bdc5716e3f', 'profile-pictures', 'aslab/123220000.jpeg', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '2025-02-17 02:14:59.642775+00', '2025-02-17 05:57:07.988696+00', '2025-02-17 02:14:59.642775+00', '{"eTag": "\"74b7450256bb673d670b7748959ee60b\"", "size": 83993, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-02-17T05:57:08.000Z", "contentLength": 83993, "httpStatusCode": 200}', 'd689f1bf-c2c3-4495-9271-eae250a3b1ef', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '{}'),
	('b1feae4d-6bd4-41aa-b89b-90607858b317', 'profile-pictures', 'aslab/124220000.jpeg', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '2025-02-14 02:28:25.964154+00', '2025-02-14 02:29:15.617445+00', '2025-02-14 02:28:25.964154+00', '{"eTag": "\"6cfaea8e166a3a3510d7c5877b0eee27\"", "size": 161665, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-02-14T02:29:16.000Z", "contentLength": 161665, "httpStatusCode": 200}', 'd40833d1-68ef-4460-81eb-103bb8b775f7', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '{}'),
	('da3163a1-c987-428d-9229-62a084107e52', 'profile-pictures', 'aslab/124220005.jpeg', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '2025-02-14 02:29:23.270397+00', '2025-02-14 02:29:23.270397+00', '2025-02-14 02:29:23.270397+00', '{"eTag": "\"6cfaea8e166a3a3510d7c5877b0eee27\"", "size": 161665, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-02-14T02:29:24.000Z", "contentLength": 161665, "httpStatusCode": 200}', '4b2fd3f1-1f9b-4f27-af12-e640815c271a', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '{}'),
	('a293a47d-9d58-4e7f-8963-26aa7c847577', 'profile-pictures', 'aslab/112233445.jpeg', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '2025-02-17 10:33:12.099701+00', '2025-02-17 10:33:12.099701+00', '2025-02-17 10:33:12.099701+00', '{"eTag": "\"29555edc3d327de8b890f625f489c61b\"", "size": 55889, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-02-17T10:33:13.000Z", "contentLength": 55889, "httpStatusCode": 200}', '94f667c4-5191-4320-beb1-d7866f7b3c76', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '{}'),
	('9052210b-5507-42c1-84b0-d67335eccc75', 'profile-pictures', 'aslab/123220018.png', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '2025-02-19 07:04:51.035183+00', '2025-02-19 07:04:51.035183+00', '2025-02-19 07:04:51.035183+00', '{"eTag": "\"9888b68d1dd08a4582c3baead2cefc65\"", "size": 148594, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-02-19T07:04:51.000Z", "contentLength": 148594, "httpStatusCode": 200}', '70d828b0-83c3-4e20-88dc-42d63a5727e6', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '{}'),
	('ad32e039-9111-4c0e-894a-bc837d347845', 'profile-pictures', 'aslab/776655443.png', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '2025-03-07 02:14:28.50519+00', '2025-03-07 02:14:28.50519+00', '2025-03-07 02:14:28.50519+00', '{"eTag": "\"0479a209cb252d067eb8a61e0a95505e\"", "size": 244733, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-03-07T02:14:29.000Z", "contentLength": 244733, "httpStatusCode": 200}', 'fba296e2-b2c6-4b95-8513-9e4e751d0a6f', '74016d65-d296-4d83-b1ce-0cd9a3b38b76', '{}'),
	('040618eb-09dd-407d-9ba9-c15a4d5042d5', 'profile-pictures', 'aslab/123130022.png', '4dded66b-f4e3-46c3-a0c1-872ebb53c508', '2025-03-10 01:42:32.060152+00', '2025-03-10 01:42:32.060152+00', '2025-03-10 01:42:32.060152+00', '{"eTag": "\"0479a209cb252d067eb8a61e0a95505e\"", "size": 244733, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-03-10T01:42:32.000Z", "contentLength": 244733, "httpStatusCode": 200}', '04a84919-03dc-44f2-855c-aed88522c881', '4dded66b-f4e3-46c3-a0c1-872ebb53c508', '{}');


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 227, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

-- SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: aslab_honor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."aslab_honor_id_seq"', 11, true);


--
-- Name: dosen_pengampu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."dosen_pengampu_id_seq"', 3, true);


--
-- Name: honor_jenis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."honor_jenis_id_seq"', 10, true);


--
-- Name: kalab_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."kalab_id_seq"', 17, true);


--
-- Name: kelas_aslab_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."kelas_aslab_id_seq"', 25, true);


--
-- Name: kelas_praktikum_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."kelas_praktikum_id_seq"', 9, true);


--
-- Name: lab_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."lab_id_seq"', 8, true);


--
-- Name: mata_kuliah_praktikum_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."mata_kuliah_praktikum_id_seq"', 7, true);


--
-- Name: permintaan_sertifikat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."permintaan_sertifikat_id_seq"', 2, true);


--
-- Name: tahun_semester_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tahun_semester_id_seq"', 43, true);


--
-- Name: test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."test_id_seq"', 1, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
