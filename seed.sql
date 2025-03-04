-- seed.sql - Populating the tahun_ajaran table

-- Create the table if it doesn't exist (uncomment if needed)
-- CREATE TABLE IF NOT EXISTS tahun_ajaran (
--   id VARCHAR(10) PRIMARY KEY,
--   tahun VARCHAR(20) NOT NULL,
--   semester VARCHAR(10) NOT NULL,
--   update_date VARCHAR(50) NOT NULL,
--   slug VARCHAR(100) NOT NULL
-- );

-- Insert data for academic years from 2018 to 2025
INSERT INTO tahun_ajaran (tahun, semester, slug)
VALUES 
    ('2018/2019', 'Ganjil', 'ganjil-2018-2019'),
    ('2018/2019', 'Genap', 'genap-2018-2019'),
    ('2019/2020', 'Ganjil', 'ganjil-2019-2020'),
    ('2019/2020', 'Genap', 'genap-2019-2020'),
    ('2020/2021', 'Ganjil', 'ganjil-2020-2021'),
    ('2020/2021', 'Genap', 'genap-2020-2021'),
    ('2021/2022', 'Ganjil', 'ganjil-2021-2022'),
    ('2021/2022', 'Genap', 'genap-2021-2022'),
    ('2022/2023', 'Ganjil', 'ganjil-2022-2023'),
    ('2022/2023', 'Genap', 'genap-2022-2023'),
    ('2023/2024', 'Ganjil', 'ganjil-2023-2024'),
    ('2023/2024', 'Genap', 'genap-2023-2024'),
    ('2024/2025', 'Ganjil', 'ganjil-2024-2025'),
    ('2024/2025', 'Genap', 'genap-2024-2025'),
    ('2025/2026', 'Ganjil', 'ganjil-2025-2026'),
    ('2025/2026', 'Genap', 'genap-2025-2026');